import React, { useEffect, useState } from "react";
import axios from "axios";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/data")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération :", error);
        setErreur("Impossible de récupérer les données");
      });
  }, []);

  return (
    <div>
      <h2>Données importées</h2>
      {erreur && <p style={{ color: "red" }}>{erreur}</p>}
      <table border="1">
        <thead>
          {data.length > 0 && (
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          )}
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {Object.values(row).map((val, j) => (
                <td key={j}>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
