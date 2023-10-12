import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {getOneFestival} from '../../services/api.service'
import {Festival} from '../../stores/localStore'

export default function FestivalPage() {
   let {id} = useParams()
   const [festival, setFestival] = useState<Festival | null>(null)
   useEffect(() => {
      getOneFestival(id).then(res => {
         setFestival(res)
      }).catch(err => console.error(err))
   }, [id])
   console.log(id)

   if (!festival)
      return (<p>Loading...</p>)


   return (
      <main className={'w-screen min-h-screen'}>
         <h1>Festival Page</h1>
         <p>ID {id}</p>

         <h2>{festival.fields.nom_du_festival}</h2>

      </main>
   )
}
