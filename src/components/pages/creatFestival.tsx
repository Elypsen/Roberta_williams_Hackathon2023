 import React, { useState } from 'react'
// import axios from 'axios'
import {login} from '../../services/admin.service'
import { createFestival } from '../../services/api.service'
// import { useNavigate, NavLink } from 'react-router-dom'

export default function CreatPage() {
    
    const [site, setSite] = useState('')
    const [titre, setTitre] = useState('')
    const [decipline, setDecipline] = useState('')
    const [departement, setDepartement] = useState('')
    const [periode, setPeriode] = useState('')
    
    const festivalData={fields:{site_internet_du_festival:site, nom_du_festival:titre,discipline_dominante:decipline,departement_principal_de_deroulement:departement,periode_principale_de_deroulement_du_festival:periode}}
    const token = JSON.parse(localStorage.getItem('token') || 'null'); // Utilisation de null comme valeur par défaut si la clé 'token' est absente


    const handleSubmit = async(event :any) => {
        event.preventDefault();
       await createFestival(festivalData, token).then((data) => {
            if (data) {
               console.log(data)
               
            }
         }).catch(err => { alert("connexion échouée") })
        }
    
    return (
        <div className=' d-flex justify-content-center vh-100 align-items-center '>
            <div className='p-5 couleur '>
                
                <h1>Ajouter Festival</h1>
                <form onSubmit={handleSubmit}>
                {/* <form > */}
                    <div className='mb-3'>
                        <label htmlFor="site">site du festival</label>
                        <input type='text' name='site' placeholder="enter le site du festival" className='form-control' required onChange={e => setSite(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="titre">nom du festival</label>
                        <input type='text' name='titre' placeholder="enter titre du festival" className='form-control' required onChange={e => setTitre(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="decipline">decipline du festival</label>
                        <input type='text' name='decipline' placeholder="enter decipline du festival" className='form-control' required onChange={e => setDecipline(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="decipline">departement du festival</label>
                        <input type='text' name='department' placeholder="enter decipline du festival" className='form-control' required onChange={e => setDepartement(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="decipline">periode du festival</label>
                        <input type='text' name='periode' placeholder="enter periode du festival" className='form-control' required onChange={e => setPeriode(e.target.value)} />
                    </div>
                    
                    < button className='btn btn-light mb-3'> ajouter</button>
                </form>
                {/* <h6 className='' > Vous avez déjà un compte  &nbsp;
                    <NavLink className="text-white" to="/login" exact={true}>Cliquez ici</NavLink>
                </h6> */}
            </div>
        </div>
    )
}

