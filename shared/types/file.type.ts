export type FileType =
   | "image"
   | "video"
   | "document"
   | "code"
   | "design"
   | "spreadsheet"
   | "presentation"
   | "audio"
   | "archive"
   | "video-editing"
   | "project-management"
   | "database"
   | "other";

export type FileCategory =
   | "personal-file"
   | "document"
   | "project-file"
   | "project-asset";

export interface File {
   id: string;
   originalName: string;
   displayName: string;
   type: FileType;
   category: FileCategory;
   link: string;
   project?: string;
   projectId?: string;
   client?: string;
   clientId?: string;
   size?: number;
   createdAt: string;
   modifiedAt?: string;
}

export interface CreateFileDto {
   originalName: string;
   displayName: string;
   type: FileType;
   category: FileCategory;
   link: string;
   projectId?: string;
   clientId?: string;
   size?: number;
}

export interface EditFileDto {
   displayName: string;
   type: FileType;
}

export type FileSearchOption = Partial<
   Pick<
      File,
      "displayName" | "category" | "type" | "clientId" | "projectId"
   >
>;