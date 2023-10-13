import {motion} from 'framer-motion'

const token = JSON.parse(localStorage.getItem('token') || 'null');
export default function Header() {
   // const isLoggedIn = useAuthStore(state => state.isLoggedIn)
   // const logout = useAuthStore(state => state.logout)
   // const {pathname} = useLocation()
   const logout=()=> {
      localStorage.removeItem('token')
      window.location.reload()
   }
   return (
      <motion.header
         initial={{opacity: 0}}
         animate={{opacity: 1}}
         transition={{duration: 0.3}}
         className='bg-primary-content w-screen px-4 py-2.5 lg:px-6'>
         <motion.nav
            initial={{opacity: 0, y: -100}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, delay: 0.5}} className='w-full h-full'>
            <div className='mx-auto flex max-w-screen-xl flex-wrap items-center justify-between'>
               <p className='text-xl text-base-content font-inter uppercase'>Mon Festoche</p>
               <nav className='flex items-center lg:order-2'>

               </nav>
            </div>
            <div className='card-actions'>
           
            
          {token !== null && (
            <button  onClick={logout} className='btn btn-danger'>
             logout
            </button>
           )}
         </div>
         </motion.nav>
      </motion.header>
   )
}

