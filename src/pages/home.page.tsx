import HeroBanner from '../components/heroBanner'
import ResultSection from '../components/resultSection'

export default function HomePage() {


   return (
      <main className={'min-h-screen w-screen '}>
         {/*HERO*/}
         <HeroBanner />
         {/*RESULTS*/}
         <ResultSection />

      </main>
   )
}


