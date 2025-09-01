import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { LoadingPage } from '@/routes/LoadingPage';

// Lazy load all route components
const Home = lazy(() => import('../routes/HomePage'));
const ProjectPage = lazy(() => import('@/routes/ProjectPage'));
const ActionPage = lazy(() => import('@/routes/ActionPage'));
const AllProjectPage = lazy(() => import('@/routes/AllProjectPage'));
const PartnersPage = lazy(() => import('@/routes/PartnersPage'));
const FilePage = lazy(() => import('@/routes/FilePage'));
const AllClientsPage = lazy(() => import('src/routes/AllClientPage'));
const ClientPage = lazy(() => import('@/routes/ClientPage'));
const IncomePage = lazy(() => import('src/routes/IncomePage'));
const SalesDocumentBuilderPage = lazy(() => import('@/components/page-elements/documents-page/SalesDocumentBuilderPage'));
const RootPage = lazy(() => import('@/routes/RootPage'));
const AuthPage = lazy(() => import('@/routes/WelcomePage'));

// Wrapper component to handle Suspense
const LazyComponent = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoadingPage mode='section' />}>
    {children}
  </Suspense>
);

export const router = createBrowserRouter([
   {
      path: '/',
      element: <LazyComponent><RootPage /></LazyComponent>,
      children: [
         {
            path: 'welcome',
            element: <LazyComponent><AuthPage /></LazyComponent>,
         },
         {
            path: 'home',
            element: <LazyComponent><Home /></LazyComponent>,
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
                        element: <LazyComponent><AllProjectPage /></LazyComponent>,
                     },
                     {
                        path: ':projectId',
                        errorElement: (
                           <p className="w-full h-full flex justify-center items-center">
                              Error
                           </p>
                        ),
                        element: <LazyComponent><ProjectPage /></LazyComponent>,
                     },
                  ],
               },
               {
                  path: 'actions',
                  element: <LazyComponent><ActionPage /></LazyComponent>,
               },
               {
                  path: 'clients',
                  children: [
                     {
                        path: '',
                        element: <LazyComponent><AllClientsPage /></LazyComponent>,
                     },
                     {
                        path: ':clientId',
                        element: <LazyComponent><ClientPage /></LazyComponent>,
                     },
                  ],
               },
               {
                  path: 'partners',
                  element: <LazyComponent><PartnersPage /></LazyComponent>,
               },
               {
                  path: 'files',
                  element: <LazyComponent><FilePage /></LazyComponent>,
               },
               {
                  path: 'income',
                  children: [
                     {
                        path: '',
                        element: <LazyComponent><IncomePage /></LazyComponent>,
                     },
                     {
                        path: 'document',
                        children: [
                           {
                              path: ':id',
                              element: <LazyComponent><SalesDocumentBuilderPage /></LazyComponent>,
                           },
                           {
                              path: 'quotation',
                              children: [
                                 {
                                    path: ':projectId',
                                    element: (
                                       <LazyComponent>
                                         <SalesDocumentBuilderPage category="quotation" />
                                       </LazyComponent>
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
                                       <LazyComponent>
                                         <SalesDocumentBuilderPage category="invoice" />
                                       </LazyComponent>
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
                                       <LazyComponent>
                                         <SalesDocumentBuilderPage category="receipt" />
                                       </LazyComponent>
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
                  element: <LazyComponent><ProjectPage /></LazyComponent>,
               },
            ],
         },
      ],
   },
]);
