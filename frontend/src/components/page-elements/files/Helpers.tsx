import React from 'react';
import {
   Image,
   Video,
   FileText,
   Code,
   Layout,
   Table,
   FileStack,
   Sliders,
   Music,
   Archive,
   Film,
   Briefcase,
   Database,
   Monitor,
} from 'lucide-react';
import { FileCategory } from '@types';

export const getIcon = (fileType: string, color: string = ''): JSX.Element => {
   switch (fileType) {
      case 'image':
         return <Image style={{
            color: `${color}`
         }} />;
      case 'video':
          return <Video style={{ color: `${color}` }} />;
        case 'document':
          return <FileText style={{ color: `${color}` }} />;
        case 'code':
          return <Code style={{ color: `${color}` }} />;
        case 'design':
          return <Layout style={{ color: `${color}` }} />;
        case 'spreadsheet':
          return <Table style={{ color: `${color}` }} />;
        case 'presentation':
          return <Monitor style={{ color: `${color}` }} />;
        case 'audio':
          return <Music style={{ color: `${color}` }} />;
        case 'archive':
          return <Archive style={{ color: `${color}` }} />;
        case 'video-editing':
          return <Film style={{ color: `${color}` }} />;
        case 'project-management':
          return <Briefcase style={{ color: `${color}` }} />;
        case 'database':
          return <Database style={{ color: `${color}` }} />;
        case 'other':
        default:
          return <FileStack style={{ color: `${color}` }} />;
   }
};


type FileIconByExtensionProps = {
  fileExtension: string; 
  className?: string;     
};

export const FileIconByExtension: React.FC<FileIconByExtensionProps> = ({ fileExtension = 'default', className = '' }): JSX.Element => {
  switch (fileExtension.toLowerCase()) {
   
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'bmp':
    case 'svg':
    case 'webp':
    case 'ico':
    case 'tiff':
    case 'heic':
    case 'raw':
      return <Image className={className} />;

   
    case 'mp4':
    case 'mov':
    case 'avi':
    case 'mkv':
    case 'webm':
    case 'flv':
    case 'wmv':
    case 'm4v':
    case 'mpg':
    case 'mpeg':
    case '3gp':
      return <Video className={className} />;

   
    case 'pdf':
    case 'doc':
    case 'docx':
    case 'txt':
    case 'rtf':
    case 'odt':
    case 'md':
    case 'tex':
    case 'epub':
    case 'mobi':
      return <FileText className={className} />;

   
    case 'js':
    case 'ts':
    case 'jsx':
    case 'tsx':
    case 'html':
    case 'htm':
    case 'css':
    case 'scss':
    case 'json':
    case 'yaml':
    case 'yml':
    case 'xml':
    case 'py':
    case 'java':
    case 'c':
    case 'cpp':
    case 'h':
    case 'cs':
    case 'php':
    case 'rb':
    case 'go':
    case 'rs':
    case 'sh':
    case 'bat':
    case 'dockerfile':
      return <Code className={className} />;

   
    case 'psd':
    case 'ai':
    case 'xd':
    case 'sketch':
    case 'fig':
    case 'indd':
    case 'afdesign':
    case 'afphoto':
    case 'blend':
      return <Layout className={className} />;

   
    case 'xls':
    case 'xlsx':
    case 'ods':
    case 'tsv':
    case 'numbers':
      return <Table className={className} />;

   
    case 'ppt':
    case 'pptx':
    case 'key':
    case 'odp':
    case 'pps':
    case 'ppsx':
      return <Monitor className={className} />;

   
    case 'mp3':
    case 'wav':
    case 'aac':
    case 'flac':
    case 'ogg':
    case 'm4a':
    case 'wma':
    case 'opus':
    case 'aiff':
    case 'amr':
      return <Music className={className} />;

   
    case 'zip':
    case 'rar':
    case '7z':
    case 'tar':
    case 'gz':
    case 'bz2':
    case 'xz':
    case 'iso':
    case 'dmg':
      return <Archive className={className} />;

   
    case 'prproj':
    case 'veg':
    case 'davinci':
    case 'aep':
    case 'drp':
    case 'fcpxml':
      return <Film className={className} />;

   
    case 'mpp':
    case 'trello':
    case 'asana':
    case 'kanban':
      return <Briefcase className={className} />;

   
    case 'sql':
    case 'db':
    case 'sqlite':
    case 'mdb':
    case 'accdb':
    case 'csv':
      return <Database className={className} />;

   
    case 'default':
    default:
      return <FileStack className={className} />;
  }
};



export const formatCategory = (fileCategory: FileCategory) => {
   switch (fileCategory) {
      case 'project-document':
         return 'Project Document';
      case 'project-asset':
         return 'Project Asset';
      case 'project-file':
         return 'Project File';
      case 'client-file':
         return 'Client File';
      case 'client-document':
         return 'Client Document';
      case 'personal-file':
         return 'Personal File';
      case 'personal-document':
         return 'Personal Document';
      default:
         return '';
   }}
