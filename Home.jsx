import React, { useEffect, useState, } from 'react';
import axios from 'axios';
import { Link, useNavigate  } from 'react-router-dom';


function Home() {
    const [data,setData] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');
    const navigate = useNavigate();
    useEffect(() => {
        
        axios.get('http://localhost:8080/users')
            .then(res => {setData(res.data); console.log(res.data)} )  
            .catch(err => {
                console.error(err);
               
            });
    }, []);
    const handleDelete = (id) =>{
        const confirm = window.confirm("Da li zelite da izbrisete korisnika?")
        if(confirm){
            axios.delete('http://localhost:8080/users/'+ id) 
            .then(res => {
                navigate('/');

            }).catch(err => console.log(err));
        }

    }
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredData = data.filter(contact => {
        const fullName = `${contact.ime} ${contact.prezime}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
    });

    const sortedData = filteredData.slice().sort((a, b) => {
        const nameA = a.ime.toLowerCase();
        const nameB = b.ime.toLowerCase();
        if (sortDirection === 'asc') {
            return nameA.localeCompare(nameB);
        } else {
            return nameB.localeCompare(nameA);
        }
    });
    
    const toggleSortDirection = () => {
        const newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        setSortDirection(newSortDirection);
    };


    return (
        <div className='d-flex flex-column justify-content-center align-items-center bg-light vh-100'>
            <h1>Imenik</h1>
            <div className='w-75 rounded bg-white border shadow p-4'>
                <div className='d-flex justify-content-end'>
                <Link to= '/create' className='btn btn-success'>Dodaj Kontakt </Link>
                
                </div>
                <div>
                        <input
                            type='text'
                            placeholder='Pretraži po imenu ili prezimenu'
                            value={searchTerm}
                            onChange={handleSearch}
                            className='form-control mr-2'
                        />
                        <button onClick={toggleSortDirection} className='btn btn-secondary'>
                            {sortDirection === 'asc' ? 'Sortiraj ↓' : 'Sortiraj ↑'}
                        </button>
                    </div>
            <table className='table table-striped'>
            <thead className='thead-dark'>
                        <tr>
                            
                            <th>Ime</th>
                            <th>Prezime</th>
                            <th>Broj-Telefona</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
          {
            sortedData.map((d,i) => (
              <tr key = {i}>
           
              <th>{d.ime}</th>
              <th>{d.prezime}</th>
              <th>{d.brojT}</th>
              <th>{d.email}</th>
              <th>
              <Link to={`/read/${d.id}`}className="btn btn-primary mr-2">Detalji</Link>
                <button onClick={e=>handleDelete(d.id)} className="btn btn-danger">Obriši</button>
              </th>
              </tr>
            )) }

        </tbody>
                </table>
            </div>
        </div>
    );

    
}

export default Home;
