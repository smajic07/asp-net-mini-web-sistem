import React, { useState } from "react";
import Konstante from "../utilities/Konstante";

export default function FormaKreirajObjavu(props) {
  const pocetniFormData = Object.freeze({
    naslov: "",
    sadrzaj: "",
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

    const objavaZaKreirati = {
      objavaId: 0,
      naslov: formData.naslov,
      sadrzaj: formData.sadrzaj,
    };

    const url = Konstante.API_URL_KREIRAJ;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objavaZaKreirati),
    })
      .then((response) => response.json())
      .then((odgovorSaServera) => {
        console.log(odgovorSaServera);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });

    props.objavaKreirana(objavaZaKreirati);
  };

  return (
    <form className="w-100 px-5">
      <h1 className="mt-5">Kreiraj novu objavu</h1>

      <div className="mt-5">
        <label className="h3 form-label">Naslov</label>
        <input
          value={formData.naslov}
          placeholder="Dajte ime objavi"
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
          placeholder="Unesite sadržaj..."
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
        Kreiraj
      </button>
      <button
        onClick={() => props.objavaKreirana(null)}
        className="btn btn-danger btn-lg w-100 mt-3"
      >
        Otkaži
      </button>
    </form>
  );
}
