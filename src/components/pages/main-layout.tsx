import {Outlet} from 'react-router-dom'
import {useFestivalStrategy} from '../../stores/useStore.tsx'
import {Footer} from '../molecules/footer'
import Header from '../organisms/header'

export function MainLayout() {
   useFestivalStrategy({query: 'getAll', value: null})
   return (
      <section
         className={
            'flex flex-col items-center justify-between selection:bg-primary selection:text-primary-content'
         }>
         <Header />
         <Outlet />
         <Footer />
      </section>
   )
}
