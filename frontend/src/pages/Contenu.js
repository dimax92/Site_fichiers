import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import Navigation from "../components/Navigation";

const Contenu = () => {
    const[nomFichier, setNomFichier] = useState();
    const[nom, setNom] = useState();
    const[description, setDescription] = useState();

    let { id } = useParams();

    function recevoirDonnees(id){
        axios.get("https://pdfou.com/backend/public/api/fichiers/"+id)
        .then((result)=>{
            setNomFichier(result.data.nomfichier);
            setNom(result.data.nom);
            setDescription(result.data.description);
        })
        .catch((error)=>{})
    }

    useEffect(()=>{
        recevoirDonnees(id);
    },[]);
    
    return (
        <div className="divContenu">
            <Navigation/>
            <h1>{nom}</h1>
            <iframe src={"https://pdfou.com/backend/storage/app/fichiers/"+nomFichier} height="200" width="300"></iframe>
            <h2>Description</h2>
            <p>{description}</p>
            <button onClick={()=>{
                document.location.href="https://pdfou.com/backend/public/api/download/"+id;
            }}>Telecharger</button>
        </div>
    )
}

export default Contenu;