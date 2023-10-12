import InputSelection from './inputSelection'

export default function ResultSection() {
   return <section id={'results'} className={'w-full h-screen min-h-48'}>

      <div className={'w-full flex flex-wrap gap-2 items-center '}><InputSelection />
         <SearchName /></div>
      <h2>RESULTATS</h2>

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
