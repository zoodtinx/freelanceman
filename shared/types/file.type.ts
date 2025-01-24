export interface File {
   id: string;
   fileName: string;
   name: string;
   fileType:
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
   fileCategory: FileCategory;
   link: string;
   project?: string;
   projectId?: string;
   client?: string;
   clientId?: string;
   size?: number;
   createdAt: string;
   modifiedAt?: string;
}

export type FileSearchOption = Partial<
   Pick<File, "name" | "category" | "fileName" | "type">
>;

export interface FileFormData {
   id: string;
   name?: string;
   link?: string;
   category?: FileCategory;
}

export interface NewFilePayload {
   id: string;
   name: string;
   link: string;
   category: FileCategory;
}

export type FileCategory =
   | "personal-file"
   | "personal-document"
   | "client-file"
   | "client-document"
   | "project-file"
   | "project-document"
   | "project-asset"
