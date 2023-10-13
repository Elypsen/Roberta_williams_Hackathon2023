import {Combobox, Transition} from '@headlessui/react'
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/react/20/solid'
import {Fragment, useMemo, useState} from 'react'
import {Departement, departements} from '../../collections/departements'
import removeAccents from '../../helpers/removeAccents'
import {useFestivalStore} from '../../stores/useStore.tsx'

export type ValidDepartement = Pick<Departement, 'nomDepartement' | 'codeDepartement'> & {
   displayValue: string
}

const tousLesDpt: ValidDepartement = {
   nomDepartement: 'Tous les départements',
   codeDepartement: '00',
   displayValue: '',
}

const validDepartements: ValidDepartement[] = [
   tousLesDpt,
   ...(departements.map(dep => {
      return {
         nomDepartement: dep.nomDepartement,
         codeDepartement: dep.codeDepartement,
         displayValue: `${dep.codeDepartement} - ${dep.nomDepartement}`,
      }
   }) satisfies ValidDepartement[]),
]

export default function SelectDepartement() {
   // local selection in widget
   const [selectedDepartment, setSelectedDepartment] = useState(validDepartements[0])

   // autocompletion search in widget
   const [query, setQuery] = useState('')

   // update results in modal
   const autoCompleteSearch = useMemo(() => {
      const filteredDepartments =
         query === ''
            ? validDepartements
            : validDepartements.filter(
                 dep =>
                    removeAccents(dep.displayValue)
                       .toLowerCase()
                       .replace(/\s+/g, '')
                       .includes(query.toLowerCase().replace(/\s+/g, '')) && dep
              )
      // console.log(filteredDepartments)
      return filteredDepartments
   }, [query])

   const {searchByDpt, setSearchByDpt} = useFestivalStore(state => state)

   // useEffect(() => {
   //    if (selectedDepartment.codeDepartement === '00') {
   //       useFestivalStrategy({query: 'getAll', value: null})
   //    } else {
   //       useFestivalStrategy({query: 'searchByDpt', value: selectedDepartment.nomDepartement})
   //    }
   // }, [selectedDepartment])

   function updateQuery(event) {
      setQuery(removeAccents(event.target.value.toLowerCase().replace(' ', '-')))
   }

   return (
      <div className={'z-50 w-full max-w-lg flex-1 '}>
         <Combobox
            value={searchByDpt}
            onChange={setSelectedDepartment}>
            <div className="form-control relative w-full">
               <label className="label">
                  <span className="label-text">Sélectionner un d&eacute;partement</span>
               </label>
               <div className="relative w-full cursor-default overflow-hidden rounded-lg text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                  <Combobox.Input
                     className="input w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                     displayValue={(dep: ValidDepartement) =>
                        dep?.codeDepartement === '00' ? '' : dep?.displayValue
                     }
                     onChange={updateQuery}
                     placeholder={'Tous les départements'}
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                     <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                     />
                  </Combobox.Button>
               </div>
               <label className="label">
                  <span className="label-text-alt"> </span>
               </label>
               <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  afterLeave={() => setQuery('')}>
                  <Combobox.Options className="absolute mt-1 mt-20 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                     {!autoCompleteSearch || (autoCompleteSearch.length === 0 && query !== '') ? (
                        <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                           Nothing found.
                        </div>
                     ) : (
                        validDepartements.map((dep, index) => (
                           <Combobox.Option
                              key={index}
                              className={({active}) =>
                                 `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                 }`
                              }
                              value={dep}>
                              {({selected, active}) => (
                                 <>
                                    <span
                                       className={`block truncate ${
                                          selected ? 'font-medium' : 'font-normal'
                                       }`}>
                                       {dep.displayValue === ''
                                          ? 'Tous les départements'
                                          : dep.displayValue}
                                    </span>
                                    {selected ? (
                                       <span
                                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                             active ? 'text-white' : 'text-teal-600'
                                          }`}>
                                          <CheckIcon
                                             className="h-5 w-5"
                                             aria-hidden="true"
                                          />
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
