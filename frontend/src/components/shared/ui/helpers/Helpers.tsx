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
   CircleCheck,
   Calendar,
   UsersRound,
   Coins,
   Plus,
   Settings,
   Folder,
   BookUser,
   CircleDollarSign,
   UserRound,
   PencilRuler,
   Building2,
} from 'lucide-react';
import { FileCategory, FileType } from '@types';

export const getIcon = (
   fileType: string,
   className: string = '',
   color: string = ''
): JSX.Element => {
   switch (fileType) {
      case 'image':
         return <Image style={{ color: `${color}` }} className={className} />;
      case 'video':
         return <Video style={{ color: `${color}` }} className={className} />;
      case 'document':
         return (
            <FileText style={{ color: `${color}` }} className={className} />
         );
      case 'code':
         return <Code style={{ color: `${color}` }} className={className} />;
      case 'design':
         return <Layout style={{ color: `${color}` }} className={className} />;
      case 'spreadsheet':
         return <Table style={{ color: `${color}` }} className={className} />;
      case 'presentation':
         return <Monitor style={{ color: `${color}` }} className={className} />;
      case 'audio':
         return <Music style={{ color: `${color}` }} className={className} />;
      case 'archive':
         return <Archive style={{ color: `${color}` }} className={className} />;
      case 'video-editing':
         return <Film style={{ color: `${color}` }} className={className} />;
      case 'project-management':
         return (
            <Briefcase style={{ color: `${color}` }} className={className} />
         );
      case 'database':
         return (
            <Database style={{ color: `${color}` }} className={className} />
         );
      case 'other':
         return (
            <FileStack style={{ color: `${color}` }} className={className} />
         );
      default:
         return <></>;
   }
};

type FileIconByExtensionProps = {
   fileExtension: string;
   className?: string;
};

export const FileIconByExtension: React.FC<FileIconByExtensionProps> = ({
   fileExtension = 'default',
   className = '',
}): JSX.Element => {
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
   if (!fileCategory) return '';

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
   }
};

export const formatProjectStatus = (
   projectStatus: 'active' | 'on-hold' | 'completed'
) => {
   if (!projectStatus) return '';

   switch (projectStatus) {
      case 'active':
         return 'Active';
      case 'on-hold':
         return 'On Hold';
      case 'completed':
         return 'Completed';
      default:
         return '';
   }
};

export const formatPaymentStatus = (
   paymentStatus: 'unpaid' | 'processing' | 'paid'
) => {
   if (!paymentStatus) return '';

   switch (paymentStatus) {
      case 'unpaid':
         return 'Unpaid';
      case 'processing':
         return 'Processing';
      case 'paid':
         return 'Paid';
      default:
         return '';
   }
};

export const DialogTitleIcon = ({ dialogType }: { dialogType: string }) => {
   const className = 'w-[14px] h-[15px]';
   switch (dialogType) {
      case 'task':
         return <CircleCheck className={className} />;
      case 'event':
         return <Calendar className={className} />;
      case 'file':
         return <Folder className={className} />;
      case 'new-file':
         return <Folder className={className} />;
      case 'project-settings':
         return <Settings className={className} />;
      case 'client-contact':
         return <UsersRound className={className} />;
      case 'partner-contact':
         return <BookUser className={className} />;
      case 'sales-document-item':
         return <CircleDollarSign className={className} />;
      case 'user-profile':
         return <UserRound className={className} />;
      case 'new-project':
         return <PencilRuler className={className} />;
      case 'new-client':
         return <Building2 className={className} />;
      case 'client-settings':
         return <Settings className={className} />;
      default:
         return <Plus className={className} />;
   }
};

export const getDialogHeaderText = (dialogType: string) => {
   switch (dialogType) {
      case 'task':
         return 'Task';
      case 'event':
         return 'Event';
      case 'file':
         return 'File';
      case 'new-file':
         return 'Add File';
      case 'project-settings':
         return 'Project Settings';
      case 'client-contact':
         return 'Client Contact';
      case 'partner-contact':
         return 'Partner Contact';
      case 'sales-document-item':
         return 'Sales Document Item';
      case 'user-profile':
         return 'Profile';
      case 'new-project':
         return 'Create New Project';
      case 'new-client':
         return 'Create New Client';
      case 'client-settings':
         return 'Edit Client';
      default:
         return 'Dialog';
   }
};

export const getColorName = (color) => {
   switch (color.toLowerCase()) {
      case 'red':
         return 'Ardentia';
      case 'orange':
         return 'Aurea';
      case 'yellow':
         return 'Lucerna';
      case 'green':
         return 'Viridis';
      case 'blue':
         return 'Caerulea';
      case 'purple':
         return 'Regalis';
      case 'pink':
         return 'Rosalia';
      case 'turquoise':
         return 'Claritudo';
      case 'magenta':
         return 'Vividus';
      case 'teal':
         return 'Tranquilla';
      case 'olive':
         return 'Harmonia';
      case 'maroon':
         return 'Fidelitas';
      case 'beige':
         return 'Serenitas';
      case 'coral':
         return 'Calor';
      case 'lavender':
         return 'Levita';
      case 'peach':
         return 'Beatitudo';
      case 'mint':
         return 'Frigidus';
      case 'bronze':
         return 'Aeternum';
      case 'taupe':
         return 'Umbra';
      case 'lilac':
         return 'Somnium';
      case 'zinc':
         return 'Mysticum';
      default:
         return 'Unknown Color';
   }
};

export const getStatusColor = (status: string = '') => {
   const formattedStatus = status?.toLowerCase() ?? '';
   switch (formattedStatus) {
      case 'active':
      case 'unpaid':
      case 'pending':
      case 'scheduled':
         return 'status-active';

      case 'on-hold':
      case 'processing':
         return 'status-onhold';

      case 'completed':
      case 'paid':
      case 'finished':
         return 'status-completed';

      case 'cancelled':
         return 'status-cancelled';

      default:
         return 'status-active';
   }
};

export const validateUrl = (inputValue: string) => {
   if (!inputValue.trim()) {
      return { error: 'URL cannot be empty.' };
   }

   try {
      new URL(inputValue);
      return { error: '' };
   } catch {
      return {
         error: 'Please enter a valid link. (Starting with http:// or https://)',
      };
   }
};

export const getFileTypeFromMimeType = (mime: string): FileType => {
   const mimeMap: Record<string, FileType> = {
      // Image types
      'image/jpeg': 'image',
      'image/png': 'image',
      'image/gif': 'image',
      'image/webp': 'image',
      'image/svg+xml': 'image',
      'image/bmp': 'image',
      'image/tiff': 'image',
      'image/x-icon': 'image',

      // Video types
      'video/mp4': 'video',
      'video/mpeg': 'video',
      'video/quicktime': 'video',
      'video/x-msvideo': 'video',
      'video/x-flv': 'video',
      'video/webm': 'video',

      // Document types
      'application/pdf': 'document',
      'application/msword': 'document',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
         'document',
      'application/rtf': 'document',

      // Code types
      'text/plain': 'code',
      'text/javascript': 'code',
      'application/json': 'code',
      'application/xml': 'code',
      'application/x-python-code': 'code',
      'text/x-c': 'code',
      'text/x-c++': 'code',

      // Archive types
      'application/zip': 'archive',
      'application/x-tar': 'archive',
      'application/x-7z-compressed': 'archive',
      'application/x-rar-compressed': 'archive',

      // Design types
      'application/vnd.adobe.photoshop': 'design',
      'application/x-coreldraw': 'design',
      'image/vnd.dwg': 'design',

      // Spreadsheet types
      'application/vnd.ms-excel': 'spreadsheet',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
         'spreadsheet',

      // Presentation types
      'application/vnd.ms-powerpoint': 'presentation',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation':
         'presentation',

      // Audio types
      'audio/mpeg': 'audio',
      'audio/wav': 'audio',
      'audio/ogg': 'audio',
      'audio/aac': 'audio',
      'audio/flac': 'audio',

      // Database types
      'application/x-sql': 'database',
      'application/vnd.ms-access': 'database',

      // Project Management types
      'application/vnd.ms-project': 'project-management',
      'application/x-trello-json': 'project-management',
   };

   return mimeMap[mime] || 'other';
};
