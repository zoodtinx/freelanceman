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

export const capitalizeFirstChar = (str: string): string => {
   if (!str) return '';
   return str.charAt(0).toUpperCase() + str.slice(1);
};

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
   fileType: string;
   className?: string;
};

export const FileIconByMimeType = ({
   mimeType = 'application/octet-stream',
   className = '',
}): JSX.Element => {
   switch (true) {
      case mimeType.startsWith('image/'):
         return <Image className={className} />;

      case mimeType.startsWith('video/'):
         return <Video className={className} />;

      case mimeType === 'application/pdf':
         return <FileText className={className} />;

      case mimeType.startsWith('text/'):
         return <Code className={className} />;

      case mimeType === 'application/msword':
      case mimeType ===
         'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
         return <FileText className={className} />;
      case mimeType === 'application/vnd.ms-excel':
      case mimeType ===
         'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
         return <Table className={className} />;
      case mimeType === 'application/vnd.ms-powerpoint':
      case mimeType ===
         'application/vnd.openxmlformats-officedocument.presentationml.presentation':
         return <Monitor className={className} />;

      case mimeType.startsWith('audio/'):
         return <Music className={className} />;

      case mimeType.startsWith('application/zip'):
      case mimeType.startsWith('application/x-tar'):
      case mimeType.startsWith('application/gzip'):
         return <Archive className={className} />;

      case mimeType.startsWith('video/mp4'):
      case mimeType.startsWith('video/quicktime'):
         return <Film className={className} />;

      case mimeType.startsWith('application/x-project-management'):
         return <Briefcase className={className} />;

      case mimeType.startsWith('application/x-sqlite3'):
         return <Database className={className} />;

      case mimeType.startsWith('application/vnd.ms-design'):
      case mimeType.startsWith('application/figma'):
         return <Layout className={className} />;

      default:
         return <FileStack className={className} />;
   }
};

export const FileIconByExtension: React.FC<FileIconByExtensionProps> = ({
   fileType = 'other',
   className = '',
}): JSX.Element => {
   switch (fileType) {
      case 'image':
         return <Image className={className} />;
      case 'video':
         return <Video className={className} />;
      case 'document':
         return <FileText className={className} />;
      case 'code':
         return <Code className={className} />;
      case 'design':
         return <Layout className={className} />;
      case 'spreadsheet':
         return <Table className={className} />;
      case 'presentation':
         return <Monitor className={className} />;
      case 'audio':
         return <Music className={className} />;
      case 'archive':
         return <Archive className={className} />;
      case 'video-editing':
         return <Film className={className} />;
      case 'project-management':
         return <Briefcase className={className} />;
      case 'database':
         return <Database className={className} />;
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
   projectStatus: 'active' | 'on-hold' | 'completed' | ''
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
   paymentStatus: 'unpaid' | 'processing' | 'paid' | ''
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
      const url = new URL(inputValue);
      if (!url.protocol || !url.hostname) {
         return { error: 'Invalid URL format.' };
      }
      return { error: '' };
   } catch {
      return { error: 'Invalid URL format.' };
   }
};

export const getFileTypeFromMimeType = (mime: string): FileType => {
   const mimeMap: Record<string, FileType> = {
      'image/jpeg': 'image',
      'image/png': 'image',
      'image/gif': 'image',
      'image/webp': 'image',
      'image/avif': 'image',
      'image/svg+xml': 'image',
      'image/bmp': 'image',
      'image/tiff': 'image',
      'image/x-icon': 'image',

      'video/mp4': 'video',
      'video/mpeg': 'video',
      'video/quicktime': 'video',
      'video/x-msvideo': 'video',
      'video/x-flv': 'video',
      'video/webm': 'video',

      'application/pdf': 'document',
      'application/msword': 'document',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
         'document',
      'application/rtf': 'document',

      'text/plain': 'code',
      'text/javascript': 'code',
      'application/json': 'code',
      'application/xml': 'code',
      'application/x-python-code': 'code',
      'text/x-c': 'code',
      'text/x-c++': 'code',

      'application/zip': 'archive',
      'application/x-tar': 'archive',
      'application/x-7z-compressed': 'archive',
      'application/x-rar-compressed': 'archive',

      'application/vnd.adobe.photoshop': 'design',
      'application/x-coreldraw': 'design',
      'image/vnd.dwg': 'design',

      'application/vnd.ms-excel': 'spreadsheet',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
         'spreadsheet',

      'application/vnd.ms-powerpoint': 'presentation',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation':
         'presentation',

      'audio/mpeg': 'audio',
      'audio/wav': 'audio',
      'audio/ogg': 'audio',
      'audio/aac': 'audio',
      'audio/flac': 'audio',

      'application/x-sql': 'database',
      'application/vnd.ms-access': 'database',

      'application/vnd.ms-project': 'project-management',
      'application/x-trello-json': 'project-management',
   };

   return mimeMap[mime] || 'other';
};
