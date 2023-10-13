import React, { useEffect, useState } from 'react';
import { getOneFestival, updateFestival } from '../../services/api.service';
import { useParams } from 'react-router-dom';
import { Festival } from '../../stores/useStore.tsx';

export default function UpdatePage() {
    const { id } = useParams();
    const [festival, setFestival] = useState<Festival | null>(null);
    const [idmongo, setIdmongo] = useState<string | null>()
    const [site, setSite] = useState('');
    const [titre, setTitre] = useState('');
    const [decipline, setDecipline] = useState('');
    const [departement, setDepartement] = useState('');
    const [periode, setPeriode] = useState('');
    const token = JSON.parse(localStorage.getItem('token') || 'null');

    useEffect(() => {
        getOneFestival(id)
        .then((res) => {
            
            // Mettre à jour les champs du formulaire avec les données du festival
            if (res && res.fields) {
                setFestival(res);
                    setIdmongo(res._id)
                    setSite(res.fields.site_internet_du_festival || '');
                    setSite(res.fields.site_internet_du_festival || '');
                    setTitre(res.fields.nom_du_festival || '');
                    setDecipline(res.fields.discipline_dominante || '');
                    setDepartement(res.fields.departement_principal_de_deroulement || '');
                    setPeriode(res.fields.periode_principale_de_deroulement_du_festival || '');
                }
            })
            .catch((err) => console.error(err));
    }, [id]);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const festivalData = {
            fields: {
                site_internet_du_festival: site,
                nom_du_festival: titre,
                discipline_dominante: decipline,
                departement_principal_de_deroulement: departement,
                periode_principale_de_deroulement_du_festival: periode,
            },
        };

        await updateFestival(festivalData, token,idmongo)
            .then((data) => {
                if (data) {
                    console.log(data);
                    localStorage.setItem('token', JSON.stringify(data));
                }
            })
            .catch((err) => {
                alert('err'+ err);
            });
    }

    return (
        <div className="d-flex justify-content-center vh-100 align-items-center">
            <div className="p-5 couleur">
                <h1>Ajouter Festival</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="site">site du festival</label>
                        <input
                            type="text"
                            name="site"
                            value={site} // Utiliser la variable 'site' pour pré-remplir la valeur
                            className="form-control border border "
                            required
                            onChange={(e) => setSite(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="titre">nom du festival</label>
                        <input
                            type="text"
                            name="titre"
                            placeholder="enter titre du festival"
                            value={titre} // Utiliser la variable 'titre' pour pré-remplir la valeur
                            className="form-control border border"
                            required
                            onChange={(e) => setTitre(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="decipline">decipline du festival</label>
                        <input
                            type="text"
                            name="decipline"
                            
                            value={decipline} // Utiliser la variable 'decipline' pour pré-remplir la valeur
                            className="form-control border border"
                            required
                            onChange={(e) => setDecipline(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="decipline">departement du festival</label>
                        <input
                            type="text"
                            name="department"
                          
                            value={departement} // Utiliser la variable 'departement' pour pré-remplir la valeur
                            className="form-control border border"
                            required
                            onChange={(e) => setDepartement(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="decipline">periode du festival</label>
                        <input
                            type="text"
                            name="periode"
                           
                            value={periode} // Utiliser la variable 'periode' pour pré-remplir la valeur
                            className="form-control  border-border"
                            required
                            onChange={(e) => setPeriode(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-light mb-3">ajouter</button>
                </form>
            </div>
        </div>
    );
}
