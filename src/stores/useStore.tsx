import {useEffect, useState} from 'react'
import {create} from 'zustand'
import {Festival} from '../festival.types.ts'
import {getFestivalByDpt, getFestivalByName, getSampleFestivals} from '../services/api.service.ts'

type LocalStoreTypes = {
   // getters
   festivals: Festival[] | null
   festivalsByDpt: Festival[] | null
   festivalsByName: Festival[] | null

   // setters
   setFestivals: (festivals: Festival[] | null) => void
   setFestivalsByDpt: (festivals: Festival[] | null) => void
   setFestivalsByName: (festivals: Festival[] | null) => void
}
export const useStore = create<LocalStoreTypes>(set => ({
   festivals: null,
   festivalsByDpt: null,
   festivalsByName: null,

   setFestivals: festivals => set({festivals}),
   setFestivalsByDpt: festivals => set({festivalsByDpt: festivals}),
   setFestivalsByName: festivals => set({festivalsByName: festivals}),
}))

export type FestivalStore = {
   // Getters
   festivals: Festival[]
   searchByName: string | null
   searchByDpt: string | null
   filterByCategories: string[]

   // Setters
   setFestivals: (festivals: Festival[]) => void
   setSearchByName: (search: string) => void
   setSearchByDpt: (search: string) => void
   setFilterByCategories: (search: string[]) => void

   // Reset
   resetFestivals: () => void
   resetSearchByName: () => void
   resetSearchByDpt: () => void
   resetFilterByCategories: () => void
}

export const useFestivalStore = create<FestivalStore>(set => ({
   festivals: [],
   searchByName: null,
   searchByDpt: null,
   filterByCategories: [],

   setFestivals: festivals => set({festivals}),
   setSearchByName: search => set({searchByName: search}),
   setSearchByDpt: search => set({searchByDpt: search}),
   setFilterByCategories: search => set({filterByCategories: search}),

   // reset
   resetFestivals: () => set({festivals: []}),
   resetSearchByName: () => set({searchByName: null}),
   resetSearchByDpt: () => set({searchByDpt: null}),
   resetFilterByCategories: () => set({filterByCategories: []}),
}))

export type AdminStore = {
   // Getters
   isAdmin: boolean

   // Setters
   setIsAdmin: (isAdmin: boolean) => void
}

export const useAdminStore = create<AdminStore>(set => ({
   isAdmin: false,

   setIsAdmin: isAdmin => set({isAdmin}),
}))

type FestivalStrategy =
   | {
        query: 'searchByName'
        value: string
     }
   | {
        query: 'searchByDpt'
        value: string
     }
   | {
        query: 'filterCategory'
        value: string[]
     }
   | {
        query: 'getAll'
        value: null
     }

export const useFestivalStrategy = ({query, value}: FestivalStrategy) => {
   const [festivalStrategy, setFestivalStrategy] = useState<Festival[]>([])
   const store = useFestivalStore(state => state)

   useEffect(() => {
      if (query === 'searchByDpt') {
         // set department in store
         store.setSearchByDpt(value)
         // reset other user search and selection

         store.resetSearchByName()
         store.resetFilterByCategories()
         // query to httpService

         getFestivalByDpt(value)
            .then(result => {
               result && setFestivalStrategy(result)
            })
            .catch(err => console.error('DPT ERORR RESP', err))
      } else if (query === 'searchByName') {
         // set name in store
         store.setSearchByName(value)

         // reset categories
         store.resetFilterByCategories()

         if (store.searchByDpt) {
            // filter store
            const results = store.festivals.filter(festival => {
               festival.fields.nom_du_festival.toLowerCase().includes(value.toLowerCase())
            })
            setFestivalStrategy(results)
         } else {
            // query to httpService
            // reset other user search and selection
            getFestivalByName(value)
               .then(res => {
                  res && setFestivalStrategy(res)
               })
               .catch(err => console.error(err))
            store.resetSearchByDpt()
         }
      } else if (query === 'filterCategory') {
         store.setFilterByCategories(value)
         const results = store.festivals.filter(festival => {
            value.some(cat => cat === festival.fields.discipline_dominante)
         })
         setFestivalStrategy(results)
      } else if (query === 'getAll') {
         getSampleFestivals()
            .then(data => {
               if (data) {
                  store.setFestivals(data)
               }
            })
            .catch(error => console.error(error))
      }
   }, [query, value])

   return festivalStrategy
}
