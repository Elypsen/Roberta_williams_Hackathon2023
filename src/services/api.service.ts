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
    try{
        const festivals:Festival[] = await local.post('dpt', {json:{value: dpt}}).json();
        return festivals;
    }catch(err){
        throw getErrorMessage(err);
    }
}

export const getOneFestival = async(recordid:string) => {
    try{
        const festival: Festival = await local.get(recordid).json();
        return festival
    }catch(err){
        throw getErrorMessage(err);
    }
}
