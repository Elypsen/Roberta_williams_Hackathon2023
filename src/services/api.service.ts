import ky from 'ky'
import {TUNNEL} from '../TUNNEL'

const getErrorMessage = (error: unknown) => {
   if (error instanceof Error) return error.message
   return String(error)
}
const api = ky.create({
   prefixUrl: TUNNEL,
})

export const getAllFestivals = async () => {
   try {
      const festivals = await api.get('').json()
      console.log(festivals)
      return festivals
   } catch (err) {
      console.log(getErrorMessage(err))
   }
}
