import {createBrowserRouter, createRoutesFromElements, Link, Navigate, Route, RouterProvider} from 'react-router-dom'
import {ROUTES} from './routes.constants.ts'
import {MainLayout} from './components/pages/main-layout.tsx'
import HomePage from './components/pages/home.page.tsx'


/**
 * App point of the application
 * Provides Router and Navigation
 **/
export default function Router() {
   return <RouterProvider router={router} />
}

const router = createBrowserRouter(
   createRoutesFromElements(
      <Route
         path={ROUTES.index}
         errorElement={<Navigate to={'/page-not-found'} />}
         element={<MainLayout />}>
         <Route
            index
            element={<HomePage />}
         />
         <Route
            path={'/page-not-found'}
            element={<NotFound />}
         />
      </Route>,
   ),
)

function NotFound() {
   return <div className={'w-screen h-96 flex flex-col justify-center items-center gap-8'}>
      <div>Page not found</div>
      <Link className={'btn btn-primary'} to={'/'}>Retour à l&apos;accueil</Link>
   </div>
}
