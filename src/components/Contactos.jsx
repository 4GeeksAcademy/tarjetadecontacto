
import React, { useEffect, useState } from "react";




function Contactos() {

  const [nombre, setNombre] = useState("")
  const [direccion, setDireccion] = useState("")
  const [telefono, setTelefono] = useState("")
  const [email, setEmail] = useState("")

  const [edit, setEdit] = useState(false)


  const [agenda, setAgenda] = useState([])
  useEffect(() => { getInfo() }, [])


  function editarContacto(id) {
    console.log(id);

    fetch(`https://playground.4geeks.com/contact/agendas/manusmmo/contacts/${id}`, {
      method: "PUT",

      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: nombre,
        phone: telefono,
        email: email,
        address: direccion
      })

    })
      .then((response) => {

        if (response.status === 200) {

          getInfo()
          setEdit(prev => !prev)

        }

        return response.json()

      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error))
  }

  function crearAgenda() {

    fetch("https://playground.4geeks.com/contact/agendas/manusmmo", { method: "POST" })
      .then((Response) => Response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error))

  }

  const getInfo = () => {
    fetch("https://playground.4geeks.com/contact/agendas/manusmmo/contacts", { method: "GET" })
      .then((res) => {
        if (res.status === 404) {
          return crearAgenda()
        } else {
          return res;
        }
      })
      .then((res) => res.json())
      .then((data) => setAgenda(data.contacts))
      .catch((error) => console.log(error));
  };

  function eliminarContacto(id) {

    fetch(`https://playground.4geeks.com/contact/agendas/manusmmo/contacts/${id}`, { method: "DELETE", })
      .then(() => getInfo())
      .catch((error) => console.log(error));
  };

  return (
    <>
      {agenda.map((item) => (
        <div className="card mb-3 m-auto" style={{ maxWidth: 540 }}>
          <div className="row g-0">

            <div className="col-md-4">
              <img
                src="https://tse1.mm.bing.net/th/id/OIP.mV1jXnbl-N9OGjpKzIVGzwHaHk?pid=Api"
                className="img-fluid rounded-start"
                alt="..."
              />
            </div>

            <div className="col-md-8">

              <div className="card-body d-flex justify-content-between align-items-start">

                <div className={`${edit === true ? "d-none" : "d-block"}`}>
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.address}</p>
                  <p className="card-text">{item.phone}</p>
                  <p className="card-text">
                    <small className="text-muted">{item.email}</small>
                  </p>
                </div>
                <div className={`${edit === true ? "d-block" : "d-none"}`}>
                  <input className="card-title" placeholder={item.name} onChange={(e) => setNombre(e.target.value)} value={nombre} />
                  <input className="card-title" placeholder={item.phone} onChange={(e) => setTelefono(e.target.value)} value={telefono} />
                  <input className="card-title" placeholder={item.address} onChange={(e) => setDireccion(e.target.value)} value={direccion} />
                  <p className="card-text">
                    <input className="card-title" placeholder={item.email} onChange={(e) => setEmail(e.target.value)} value={email} />
                  </p>
                  <button onClick={() => editarContacto(item.id)}>submit</button>
                </div>

                <div className="d-flex gap-2">
                  <button className="btn btn-primary" onClick={() => setEdit(prev => !prev)}>
                    <i className="fa-solid fa-pencil"></i>
                  </button>
                  <button className="btn btn-danger" onClick={() => eliminarContacto(item.id)}>
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>

              </div>

            </div>
          </div>
        </div>
      ))}
    </>
  );
}
export default Contactos;