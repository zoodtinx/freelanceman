import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from '../routes/HomePage';
import ProjectPage from '@/routes/ProjectPage';
import ActionPage from '@/routes/ActionPage';
import AllProjectPage from '@/routes/AllProjectPage';
import PartnersPage from '@/routes/PartnersPage';
import FilePage from '@/routes/FilePage';
import AllClientsPage from 'src/routes/AllClientPage';
import ClientPage from '@/routes/ClientPage';
import IncomePage from 'src/routes/IncomePage';
import SalesDocumentBuilderPage from '@/components/page-elements/documents/SalesDocumentBuilderPage';
import RootPage from '@/routes/RootPage';
import AuthPage from '@/routes/WelcomePage';

export const router = createBrowserRouter([
   {
      path: '/',
      element: <RootPage />,
      children: [
         {
            path: 'welcome',
            element: <AuthPage />,
         },
         {
            path: 'home',
            element: <Home />,
            children: [
               {
                  path: '',
                  element: <Navigate to={'projects'} />,
               },
               {
                  path: 'projects',
                  children: [
                     {
                        path: '',
                        element: <AllProjectPage />,
                     },
                     {
                        path: ':projectId',
                        errorElement: (
                           <p className="w-full h-full flex justify-center items-center">
                              Error
                           </p>
                        ),
                        element: <ProjectPage />,
                     },
                  ],
               },
               {
                  path: 'actions',
                  element: <ActionPage />,
               },
               {
                  path: 'clients',
                  children: [
                     {
                        path: '',
                        element: <AllClientsPage />,
                     },
                     {
                        path: ':clientId',
                        element: <ClientPage />,
                     },
                  ],
               },
               {
                  path: 'partners',
                  element: <PartnersPage />,
               },
               {
                  path: 'files',
                  element: <FilePage />,
               },
               {
                  path: 'income',
                  children: [
                     {
                        path: '',
                        element: <IncomePage />,
                     },
                     {
                        path: 'document',
                        children: [
                           {
                              path: ':id',
                              element: <SalesDocumentBuilderPage />,
                           },
                           {
                              path: 'quotation',
                              children: [
                                 {
                                    path: ':projectId',
                                    element: (
                                       <SalesDocumentBuilderPage category="quotation" />
                                    ),
                                 },
                              ],
                           },
                           {
                              path: 'invoice',
                              children: [
                                 {
                                    path: ':projectId',
                                    element: (
                                       <SalesDocumentBuilderPage category="invoice" />
                                    ),
                                 },
                              ],
                           },
                           {
                              path: 'receipt',
                              children: [
                                 {
                                    path: ':projectId',
                                    element: (
                                       <SalesDocumentBuilderPage category="receipt" />
                                    ),
                                 },
                              ],
                           },
                        ],
                     },
                  ],
               },
               {
                  path: ':projectId',
                  element: <ProjectPage />,
               },
            ],
         },
      ],
   },
]);
