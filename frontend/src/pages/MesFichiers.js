import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import Navigation from "../components/Navigation";
import { useCookies } from 'react-cookie';

const MesFichiers = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const[data, setData] = useState([]);
    const[reponse,setReponse] = useState();

    function recevoirDonnees(){
        axios.get("https://pdfou.com/backend/public/api/profile", {
            headers: {
                'Authorization': "Bearer "+cookies.token
              }
        })
        .then((response)=>{
            axios.get("https://pdfou.com/backend/public/api/mesfichiers/"+response.data, {
                headers: {
                    'Authorization': "Bearer "+cookies.token
                  }
            })
            .then((result)=>{
                setData(result.data)
            })
            .catch((error)=>{})
        })
        .catch((error)=>{})
    }

    useEffect(()=>{
        recevoirDonnees();
    },[]);

    function creationDonneesSuppression(id){
        const data = new FormData();
        data.append('user_id', id);
        return data;
    }

    function suppressionDonnees(id){
        axios.get("https://pdfou.com/backend/public/api/profile", {
            headers: {
                'Authorization': "Bearer "+cookies.token
              }
        })
        .then((response)=>{
            axios.post("https://pdfou.com/backend/public/api/destroy/"+id, creationDonneesSuppression(response.data), {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': "Bearer "+cookies.token
                }
            })
            .then(function (result) {
                setReponse(<p className="messageValidation">Suppression fichier reussi</p>);
                document.location.href='https://pdfou.com/MesFichiers';
            })
            .catch(function (error) {
                setReponse(<p className="messageErreur">Echec suppression Fichier</p>);
            });
        })
    }
    
    return (
        <div className="divMesTutos">
            <Navigation/>
            {reponse}
            <div className="tutosMap">
            {data.map((resultat)=>{
                return(
                    <div className="tuto">
                        <p>{resultat.nom}</p>
                        <div className="supprimerModifier">
                        <a href={"Modification/"+resultat.id}>
                            <button>Modifier</button>
                        </a>
                        <button onClick={(e)=>{
                            e.preventDefault();
                            suppressionDonnees(resultat.id);
                        }}>Supprimer</button>
                        </div>
                    </div>
                )
            })}
            </div>
        </div>
    )
}

export default MesFichiers;