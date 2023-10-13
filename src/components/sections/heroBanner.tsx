import {Suspense} from 'react'
import {motion, useScroll, useTransform} from 'framer-motion'
import Skeleton from '../atoms/skeleton'

export default function HeroBanner() {
   const {scrollYProgress} = useScroll()
   const y = useTransform(scrollYProgress, [0, 1], ['0%', '-200%'])

   return <motion.section
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.3}}
      className={'relative flex justify-center items-center flex-col w-full h-screen'}>
      <h1
         className={'sr-only'}>Mon Festoche</h1>
      <div
         className={'absolute w-screen h-screen t-0 l-0 overflow-hidden '}>
         <Suspense fallback={<Skeleton />}>
            <ResponsiveImage />
         </Suspense>
      </div>
      <motion.div
         style={{y}}
         initial={{opacity: 0}}
         animate={{opacity: 1}}
         transition={{duration: 1.2}}
         className={'border border-primary-content shadow-2xl rounded-3xl bg-primary-content/60 backdrop-blur-md h-2/3 px-4 sm:px-8 md:px-12 lg:px-20 md:h-auto drop-shadow-xl w-full max-w-[600px] lg:max-w-[980px] md:aspect-square lg:aspect-video flex flex-col justify-center items-center gap-2 text-center prose'}>
         <motion.h2
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8, delay: 0.4}}
            className={'text-3xl md:text-4xl uppercase text-balance'}>Trouver les meilleurs festivales de France
         </motion.h2>
         <motion.p
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8, delay: 0.8}}
            className={'font-inter '}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Adipisci aut autem consectetur consequatur
            consequuntur error esse, facilis fuga harum impedit itaque iusto molestiae nemo, nihil non nulla odio
            perspiciatis possimus praesentium quaerat qui rerum sequi tenetur vero vitae! Amet earum excepturi,
            exercitationem maxime molestiae nihil pariatur quae quaerat quasi voluptate.
         </motion.p>
         <ButtonCTA />

      </motion.div>
   </motion.section>
}

type FileNames = 'conft' | 'golden-hour' | 'public'
const ResponsiveImage = () => {
   const {scrollYProgress} = useScroll()
   const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
   const fileName: FileNames = 'public'
   return (
      <motion.img
         style={{y}}
         initial={{opacity: 0, scale: 1.6, filter: 'blur(10px)'}}
         animate={{opacity: 1, scale: 1, filter: 'blur(0px)'}}
         transition={{opacity: {duration: 0.6}, scale: {duration: 2}, filter: {duration: 0.8}}}
         className={'w-full h-full object-cover object-center'}
         srcSet={`/${fileName}-sd.jpg 480w, /${fileName}-hd.jpg 1080w, /${fileName}-uhd.jpg 2160w`}
         src={`${fileName}-sd.jpg`}// default image
         alt='A description of the image'
      />
   )
}

function ButtonCTA() {
   return <motion.a

      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.8, delay: 1.2}}
      href='#results'
      tabIndex={0}
      className='relative rounded-2xl px-5 py-2.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300'>
               <span
                  className='absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease'></span>
      <span className='relative'>Trouver mon Festival</span>
   </motion.a>
}
