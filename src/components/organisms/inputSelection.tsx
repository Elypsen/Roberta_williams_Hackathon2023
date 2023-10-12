import {Fragment, useMemo, useState} from 'react'
import {Combobox, Transition} from '@headlessui/react'
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/react/20/solid'
import {Departement, departements} from '../../collections/departements'
import removeAccents from '../../helpers/removeAccents'


export type ValidDepartement = Pick<Departement, 'nomDepartement' | 'codeDepartement'> & {displayValue: string}
const validDepartements: ValidDepartement[] = [{
   nomDepartement: 'Tous les départements',
   codeDepartement: '00',
   displayValue: '',
}, ...departements.map((dep) => {
   return {
      nomDepartement: dep.nomDepartement,
      codeDepartement: dep.codeDepartement,
      displayValue: `${dep.codeDepartement} - ${dep.nomDepartement}`,
   }
}) satisfies ValidDepartement[]]
export default function InputSelection() {
   const [selected, setSelected] = useState<ValidDepartement>(validDepartements[0])
   const [query, setQuery] = useState('')

   const search = useMemo(() => {
      const filteredDepartements =
         query === ''
            ? validDepartements
            : validDepartements.filter((dep) =>
               removeAccents(dep.displayValue)
                  .toLowerCase()
                  .replace(/\s+/g, '')
                  .includes(query.toLowerCase().replace(/\s+/g, '')) && dep,
            )
      // console.log(filteredDepartements)
      return filteredDepartements

   }, [query])


   return (
      <div className={'w-full max-w-[250px] z-50 '}>
         <Combobox value={selected} onChange={setSelected}>
            <div className='relative form-control'>
               <label className='label'>
                  <span className='label-text'>What is your name?</span>
               </label>
               <div
                  className='relative w-full cursor-default overflow-hidden rounded-lg bg- text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
                  <Combobox.Input
                     className='w-full input border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0'
                     displayValue={(dep: ValidDepartement) => dep.codeDepartement === '00' ? '' : dep.displayValue}
                     onChange={(event) => setQuery(removeAccents(event.target.value.toLowerCase().replace(' ', '-')))}
                     placeholder='Rechercher un département'
                  />
                  <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
                     <ChevronUpDownIcon
                        className='h-5 w-5 text-gray-400'
                        aria-hidden='true'
                     />
                  </Combobox.Button>
               </div>
               <label className='label'>
                  <span className='label-text-alt'>{' '}</span>
               </label>
               <Transition
                  as={Fragment}
                  leave='transition ease-in duration-100'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                  afterLeave={() => setQuery('')}
               >
                  <Combobox.Options
                     className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                     {!search || search.length === 0 && query !== '' ? (
                        <div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
                           Nothing found.
                        </div>
                     ) : (
                        search.map((dep) => (
                           <Combobox.Option
                              key={dep.codeDepartement}
                              className={({active}) =>
                                 `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                 }`
                              }
                              value={dep}
                           >
                              {({selected, active}) => (
                                 <>
                        <span
                           className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                           }`}
                        >
                          {dep.displayValue === '' ? 'Tous les départements' : dep.displayValue}
                        </span>
                                    {selected ? (
                                       <span
                                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                             active ? 'text-white' : 'text-teal-600'
                                          }`}
                                       >
                            <CheckIcon className='h-5 w-5' aria-hidden='true' />
                          </span>
                                    ) : null}
                                 </>
                              )}
                           </Combobox.Option>
                        ))
                     )}
                  </Combobox.Options>
               </Transition>
            </div>
         </Combobox>
      </div>
   )
}
