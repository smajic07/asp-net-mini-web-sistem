import React, { useState } from "react";
import Konstante from "./utilities/Konstante";
import FormaKreirajObjavu from "./components/FormaKreirajObjavu";
import FormaAzurirajObjavu from "./components/FormaAzurirajObjavu";

export default function App() {
  const [objave, setObjave] = useState([]);
  const [prikazujemFormuKreirajObjavu, setPrikazujemFormuKreirajObjavu] =
    useState(false);
  const [objavaKojaSeTrenutnoAzurira, setObjavaKojaSeTrenutnoAzurira] =
    useState(null);

  function dobaviObjave() {
    const url = Konstante.API_URL_OBJAVE;

    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((objaveSaServera) => {
        setObjave(objaveSaServera);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  function obrisiObjavu(objavaId) {
    const url = `${Konstante.API_URL_OBRISI}/${objavaId}`;

    fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((odgovorSaServera) => {
        console.log(odgovorSaServera);
        obrisanaObjava(objavaId);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  return (
    <div className="container">
      <div className="row min-vh-100">
        <div className="col d-flex flex-column justify-content-center align-items-center">
          {prikazujemFormuKreirajObjavu === false &&
            objavaKojaSeTrenutnoAzurira === null && (
              <div>
                <h1 className="mt-3">Mini Dinamčki Web Sistem</h1>

                <div className="mt-5">
                  <button
                    onClick={dobaviObjave}
                    className="btn btn-primary btn-lg w-100"
                  >
                    Dobavi objave sa servera
                  </button>
                  <button
                    onClick={() => setPrikazujemFormuKreirajObjavu(true)}
                    className="btn btn-dark btn-lg w-100 mt-4"
                  >
                    Kreiraj novu objavu
                  </button>
                </div>
              </div>
            )}

          {objave.length > 0 &&
            prikazujemFormuKreirajObjavu === false &&
            objavaKojaSeTrenutnoAzurira === null &&
            renderujTabeluObjava()}

          {prikazujemFormuKreirajObjavu && (
            <FormaKreirajObjavu objavaKreirana={objavaKreirana} />
          )}

          {objavaKojaSeTrenutnoAzurira !== null && (
            <FormaAzurirajObjavu
              objava={objavaKojaSeTrenutnoAzurira}
              objavaAzurirana={objavaAzurirana}
            />
          )}
        </div>
      </div>
    </div>
  );

  function renderujTabeluObjava() {
    return (
      <div className="table-responsive mt-5">
        <table className="table table-bordered table-dark">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Naslov</th>
              <th scope="col">Sadržaj</th>
              <th scope="col">CRUD Operacije</th>
            </tr>
          </thead>
          <tbody>
            {objave.map((objava) => (
              <tr key={objava.objavaId}>
                <th scope="row">{objava.objavaId}</th>
                <td>{objava.naslov}</td>
                <td>{objava.sadrzaj}</td>
                <td style={{ textAlign: "center" }}>
                  <button
                    onClick={() => setObjavaKojaSeTrenutnoAzurira(objava)}
                    className="btn btn-success btn-lg mx-3 my-3"
                  >
                    Ažuriraj
                  </button>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          `Jeste li sigurni da želite obrisati objavu naslovljenu sa "${objava.naslov}"?`
                        )
                      )
                        obrisiObjavu(objava.objavaId);
                    }}
                    className="btn btn-danger btn-lg"
                  >
                    Obriši
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ textAlign: "center" }} className="mb-3">
          <button
            style={{ float: "center" }}
            onClick={() => setObjave([])}
            className="btn btn-warning btn-lg w-50"
          >
            OČISTI TABELU
          </button>
        </div>
      </div>
    );
  }

  function objavaKreirana(kreiranaObjava) {
    setPrikazujemFormuKreirajObjavu(false);

    if (kreiranaObjava === null) {
      return;
    }

    alert(
      `Objava uspješno kreirana. Nakon što kliknete OK, objava naslovljena sa "${kreiranaObjava.naslov}" će se pojaviti u tabeli.`
    );

    dobaviObjave();
  }

  function objavaAzurirana(azuriranaObjava) {
    setObjavaKojaSeTrenutnoAzurira(null);

    if (azuriranaObjava === null) {
      return;
    }

    let kopijaObjava = [...objave];

    const index = kopijaObjava.findIndex((objavaIzKopijeObjava) => {
      if (objavaIzKopijeObjava.objavaId === azuriranaObjava.objavaId) {
        return true;
      }
    });

    if (index !== -1) {
      kopijaObjava[index] = azuriranaObjava;
    }

    setObjave(kopijaObjava);

    alert(
      `Objava uspješno ažurirana. Nakon što kliknete OK, objava naslovljena sa "${azuriranaObjava.naslov}" će biti ažurirana u tabeli.`
    );
  }

  function obrisanaObjava(objavaIdObrisaneObjave) {
    let kopijaObjava = [...objave];

    const index = kopijaObjava.findIndex((objavaIzKopijeObjava) => {
      if (objavaIzKopijeObjava.objavaId === objavaIdObrisaneObjave) {
        return true;
      }
    });

    if (index !== -1) {
      kopijaObjava.splice(index, 1);
    }

    setObjave(kopijaObjava);

    alert(
      "Objava uspješno obrisana. Nakon što kliknete OK, objava će nestati iz tabele."
    );
  }
}
