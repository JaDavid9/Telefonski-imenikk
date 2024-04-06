import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'


function Read () {
    const [data,setData] = useState([])
    const {id} = useParams();
    useEffect(() => {
        
        axios.get('http://localhost:8080/users/' + id )
            .then(res => {setData(res.data); console.log(res.data)} )  
            .catch(err => {
                console.error(err);
               
            });
    }, []);
    return (
      <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
         <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
            <h3> Detalji kontakta</h3>
            <div className='mb-2'>
                <strong> Ime: {data.ime} </strong>
            </div>
            <div className='mb-2'>
                <strong> Prezime: {data.prezime} </strong>
            </div>
            <div className='mb-2'>
                <strong> Broj Telefona: {data.brojT} </strong>
            </div>
            <div className='mb-2'>
                <strong> Email: {data.email} </strong>
            </div>
            <Link to ={`/update/${id}`} className='btn btn-success'> Uredi</Link>
            <Link to="/" className='btn btn-primary ms-3'>Nazad</Link>
         </div>
      </div>
    );
}



export default Read;
