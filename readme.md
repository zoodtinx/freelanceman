<p align="center">
    <img src="https://ik.imagekit.io/freelanceman/github/flm-readme-header.png?updatedAt=1756222222054" alt="FreelanceMan - A Workspace Built For Solo Freelancers" />
</p>

__FreelanceMan__ is a dedicated workspace platform that addresses the complex organizational needs of solo freelancers juggling multiple client projects, providing centralized file management, note organization, and billing document generation to prevent workflow chaos.

## ✨ Features

### • Task & Event Management
Organize, assign, and track tasks and events with deadlines, priorities, and progress updates, all from a clean, dialog-driven interface.

### • File Hosting & Sharing
Upload, categorize, and share project files via AWS S3. Add metadata, generate shareable links, or attach the external file link to prevent redundancy.

### • Partner & Contact Management
Keep track of suppliers, collaborators, and clients. View related documents like invoices and budgets for each partner.

### • Bills Builder
Generate professional billing documents from user data, reducing time and tools for freelancers to get paid.

## 📱 Live Demo

- **Live Demo**: [freelanceman.peerapol.dev](https://freelanceman.peerapol.dev/)

## ⚙️ Tech Stack

### Architecture
- __Frontend__: React (Vite, client side only), Tailwind, Zustand, React Query, Shadcn (Radix UI)  
  - Dialog-driven UI for tasks, events, files, and partners  
  - Inline editing and multi-action dialogs  
  - Server-side data handling for filtering, sorting, and pagination  

- __Backend__: NestJS, Prisma, PostgreSQL  
  - REST API for CRUD operations on projects, tasks, events, files, and contacts  
  - Authentication with JWT & OAuth  
  - File uploads via AWS S3  
  - Generate billing documents and PDFs server-side using Puppeteer

- __Database__: PostgreSQL  
  - Core models: User, Project, Task, Event, File, Contact, Partner  
  - Relational design with Prisma ORM  

### Infrastructure
- __Deployment__:  
  - Frontend on Cloudflare Pages  
  - Backend & Database on AWS (EC2 / RDS)  

- __File Storage__:  
  - AWS S3 for uploads, downloads, metadata, and shareable links  

## 💡 What I Learned
### Full-Stack Development
- __State Management__:  
    - Organizing complex UI states with Zustand for scalable and maintainable frontend logic  
- __API Integration__:  
    - Connecting frontend dialogs to backend CRUD operations efficiently with React Query  

### Cloud & Deployment
- __File Handling__:  
    - Uploading, categorizing, and sharing files using AWS S3  
- __Deployment Workflows__:  
    - Building and deploying full-stack apps on Cloudflare Pages and AWS  

### UX & Dialog Design
- __Dialog-Driven UI__:  
    - Designing inline-editing workflows and multi-action dialogs for smooth user experiences  
