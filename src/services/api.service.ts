import ky from 'ky';

import { Festival } from '../stores/localStore';

const getErrorMessage = (error: unknown) => {
    if (error instanceof Error) return error.message;
    return String(error);
  };

const local = ky.create({
    prefixUrl:"http://localhost:8000/"
})

export const getAllFestivals = async() => {
    try{
        const festivals:Festival[] = await local.get('').json();
        return festivals;
    }catch(err){
        throw getErrorMessage(err);
    }
}

export const getFestivalByDpt = async(dpt:string) => {
    const NUMBER_OF_RESULTS = 50;
    try{
        const festivals:Festival[] = await local.post('dpt', {json:{dpt: dpt}}).json();
        const sliced = festivals.slice(0, NUMBER_OF_RESULTS);
        // Return all data and splice in UI => pagination
        console.log(sliced.length, festivals.length)
        return festivals.slice(0, NUMBER_OF_RESULTS);
    }catch(err){
        throw getErrorMessage(err);
    }
}

export const getOneFestival = async(recordid:string) => {
    try{
        const festival: Festival[] = await local.get(recordid).json();
        console.log('FROM SERVICE', festival)
        return festival[0]
    }catch(err){
        throw getErrorMessage(err);
    }
}
