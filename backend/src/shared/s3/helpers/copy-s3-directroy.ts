import {
    ListObjectsV2Command,
    CopyObjectCommand,
    S3Client,
} from '@aws-sdk/client-s3';

interface CopyS3DirConfig {
    sourcePrefix: string;
    destinationPrefix: string;
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
    bucket: string;
}

export async function copyS3Directory(config: CopyS3DirConfig) {
    const {
        accessKeyId,
        secretAccessKey,
        bucket,
        destinationPrefix,
        region,
        sourcePrefix,
    } = config;

    const s3Client = new S3Client({
        region: region,
        credentials: {
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
        },
    });

    console.log(
        `Starting to copy objects from '${sourcePrefix}' to '${destinationPrefix}' in bucket '${bucket}'`,
    );

    let isTruncated = true;
    let continuationToken: string | undefined; // Explicitly define as string | undefined
    let copiedCount = 0;
    const MAX_CONCURRENT_COPIES = 20; // You can adjust this value based on your needs and S3 limits
    const copyPromises: Promise<any>[] = []; // Array to hold promises for concurrent copies

    try {
        while (isTruncated) {
            const listParams = {
                Bucket: bucket,
                Prefix: sourcePrefix,
                ContinuationToken: continuationToken,
            };

            const { Contents, IsTruncated, NextContinuationToken } =
                await s3Client.send(new ListObjectsV2Command(listParams));

            if (Contents) {
                for (const object of Contents) {
                    // Skip if the object key ends with a '/' (likely a folder representation)
                    if (object.Key!.endsWith('/')) {
                        continue;
                    }

                    // Generate the new key for the destination
                    const newKey = object.Key!.replace(
                        sourcePrefix,
                        destinationPrefix,
                    );

                    const copyParams = {
                        Bucket: bucket,
                        CopySource: `${bucket}/${object.Key}`, // Full path to the source object
                        Key: newKey, // New key for the destination object
                    };

                    // Add the copy operation promise to the array
                    copyPromises.push(
                        s3Client.send(new CopyObjectCommand(copyParams)).then(() => {
                            copiedCount++;
                        }).catch(error => {
                            // Log error for individual copy operations without stopping the whole process
                            console.error(`Failed to copy '${object.Key}':`, error);
                        })
                    );

                    // If the number of concurrent promises reaches the limit, wait for them to complete
                    if (copyPromises.length >= MAX_CONCURRENT_COPIES) {
                        await Promise.all(copyPromises);
                        copyPromises.length = 0; // Clear the array for the next batch
                    }
                }
            }

            isTruncated = IsTruncated || false;
            continuationToken = NextContinuationToken;
        }

        // After the loop, await any remaining copy promises
        if (copyPromises.length > 0) {
            await Promise.all(copyPromises);
        }

        console.log(
            `Successfully copied ${copiedCount} objects from '${sourcePrefix}' to '${destinationPrefix}'.`,
        );
    } catch (error) {
        console.error(`Error copying directory '${sourcePrefix}':`, error);
        // Rethrow or handle the error as appropriate for your NestJS application
        throw error;
    }
}