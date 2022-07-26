import React, { useState } from "react";
import Konstante from "../utilities/Konstante";

export default function FormaAzurirajObjavu(props) {
  const pocetniFormData = Object.freeze({
    naslov: props.objava.naslov,
    sadrzaj: props.objava.sadrzaj,
  });

  const [formData, setFormData] = useState(pocetniFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const objavaZaAzurirati = {
      objavaId: props.objava.objavaId,
      naslov: formData.naslov,
      sadrzaj: formData.sadrzaj,
    };

    const url = Konstante.API_URL_AZURIRAJ;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objavaZaAzurirati),
    })
      .then((response) => response.json())
      .then((odgovorSaServera) => {
        console.log(odgovorSaServera);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });

    props.objavaAzurirana(objavaZaAzurirati);
  };

  return (
    <form className="w-100 px-5">
      <h1 className="mt-5">
        Ažurirate objavu naslovljenu sa "{props.objava.naslov}".
      </h1>

      <div className="mt-5">
        <label className="h3 form-label">Naslov</label>
        <input
          value={formData.naslov}
          name="naslov"
          type="text"
          className="form-control"
          onChange={handleChange}
        />
      </div>

      <div className="mt-4">
        <label className="h3 form-label">Sadržaj</label>
        <input
          value={formData.sadrzaj}
          name="sadrzaj"
          type="text"
          className="form-control"
          onChange={handleChange}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="btn btn-success btn-lg w-100 mt-5"
      >
        Ažuriraj
      </button>
      <button
        onClick={() => props.objavaAzurirana(null)}
        className="btn btn-danger btn-lg w-100 mt-3"
      >
        Otkaži
      </button>
    </form>
  );
}
