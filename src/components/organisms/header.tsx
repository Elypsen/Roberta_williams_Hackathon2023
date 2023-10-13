import {motion} from 'framer-motion'
import {Link} from 'react-router-dom'

export default function Header() {
   // const isLoggedIn = useAuthStore(state => state.isLoggedIn)
   // const logout = useAuthStore(state => state.logout)
   // const {pathname} = useLocation()
   return (
      <motion.header
         initial={{opacity: 0}}
         animate={{opacity: 1}}
         transition={{duration: 0.3}}
         className="w-screen bg-primary-content px-4 py-2.5 lg:px-6">
         <motion.nav
            initial={{opacity: 0, y: -100}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, delay: 0.5}}
            className="h-full w-full">
            <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">
               <Link
                  to={'/'}
                  className="font-inter btn btn-link text-xl uppercase text-base-content no-underline">
                  Mon Festoche
               </Link>
               <nav className="flex items-center lg:order-2"></nav>
            </div>
         </motion.nav>
      </motion.header>
   )
}
