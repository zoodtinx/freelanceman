import { SalesDocument } from "../types/sales-document.type";

export const mockSalesDocument: SalesDocument[] = [
   {
      id: "INV-20250210-001",
      title: "Website Development Invoice",
      category: "invoice",

      number: "INV-20250210-001",
      issuedAt: "2025-02-10",
      currency: "USD",

      projectId: "PRJ-123456",
      projectTitle: "E-Commerce Website Development",
      referenceNumber: "REF-987654",
      projectDescription:
         "Development of a fully responsive e-commerce website using Next.js and Tailwind CSS.",
      selectedProjectClientId: "CLI-001",

      freelancerName: "John Doe",
      freelancerEmail: "john.doe@example.com",
      freelancerPhone: "+1 234-567-8900",
      freelancerTaxId: "123-45-6789",
      freelancerDetail:
         "Freelance web developer specializing in React and TypeScript.",

      clientId: "CLI-001",
      clientName: "Acme Corp",
      clientTaxId: "98-7654321",
      clientAddress: "123 Business Road, Suite 100, New York, NY, USA",
      clientPhone: "+1 987-654-3210",
      clientOffice: "Acme Corp HQ",
      clientDetail: "Leading supplier of industrial goods.",

      items: [
         {
            title: "UI/UX Design",
            description:
               "Wireframing and high-fidelity UI design for the e-commerce platform.",
            rate: 50,
            quantity: 20,
         },
         {
            title: "Frontend Development",
            description:
               "Development of the client-facing website using Next.js and Tailwind.",
            rate: 60,
            quantity: 40,
         },
         {
            title: "Backend Development",
            description:
               "API development using Nest.js and Prisma for database management.",
            rate: 70,
            quantity: 35,
         },
         {
            title: "Payment Integration",
            description:
               "Integration of Stripe for handling customer payments.",
            rate: 55,
            quantity: 10,
         },
         {
            title: "Deployment & Optimization",
            description:
               "Deploying the site to Vercel and optimizing for performance and SEO.",
            rate: 45,
            quantity: 8,
         },
      ],

      subtotal: 50 * 20 + 60 * 40 + 70 * 35 + 55 * 10 + 45 * 8,
      discount: 100,
      tax: 250,
      total: 50 * 20 + 60 * 40 + 70 * 35 + 55 * 10 + 45 * 8 - 100 + 250,
      customAdjustment: 50,
      note: "Thank you for your business. Payment is due within 14 days.",

      createdAt: "2025-02-10T08:00:00Z",
      updatedAt: "2025-02-10T08:00:00Z",
   },
   {
      id: "QUO-20250210-002",
      title: "Branding & Logo Design Quotation",
      category: "quotation",

      number: "QUO-20250210-002",
      issuedAt: "2025-02-10",
      currency: "EUR",

      projectId: "PRJ-654321",
      projectTitle: "Corporate Branding & Identity",
      referenceNumber: "REF-543210",
      projectDescription:
         "Brand identity design, including logo, color palette, typography, and brand guidelines.",
      selectedProjectClientId: "CLI-002",

      freelancerName: "Jane Smith",
      freelancerEmail: "jane.smith@example.com",
      freelancerPhone: "+49 123-456-7890",
      freelancerTaxId: "DE-987654321",
      freelancerDetail: "Freelance branding specialist and graphic designer.",

      clientId: "CLI-002",
      clientName: "Innovate Solutions GmbH",
      clientTaxId: "DE-123456789",
      clientAddress: "456 Design Street, Berlin, Germany",
      clientPhone: "+49 987-654-3210",
      clientOffice: "Innovate Solutions HQ",
      clientDetail: "Tech startup specializing in AI-powered solutions.",

      items: [
         {
            title: "Logo Concept & Design",
            description:
               "Creating three unique logo concepts based on market research and client requirements.",
            rate: 150,
            quantity: 2,
         },
         {
            title: "Brand Style Guide",
            description:
               "Defining brand colors, typography, and logo usage guidelines.",
            rate: 120,
            quantity: 1,
         },
         {
            title: "Business Card Design",
            description:
               "Custom business card design including front and back layouts.",
            rate: 50,
            quantity: 2,
         },
         {
            title: "Social Media Kit",
            description:
               "Custom graphics and profile banners for Facebook, Twitter, and LinkedIn.",
            rate: 100,
            quantity: 1,
         },
         {
            title: "Stationery Design",
            description: "Letterhead, envelope, and email signature design.",
            rate: 80,
            quantity: 1,
         },
      ],

      subtotal: 150 * 2 + 120 * 1 + 50 * 2 + 100 * 1 + 80 * 1,
      discount: 50,
      tax: 180,
      total: 150 * 2 + 120 * 1 + 50 * 2 + 100 * 1 + 80 * 1 - 50 + 180,
      customAdjustment: 20,
      note: "Quotation valid for 30 days. Please confirm via email to proceed.",

      createdAt: "2025-02-10T09:15:00Z",
      updatedAt: "2025-02-10T09:15:00Z",
   },
   {
      id: "REC-20250210-003",
      title: "Video Production Receipt",
      category: "receipt",

      number: "REC-20250210-003",
      issuedAt: "2025-02-10",
      currency: "GBP",

      projectId: "PRJ-789123",
      projectTitle: "Promotional Video for Product Launch",
      referenceNumber: "REF-321987",
      projectDescription:
         "Full video production including scripting, filming, and post-production for a product launch.",
      selectedProjectClientId: "CLI-003",

      freelancerName: "Michael Johnson",
      freelancerEmail: "michael.johnson@example.com",
      freelancerPhone: "+44 20 7946 0123",
      freelancerTaxId: "GB-567891234",
      freelancerDetail: "Freelance videographer and motion graphics artist.",

      clientId: "CLI-003",
      clientName: "NextGen Tech Ltd.",
      clientTaxId: "GB-987654321",
      clientAddress: "789 Innovation Street, London, UK",
      clientPhone: "+44 20 1234 5678",
      clientOffice: "NextGen Tech HQ",
      clientDetail:
         "Tech company specializing in smart gadgets and AI-driven solutions.",

      items: [
         {
            title: "Concept Development",
            description:
               "Creating a storyboard and script for the promotional video.",
            rate: 80,
            quantity: 3,
         },
         {
            title: "Filming & Production",
            description:
               "On-site filming with professional-grade camera equipment.",
            rate: 200,
            quantity: 2,
         },
         {
            title: "Post-Production Editing",
            description: "Editing, color correction, and sound design.",
            rate: 150,
            quantity: 2,
         },
         {
            title: "Motion Graphics & Animations",
            description:
               "Adding engaging motion graphics and animations to the video.",
            rate: 120,
            quantity: 1,
         },
         {
            title: "Final Video Export & Delivery",
            description:
               "Rendering and exporting the final video in multiple formats.",
            rate: 90,
            quantity: 1,
         },
      ],

      subtotal: 80 * 3 + 200 * 2 + 150 * 2 + 120 * 1 + 90 * 1,
      discount: 75,
      tax: 220,
      total: 80 * 3 + 200 * 2 + 150 * 2 + 120 * 1 + 90 * 1 - 75 + 220,
      customAdjustment: 30,
      note: "Payment received. Thank you for your business!",

      createdAt: "2025-02-10T10:30:00Z",
      updatedAt: "2025-02-10T10:30:00Z",
   },
];
