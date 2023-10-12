 import React, { useState } from 'react'
// import axios from 'axios'
import {login} from '../../services/admin.service'
// import { useNavigate, NavLink } from 'react-router-dom'

export default function LoginPage() {
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = async(event :any) => {
        event.preventDefault();
       await login({ username, password }).then((data) => {
            if (data) {
               console.log(data)
               localStorage.setItem('token', JSON.stringify(data));
            }
         }).catch(err => { alert("connexion échouée") })
        }
    
    return (
        <div className=' d-flex justify-content-center vh-100 align-items-center '>
            <div className='p-5 couleur '>
                
                <h1>Connexion</h1>
                <form onSubmit={handleSubmit}>
                {/* <form > */}
                    <div className='mb-3'>
                        <label htmlFor="username">nom</label>
                        <input type='text' name='username' placeholder="enter le nom d'utilisateur" className='form-control' required onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="pwd">mot de passe</label>
                        <input type='password' name='password' placeholder='enter le mot de passe' className='form-control' required onChange={e => setPassword(e.target.value)} />
                    </div>
                    < button className='btn btn-light mb-3'> connexion</button>
                </form>
                {/* <h6 className='' > Vous avez déjà un compte  &nbsp;
                    <NavLink className="text-white" to="/login" exact={true}>Cliquez ici</NavLink>
                </h6> */}
            </div>
        </div>
    )
}

