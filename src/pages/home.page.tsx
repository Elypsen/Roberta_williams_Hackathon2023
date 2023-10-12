export default function HomePage() {


   return (
      <main className={'min-h-screen w-screen '}>
         {/*HERO*/}
         <section className={'relative flex justify-center items-center flex-col w-full h-screen'}><h1
            className={'sr-only'}>Mon Festoche</h1>
            <div className={'absolute t-0 l-0 h-full w-full bg-gray-500 animate-pulse opacity-50'}></div>
            <a href='#results'
               className='relative rounded px-5 py-2.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300'>
               <span
                  className='absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease'></span>
               <span className='relative'>Button Text</span>
            </a>
         </section>
         {/*RESULTS*/}
         <section id={'results'} className={'w-full min-h-48'}>
            <div className='relative form-control w-full max-w-xs border'>
               <label className='label'>
                  <span className='label-text'>What is your name?</span>
               </label>
               <input type='text' placeholder='Type here' className='input input-bordered w-full max-w-xs' />
               <label className='label'>
                  <span className='label-text-alt'>Some message feedback to user...</span>
               </label>
            </div>
            <h2>RESULTATS</h2>

         </section>
      </main>
   )
}

