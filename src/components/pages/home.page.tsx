import { useEffect } from "react";
import HeroBanner from "../sections/heroBanner";
import ResultSection from "../sections/resultSection";
import { getCount } from "../../services/api.service";

export default function HomePage() {
   useEffect(() => {
      getCount().then((res) => console.log("useEffect Count:" + res ))
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


