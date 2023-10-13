import {motion, useScroll, useTransform} from 'framer-motion'
import {Suspense} from 'react'
import Skeleton from '../atoms/skeleton'

export default function HeroBanner() {
   const {scrollYProgress} = useScroll()
   const y = useTransform(scrollYProgress, [0, 1], ['0%', '-200%'])

   return (
      <motion.section
         initial={{opacity: 0}}
         animate={{opacity: 1}}
         transition={{duration: 0.3}}
         className={'relative flex h-screen w-full flex-col items-center justify-center'}>
         <h1 className={'sr-only'}>Mon Festoche</h1>
         <div className={'t-0 l-0 absolute h-screen w-screen overflow-hidden '}>
            <Suspense fallback={<Skeleton />}>
               <ResponsiveImage />
            </Suspense>
         </div>
         <motion.div
            style={{y}}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 1.2}}
            className={
               'prose flex h-2/3 w-full max-w-[600px] flex-col items-center justify-center gap-2 rounded-3xl border border-primary-content bg-primary-content/60 px-4 text-center shadow-2xl drop-shadow-xl backdrop-blur-md sm:px-8 md:aspect-square md:h-auto md:px-12 lg:aspect-video lg:max-w-[980px] lg:px-20'
            }>
            <motion.h2
               initial={{opacity: 0, y: 20}}
               animate={{opacity: 1, y: 0}}
               transition={{duration: 0.8, delay: 0.4}}
               className={'text-3xl uppercase text-balance md:text-4xl'}>
               Trouver les meilleurs festivales de France
            </motion.h2>
            <motion.p
               initial={{opacity: 0, y: 20}}
               animate={{opacity: 1, y: 0}}
               transition={{duration: 0.8, delay: 0.8}}
               className={'font-inter '}>
               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aut autem
               consectetur consequatur consequuntur error esse, facilis fuga harum impedit itaque
               iusto molestiae nemo, nihil non nulla odio perspiciatis possimus praesentium quaerat
               qui rerum sequi tenetur vero vitae! Amet earum excepturi, exercitationem maxime
               molestiae nihil pariatur quae quaerat quasi voluptate.
            </motion.p>
            <ButtonCTA />
         </motion.div>
      </motion.section>
   )
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
         className={'h-full w-full object-cover object-center'}
         srcSet={`/${fileName}-sd.jpg 480w, /${fileName}-hd.jpg 1080w, /${fileName}-uhd.jpg 2160w`}
         src={`${fileName}-sd.jpg`} // default image
         alt="A description of the image"
      />
   )
}

function ButtonCTA() {
   return (
      <motion.a
         initial={{opacity: 0, y: 20}}
         animate={{opacity: 1, y: 0}}
         transition={{duration: 0.8, delay: 1.2}}
         href="#results"
         tabIndex={0}
         className="group relative relative overflow-hidden rounded-2xl bg-green-500 px-5 py-2.5 text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 hover:ring-2 hover:ring-green-400 hover:ring-offset-2">
         <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-1000 group-hover:-translate-x-40"></span>
         <span className="relative">Trouver mon Festival</span>
      </motion.a>
   )
}
