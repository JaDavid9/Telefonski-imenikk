import React, { useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import axios from 'axios';

function Create() {
  const [values, setValues] = useState ({
    ime: ' ',
    prezime: '',
    brojT: '',
    email: ''
  })
  const navigate =useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8080/users', values)
    .then(res => {
      console.log(res);
    } )  
    .catch(err => {
        console.error(err);
        navigate('/')
       

    });
  }
  return (
  <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
    <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
      <h1> Dodaj Kontakt</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-2'>
          <label htmlFor='ime'> Ime: </label>
          <input type='text' name='ime' className='form-control' placeholder='Upisi ime'
          onChange={e => setValues({...values, ime: e.target.value})}></input>

        </div>
        <div className='mb-3'>
          <label htmlFor='prezime'> Prezime: </label>
          <input type='text' name='prezime' className='form-control' placeholder='Upisi prezime'
          onChange={e => setValues({...values, prezime: e.target.value})}></input>

        </div>
        <div className='mb-4'>
          <label htmlFor='brojT'> Broj telefona: </label>
          <input type='text' name='brojT' className='form-control' placeholder='Upisi broj telefona'
          onChange={e => setValues({...values, brojT: e.target.value})}></input>

        </div>
        <div className='mb-5'>
          <label htmlFor='email'> Email: </label>
          <input type='email' name='email' className='form-control' placeholder='Upisi email'
          onChange={e => setValues({...values, email: e.target.value})}></input>

        </div>
        <button className='btn btn-success'> Kreiraj Kontakt</button>
        <Link to="/" className='btn btn-primary ms-3' > Nazad</Link>
      </form>
    </div>
     
  </div>
  )
}

export default Create;