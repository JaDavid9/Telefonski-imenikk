import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';



function Update() {
  const { id } = useParams();
  const [values, setValues] = useState({
    ime: '',
    prezime: '',
    brojT: '',
    email: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8080/users/${id}`)
        .then(res => {
          const userData = res.data;
          setValues(userData); // Pretpostavljamo da res.data ima strukturu koja odgovara values
          console.log(userData);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [id]);

  function handleUpdate(event) {
    event.preventDefault();
    axios.put(`http://localhost:8080/users/${id}`, values)
      .then(res => {
        console.log(res);
        navigate('/');
      })
      .catch(err => {
        console.log(err);
      });
  }
  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
    <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
      <h1> Uredi Kontakt </h1>
      <form onSubmit={handleUpdate}>
        <div className='mb-2'>
          <label htmlFor='ime'> Ime: </label>
          <input type='text' name='ime' className='form-control' placeholder='Upisi ime'
           value={values.ime} onChange={e => setValues({...values, ime: e.target.value})}/>

        </div>
        <div className='mb-3'>
          <label htmlFor='prezime'> Prezime: </label>
          <input type='text' name='prezime' className='form-control' placeholder='Upisi prezime'
           value={values.prezime} onChange={e => setValues({...values, prezime: e.target.value})}/>

        </div>
        <div className='mb-4'>
          <label htmlFor='brojT'> Broj telefona: </label>
          <input type='text' name='brojT' className='form-control' placeholder='Upisi broj telefona'
          value={values.brojT} onChange={e => setValues({...values, brojT: e.target.value})}></input>

        </div>
        <div className='mb-5'>
  <label htmlFor='email'> Email: </label>
  <input
    type='email'
    id='email'
    name='email'
    className='form-control'
    placeholder='Unesite email'
    value={values.email}
    onChange={e => setValues({...values, email: e.target.value})}
  />
</div>
        <button className='btn btn-success'> Promeni</button>
        <Link to="/" className='btn btn-primary ms-3' > Nazad</Link>
      </form>
    </div>
     
  </div>
  );
}

export default Update;