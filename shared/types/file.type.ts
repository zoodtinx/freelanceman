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
   size?: number;
   dateCreated: string;
   dateModified?: string;
   permissions?: {
      owner: string;
      sharedWith: string[];
   };
   passwordProtected: boolean;
   encryptedPasswordHash?: string;
}

export type FileSearchOption = Partial<Pick<File, 'name' | 'category' | 'fileName' | 'type'>>

export interface FileFormData {
   id: string,
   name?: string;
   link?: string;
   category?: "document" | "project-assets" | "project-file";
}

export interface NewFilePayload {
   id: string,
   name: string;
   link: string;
   category: "document" | "project-assets" | "project-file";
}

export type FileCategory = "document" | "project-assets" | "project-file" | "personal";