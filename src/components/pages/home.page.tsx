import HeroBanner from "../sections/heroBanner";
import ResultSection from "../sections/resultSection";


export default function HomePage() {
   // useEffect(() => {
   //    getFestivalByDpt("Hérault").then((result) => console.log("useeffect:", result) ).catch(err=> console.log("useEffect",err));
   // },[])

   return (
      <main className={'min-h-screen w-screen '}>
         {/*HERO*/}
         <HeroBanner />
         {/*RESULTS*/}
         <ResultSection />

      </main>
   )
}


