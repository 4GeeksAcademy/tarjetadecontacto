import React, { useState } from "react";

function Formulario() {

  const [nombre, setNombre] = useState("")
  const [direccion, setDireccion] = useState("")
  const [telefono, setTelefono] = useState("")
  const [email, setEmail] = useState("")

  function crearContacto() {

    fetch("https://playground.4geeks.com/contact/agendas/manusmmo/contacts", {
      method: "POST",

      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: nombre,
        phone: telefono,
        email: email,
        address: direccion
      })

    })

      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error))

  }


  return (<form>
    <div className="mb-3 w-50 m-auto">
      <div className="mb-3 w-50 m-auto"><h1>Añadir nuevo Contacto</h1></div>

      <label className="form-label">Full Name</label>
      <input type="text" className="form-control" aria-describedby="emailHelp" onChange={(e) => setNombre(e.target.value)} value={nombre} />
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>

      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Email</label>
        <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} value={email} />
      </div>

      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Phone</label>
        <input type="number" className="form-control" onChange={(e) => setTelefono(e.target.value)} value={telefono} />
      </div>

      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Adrres</label>
        <input type="text" className="form-control" onChange={(e) => setDireccion(e.target.value)} value={direccion} />
      </div>
      <button className="btn btn-primary" onClick={crearContacto}>Submit</button>
    </div>
  </form>)

}
export default Formulario;