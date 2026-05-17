import { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout.jsx';
import { Loader2 } from 'lucide-react';

// Lazy load pages for better performance (Code Splitting)
const Home = lazy(() => import('@/pages/Home/Home.jsx'));
const About = lazy(() => import('@/pages/About/About.jsx'));
const Products = lazy(() => import('@/pages/Products/Products.jsx'));
const Services = lazy(() => import('@/pages/Services/Services.jsx'));
const Contact = lazy(() => import('@/pages/Contact/Contact.jsx'));
const KnowledgeCenter = lazy(() => import('@/pages/KnowledgeCenter/KnowledgeCenter.jsx'));
const Projects = lazy(() => import('@/pages/Projects/Projects.jsx'));
const NotFound = lazy(() => import('@/pages/NotFound/NotFound.jsx'));

// Loading Fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
  </div>
);

const router = createBrowserRouter(
  [
    {
      element: <MainLayout />,
      children: [
        { path: '/', element: <Suspense fallback={<PageLoader />}><Home /></Suspense> },
        { path: '/about', element: <Suspense fallback={<PageLoader />}><About /></Suspense> },
        { path: '/products', element: <Suspense fallback={<PageLoader />}><Products /></Suspense> },
        { path: '/services', element: <Suspense fallback={<PageLoader />}><Services /></Suspense> },
        { path: '/projects', element: <Suspense fallback={<PageLoader />}><Projects /></Suspense> },
        { path: '/knowledge-center', element: <Suspense fallback={<PageLoader />}><KnowledgeCenter /></Suspense> },
        { path: '/contact', element: <Suspense fallback={<PageLoader />}><Contact /></Suspense> },
        { path: '*', element: <Suspense fallback={<PageLoader />}><NotFound /></Suspense> },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
