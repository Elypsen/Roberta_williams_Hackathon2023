import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {getFestivalByName, getSampleFestivals} from '../../services/api.service'
import {Festival, useStore} from '../../stores/useStore.tsx'
import SelectDepartement from '../organisms/selectDepartement'
const token = JSON.parse(localStorage.getItem('token') || 'null') // Utilisation de null comme valeur par défaut si la clé 'token' est absente

export default function ResultSection() {
   const store = useStore(state => state)
   // console.log(store)
   const [errorMessage, setErrorMessage] = useState<null | string>(null)

   const [useFestivals, setUseFestivals] = useState<Festival[] | null>(null)

   useEffect(() => {
      // If there are departments in the store we don't need to fetch them again
      if (store.festivalsByDpt && store.festivalsByDpt.length > 0) return
      // If there are festivals in the store we don't need to fetch them again
      else if (store.festivals && store.festivals.length > 0) return
      else if (store.festivalsByName && store.festivalsByName.length > 0) return
      // If there are no festivals in the store we fetch them
      else {
         getSampleFestivals()
            .then(data => {
               if (data) {
                  store.setFestivals(data)
               }
            })
            .catch(error => setErrorMessage(error.message))
      }
   }, [])

   useEffect(() => {
      if (store.festivalsByDpt && store.festivalsByDpt.length > 0) {
         setUseFestivals(store.festivalsByDpt)
      } else if (store.festivalsByName && store.festivalsByName.length > 0) {
         setUseFestivals(store.festivalsByName)
      } else if (store.festivals && store.festivals.length > 0) {
         setUseFestivals(store.festivals)
      }
   }, [store.festivalsByDpt, store.festivals, store.festivalsByName])

   if (!useFestivals) {
      return (
         <div
            id="results"
            className={'mt-4 flex flex-wrap justify-center gap-4'}>
            {Array.from({length: 30}, (_, i) => i).map(i => (
               <div
                  key={i}
                  className="aspect-square w-full animate-pulse rounded-xl bg-gray-400 shadow-xl sm:w-128 md:w-96"
               />
            ))}
         </div>
      )
   }

   return (
      <section
         id={'results'}
         className={'min-h-48 flex min-h-screen w-full flex-col items-center'}>
         <div className={'flex w-full flex-wrap items-center justify-center gap-2 bg-base-200 '}>
            <SelectDepartement />
            <SearchName />
         </div>
         <h2 className={'tetx-xl my-8 font-bold uppercase'}>
            {useFestivals.length > 0
               ? useFestivals.length > 1
                  ? `RESULTATS : ${useFestivals.length}`
                  : 'RESULTAT : '
               : 'Pas de résultats trouvés'}
         </h2>
         {errorMessage ? (
            <p>{errorMessage}</p>
         ) : (
            <ul className={'mt-4 flex flex-wrap justify-center gap-4'}>
               {useFestivals.map(festival => {
                  return (
                     /*<li key={festival.recordid}>{festival.recordid}</li>*/
                     <Card festival={festival} />
                  )
               })}
            </ul>
         )}
      </section>
   )
}

function SearchName() {
   const {
      festivals,
      festivalsByDpt,
      setFestivals,
      setFestivalsByDpt,
      setFestivalsByName,
      festivalsByName,
   } = useStore(state => state)
   const [userInput, setUserInput] = useState('')
   useEffect(() => {
      if (userInput.length > 2) {
         if (festivalsByDpt && festivalsByDpt.length > 0) {
            const updatedFestivalsByDpt = festivalsByDpt.filter(festival =>
               festival.fields.nom_du_festival.toLowerCase().includes(userInput.toLowerCase())
            )
            setFestivalsByDpt(updatedFestivalsByDpt)
         } else {
            getFestivalByName(userInput)
               .then(res => {
                  setFestivalsByDpt(null)
                  setFestivals(null)
                  setFestivalsByName(res)
                  console.log(res)
               })
               .catch(err => console.error(err))
         }
      } else {
         const sample = getSampleFestivals()
            .then(res => {
               setFestivals(res)
               setFestivalsByDpt(null)
               setFestivalsByName(null)
            })
            .catch(err => console.error(err))
      }
   }, [userInput])

   return (
      <div className="form-control relative w-full max-w-xs border">
         <label className="label">
            <span className="label-text">Comment s'appelle le festival</span>
         </label>
         <input
            type="text"
            autoComplete={'none'}
            placeholder="Type here"
            onChange={e => setUserInput(e.target.value)}
            className="input input-bordered w-full max-w-xs"
         />
         <label className="label">
            <span className="label-text-alt"> </span>
         </label>
      </div>
   )
}

function Card({festival}: {festival: Festival}) {
   return (
      <li className="card w-full border-base-300 bg-base-100 shadow-xl transition hover:scale-105 sm:w-128 md:w-96 ">
         <figure className="mx-2 mt-2 h-48 overflow-hidden rounded-xl">
            <div className="card-actions">
               {token !== null && (
                  <Link
                     to={`/update/${festival.recordid}`}
                     className="btn-danger btn">
                     Update
                  </Link>
               )}
            </div>
            <img
               className={'h-full w-full object-cover object-center'}
               src="/confet-sd.jpg"
               alt="Shoes"
            />
         </figure>
         <div className="card-body items-center text-center">
            <h2 className="card-title">{festival.fields.nom_du_festival}</h2>
            <p className={'h-min'}>
               {festival.fields.periode_principale_de_deroulement_du_festival}
            </p>
            <div className="card-actions">
               <Link
                  to={`/festival/${festival.recordid}`}
                  className="btn btn-primary">
                  Plus d'informations
               </Link>
            </div>
         </div>
      </li>
   )
}
