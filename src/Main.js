import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
    root: {
      minHeight: '100vh',
      background: 'green',
      width: '100%',
      overflowY: 'auto',
    },
    listContainer: {
      display: 'flex',
    },
  }));

export default function Ujian() {
  const [data, setData] = useState([])
  const [edit, setEdit] = useState(null)
  useEffect(()=>{
    getData()
  },[])
  //  untuk mengambil data
  const getData = () =>{
    axios.get('http://localhost:3001/trello')
    .then(hasil=>setData(hasil.data))
  }
  // untuk memasukkan data
  const handleSubmit = (e)=>{
    e.preventDefault() 
    const value = e.target.submit.value
    axios.post('http://localhost:3001/trello', {name: value})
    .then(()=>{
      getData()
      e.target.submit.value='aa'
    })
  }
  // untuk menghapus data
  const handleDelete = (id) =>{
    axios.delete(`http://localhost:3001/trello/${id}`)
    .then(()=>getData())
  }
  // untuk menyimpan data yang sudah diedit
  const handleEdit = (e) =>{
    e.preventDefault()
    axios.patch(`http://localhost:3001/trello/${data[edit].id}`, {name: e.target.save.value})
    .then(()=>{
      getData()
      setEdit(null)
    })
  }
  return (
      // submit data
      <div>
        <form onSubmit={handleSubmit}>
          <div>Aplikasi Trello</div>
          <hr></hr>
          <input name='submit'></input>
          <button>Tambah</button>
        </form>
        <div>
          {data.map((value, index)=>{
            return (
              edit === index?
              <form key={index} onSubmit={handleEdit}>
                <input name='save' defaultValue={value.name}/> <button>save</button>
              </form>
            : <div key={index}>{value.name} 
              <button onClick={ () => handleDelete(value.id)}> hapus</button> 
              <button onClick={ () => setEdit(index)}> edit</button>
            </div>)
          })}
        </div>
      </div>
      
  )
}
