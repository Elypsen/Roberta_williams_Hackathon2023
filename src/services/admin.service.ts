import ky from 'ky';


const getErrorMessage = (error: unknown) => {
    if (error instanceof Error) return error.message;
    return String(error);
  };

const local = ky.create({
    prefixUrl:"http://localhost:8000/admin"
})


export const login = ({username, password}:{username: string, password: string}) =>{
   try{
    const token = local.post('login',{json:{username: username, password: password}}).json();
   return token;
   }catch(err){
    throw getErrorMessage(err);
   }
}