import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button, Form } from 'react-bootstrap';

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
  useEffect(() => {
    getData()
  }, [])
  //  untuk mengambil data
  const getData = () => {
    axios.get('http://localhost:3001/trello')
      .then(hasil => setData(hasil.data))
  }
  // untuk memasukkan data
  const handleSubmit = (e) => {
    e.preventDefault()
    const value = e.target.submit.value
    axios.post('http://localhost:3001/trello', { name: value })
      .then(() => {
        getData()
        e.target.submit.value = ''
      })
  }
  // untuk menghapus data
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/trello/${id}`)
      .then(() => getData())
  }

  // untuk menyimpan data yang sudah diedit
  const handleEdit = (e) => {
    e.preventDefault()
    axios.patch(`http://localhost:3001/trello/${data[edit].id}`, { name: e.target.save.value })
      .then(() => {
        getData()
        setEdit(null)
      })
  }

  const cobaKartu = () => {
    return (<div>
      <form onSubmit={handleSubmit}>
        <div>Tambahkan Note</div>
        <input name='submit'></input>
        <button>Tambah</button>
      </form>
      <div>
        {data.map((value, index) => {
          return (
            edit === index ?
              <form key={index} onSubmit={handleEdit}>
                <input name='save' defaultValue={value.name} /> <button>save</button>
              </form>
              : <div key={index}>{value.name} <button onClick={() => handleDelete(value.id)}> hapus</button> <button onClick={() => setEdit(index)}> edit</button>
              </div>)
        })}
      </div>
    </div>)
  }


  return (
    // submit data
    <div>
      Aplikasi Trello
      <form>
        <button onClick={cobaKartu}>Tambah Kartu</button>
      </form>
      <hr></hr>
      {cobaKartu()}

      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Note</Modal.Title>
        </Modal.Header>

        <Modal.Body>

        <form onSubmit={handleSubmit}>
          <div>
            <Form.Label htmlFor="note">Tambahkan Note</Form.Label>
            <Form.Control type="text" id="note" name="submit" />
            <div>
              {data.map((value, index) => {
                return (
                  edit === index ?
                    <form key={index} onSubmit={handleEdit}>
                      <input name='save' defaultValue={value.name} /> <button>save</button>
                    </form>
                    : <div key={index}>{value.name} <span onClick={() => handleDelete(value.id)}>[hapus]</span> <span onClick={() => setEdit(index)}> [edit]</span>
                    </div>)
              })}
            </div>
          </div>
          </form>

        </Modal.Body>
      </Modal.Dialog>

      {/* <form onSubmit={handleSubmit}>
        <div>Aplikasi Trello</div>
        <input name='submit'></input>
        <button>Tambah</button>
      </form>
      <div>
        {data.map((value, index) => {
          return (
            edit === index ?
              <form key={index} onSubmit={handleEdit}>
                <input name='save' defaultValue={value.name} /> <button>save</button>
              </form>
              : <div key={index}>{value.name}
                <button onClick={() => handleDelete(value.id)}> hapus</button>
                <button onClick={() => setEdit(index)}> edit</button>
              </div>)
        })}
      </div> */}
    </div >

  )
}
