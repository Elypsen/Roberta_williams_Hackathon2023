import {
   createBrowserRouter,
   createRoutesFromElements,
   Route,
   RouterProvider,
} from 'react-router-dom';

import {ROUTES} from './routes.constants.ts';
import { MainLayout } from './components/pages/main-layout.tsx';
import HomePage from './components/pages/home.page.tsx';

/**
 * App point of the application
 * Provides Router and Navigation
 **/
export default function Router() {
   return <RouterProvider router={router}></RouterProvider>;
}

const router = createBrowserRouter(
   createRoutesFromElements(
      <Route
         path={ROUTES.index}
         element={<MainLayout />}>
         <Route
            index
            element={<HomePage />}
         />
         {/*<Route*/}
         {/*   path={ROUTES.auth}*/}
         {/*   element={<LoginPage />}*/}
         {/*/>*/}
      </Route>
   )
);
