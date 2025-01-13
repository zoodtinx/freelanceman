export interface File {
   id: string;
   fileName: string;
   name: string;
   type:
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
   category: FileCategory;
   link: string;
   project?: string;
   projectId?: string;
   client?: string;
   clientId?: string;
   size?: number;
   dateCreated: string;
   dateModified?: string;
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
   | "client-file"
   | "project-asset"
   | "project-document"
   | "project-file"
   | "personal";
