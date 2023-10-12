import { useEffect } from "react";
import HeroBanner from "../sections/heroBanner";
import ResultSection from "../sections/resultSection";
import { getAllFestivals } from "../../services/api.service";


export default function HomePage() {
   useEffect(() => {
      getAllFestivals().then((result) => console.log("useeffect:", result) ).catch(err=> console.log(err)); 
   })

   return (
      <main className={'min-h-screen w-screen '}>
         {/*HERO*/}
         <HeroBanner />
         {/*RESULTS*/}
         <ResultSection />

      </main>
   )
}


