import React from 'react';
import { Image, Video, FileText, Code, Layout, Table, FileStack, Sliders, Music, Archive, Film, Briefcase, Database, Monitor } from 'lucide-react';
import { FileCategory } from '@types';

export const getIcon = (fileType: string):JSX.Element => {
  switch (fileType) {
    case "image":
      return <Image />;
    case "video":
      return <Video />;
    case "document":
      return <FileText />;
    case "code":
      return <Code />;
    case "design":
      return <Layout />;
    case "spreadsheet":
      return <Table />;
    case "presentation":
      return <Monitor />; 
    case "audio":
      return <Music />;
    case "archive":
      return <Archive />;
    case "video-editing":
      return <Film />;
    case "project-management":
      return <Briefcase />;
    case "database":
      return <Database />;
    case "other":
    default:
      return <FileStack />; 
  }
};

export const convertCategory = (fileCategory: FileCategory) => {
   switch (fileCategory) {
      case 'document':
         return 'Document';
      case 'project-assets':
         return 'Project asset';
      case 'project-file':
         return 'Project file';
   }
};