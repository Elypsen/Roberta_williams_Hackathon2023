import {
   createBrowserRouter,
   createRoutesFromElements,
   Link,
   Navigate,
   Route,
   RouterProvider,
} from 'react-router-dom'
import CreatPage from './components/pages/creatFestival.tsx'
import FestivalPage from './components/pages/festivalPage.tsx'
import HomePage from './components/pages/home.page.tsx'
import LoginPage from './components/pages/loginPage.tsx'
import {MainLayout} from './components/pages/main-layout.tsx'
import {ROUTES} from './routes.constants.ts'

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
            path={'/login/'}
            element={<LoginPage />}
         />
         <Route
            path={'/creat/'}
            element={<CreatPage />}
         />

         <Route
            path={'/festival/:id'}
            element={<FestivalPage />}
         />

         <Route
            path={'/page-not-found'}
            element={<NotFound />}
         />
      </Route>
   )
)

function NotFound() {
   return (
      <div className={'flex h-96 w-screen flex-col items-center justify-center gap-8'}>
         <div>Page not found</div>
         <Link
            className={'btn btn-primary'}
            to={'/'}>
            Retour à l&apos;accueil
         </Link>
      </div>
   )
}
