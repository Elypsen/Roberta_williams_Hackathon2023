import SelectDepartement from '../organisms/selectDepartement'
import {Festival, LocalStore} from '../../stores/localStore'
import {useEffect, useState} from 'react'
import {getAllFestivals} from '../../services/api.service'

export default function ResultSection() {
   const store = LocalStore(state => state)
   // console.log(store)
   const [errorMessage, setErrorMessage] = useState<null | string>(null)
   useEffect(() => {
      getAllFestivals().then((data) => {
         if (data) {
            store.setFestivals(data)
         }
      }).catch(error => setErrorMessage(error.message))
   }, [])

   return <section id={'results'} className={'w-full flex flex-col items-center min-h-screen min-h-48'}>

      <div className={'w-full bg-base-200 justify-center flex flex-wrap gap-2 items-center '}>
         <SelectDepartement />
         <SearchName />
      </div>
      <h2
         className={'my-8 uppercase tetx-xl font-bold'}>{store.festivals.length > 0 ? store.festivals.length > 1 ? `RESULTATS : ${store.festivals.length}` : 'RESULTAT : ' : 'Pas de résultats trouvés'}</h2>
      {
         errorMessage ? <p>{errorMessage}</p> :
            <ul className={'flex flex-wrap gap-4 mt-4 justify-center'}>{store.festivals.map((festival) => {
               return (/*<li key={festival.recordid}>{festival.recordid}</li>*/
                  <Card festival={festival} />)
            })}</ul>
      }

   </section>
}


function SearchName() {
   return <div className='relative form-control w-full max-w-xs border'>
      <label className='label'>
         <span className='label-text'>Comment s'appelle le festival</span>
      </label>
      <input type='text' autoComplete={'none'} placeholder='Type here'
             className='input input-bordered w-full max-w-xs' />
      <label className='label'>
         <span className='label-text-alt'>{' '}</span>
      </label>
   </div>
}

function Card({festival}: {festival: Festival}) {
   return <li
      className='card w-full sm:w-128 md:w-96 bg-base-100 shadow-xl border-base-300 hover:scale-105 transition '>
      <figure className='mx-2 mt-2 h-48 overflow-hidden rounded-xl'>
         <img className={'object-cover w-full h-full object-center'} src='/confet-sd.jpg' alt='Shoes' />
      </figure>
      <div className='card-body items-center text-center'>
         <h2 className='card-title'>{festival.fields.nom_du_festival}</h2>
         <p className={'h-min'}>{festival.fields.periode_principale_de_deroulement_du_festival}</p>
         <div className='card-actions'>
            <button className='btn btn-primary'>Plus d'informations</button>
         </div>
      </div>
   </li>
}
