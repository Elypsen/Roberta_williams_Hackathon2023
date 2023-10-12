import { useEffect } from "react";
import HeroBanner from "../sections/heroBanner";
import ResultSection from "../sections/resultSection";
import {  getFestivalByDpt, getOneFestival } from "../../services/api.service";


export default function HomePage() {
   useEffect(() => {
      getOneFestival("2fdfad7eeb525992adee9cae839722461a658728").then((result) => console.log("useeffect:", result) ).catch(err=> console.log("useEffect",err)); 
   },[])

   return (
      <main className={'min-h-screen w-screen '}>
         {/*HERO*/}
         <HeroBanner />
         {/*RESULTS*/}
         <ResultSection />

      </main>
   )
}


