import InputSelection from '../organisms/inputSelection'
import {LocalStore} from '../../stores/localStore'
import {useEffect} from 'react'
import {TUNNEL} from '../../TUNNEL'

export default function ResultSection() {
   const store = LocalStore(state => state)
   console.log(store)

   useEffect(() => {
      fetch(TUNNEL).then(response => response.json()).then(data => {
         console.log(data)
         store.setFestivals(data)
      })
   }, [])
   return <section id={'results'} className={'w-full flex flex-col items-center h-screen min-h-48'}>

      <div className={'w-full flex flex-wrap gap-2 items-center '}>
         <InputSelection />
         <SearchName /></div>
      <h2>RESULTATS</h2>

      <ul>{store.festivals.map((festival) => {
         return (<li key={festival.recordid}>{festival.recordid}</li>)
      })}</ul>

   </section>
}


function SearchName() {
   return <div className='relative form-control w-full max-w-xs border'>
      <label className='label'>
         <span className='label-text'>What is your name?</span>
      </label>
      <input type='text' placeholder='Type here' className='input input-bordered w-full max-w-xs' />
      <label className='label'>
         <span className='label-text-alt'>Some message feedback to user...</span>
      </label>
   </div>
}
