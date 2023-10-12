export function Footer() {
   return (
      <footer className=' bg-base-200 m-4 w-screen rounded-lg shadow'>
         <div className='mx-auto w-full max-w-screen-xl p-4 md:py-8'>
            <div className='sm:flex sm:items-center sm:justify-between'>
               <p className='mb-4 flex items-center sm:mb-0'>
                  <span className='self-center whitespace-nowrap text-2xl font-semibold dark:text-white'>
                     Mon Festoche
                  </span>
               </p>
               <ul
                  className='mb-6 flex flex-wrap items-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:mb-0 space-x-4 md:space-x-6'>
                  <li>
                     <p className='hover:underline hover:cursor-not-allowed'>Privacy Policy</p>
                  </li>
                  <li>
                     <p className='hover:underline  hover:cursor-not-allowed'>Licensing</p>
                  </li>
                  <li>
                     <p className='hover:underline hover:cursor-not-allowed'>Contact</p>
                  </li>
                  <li>
                     <p className='hover:underline hover:cursor-not-allowed'>Fake Pages</p>
                  </li>
               </ul>
            </div>
            <hr className='my-6 border-gray-700 sm:mx-auto lg:my-8' />
            <p className='block text-sm text-gray-500 dark:text-gray-400 sm:text-center'>
               © 2023 <span className='hover:underline'>Hackathon™</span>
            </p>
            <p className='block text-sm text-gray-500 dark:text-gray-400 sm:text-center'>
               Team Roberta Williams All Rights Reserved.
            </p>
         </div>
      </footer>
   )
}

