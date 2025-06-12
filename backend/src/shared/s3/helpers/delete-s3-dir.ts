import {
    S3Client,
    ListObjectsV2Command,
    DeleteObjectsCommand,
} from '@aws-sdk/client-s3';

export async function deleteS3Directory({
    prefix,
    bucket,
    region,
    accessKeyId,
    secretAccessKey,
}) {
    const s3Client = new S3Client({
        region: region,
        credentials: {
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
        },
    });

    let isTruncated = true;
    let continuationToken;

    while (isTruncated) {
        const listObjectsCommand = new ListObjectsV2Command({
            Bucket: bucket,
            Prefix: prefix,
            MaxKeys: 1000,
            ContinuationToken: continuationToken,
        });

        try {
            const { Contents, IsTruncated, NextContinuationToken } =
                await s3Client.send(listObjectsCommand);

            if (!Contents || Contents.length === 0) {
                isTruncated = false;
                break;
            }

            const objectsToDelete = Contents.map((obj) => ({ Key: obj.Key }));

            const deleteObjectsCommand = new DeleteObjectsCommand({
                Bucket: bucket,
                Delete: {
                    Objects: objectsToDelete,
                    Quiet: true,
                },
            });

            await s3Client.send(deleteObjectsCommand);

            isTruncated = IsTruncated || false;
            continuationToken = NextContinuationToken;
        } catch (error) {
            console.error(
                `Error deleting S3 directory '${prefix}' from bucket '${bucket}':`,
                error,
            );
            throw error;
        }
    }
}
