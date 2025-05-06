import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import axios from "axios";
import html2pdf from "html2pdf.js";

// Importation du bouton Material-UI
import Button from '@mui/material/Button';

// Enregistrer les composants de chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DataChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Appel API pour récupérer les données météo
    axios.get("http://localhost:8000/data")
      .then(response => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données météo", error);
      });
  }, []);

  // Préparer les données pour le graphique
  const chartData = {
    labels: data.map((entry) => `Jour ${entry.Temp9am}`), // Utiliser les jours ou l'heure comme étiquette
    datasets: [
      {
        label: "Température à 9am",
        data: data.map((entry) => entry.Temp9am),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
      },
      {
        label: "Température à 3pm",
        data: data.map((entry) => entry.Temp3pm),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false,
      },
      {
        label: "Humidité à 9am",
        data: data.map((entry) => entry.Humidity9am),
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: false,
      },
      {
        label: "Humidité à 3pm",
        data: data.map((entry) => entry.Humidity3pm),
        borderColor: 'rgb(153, 102, 255)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: false,
      }
    ]
  };

  // Fonction pour exporter le graphique en PDF
  const exportToPDF = () => {
    const element = document.getElementById("chart-container"); // Sélectionner le conteneur du graphique

    // Exporter en PDF
    html2pdf()
      .from(element)
      .save("chart.pdf");
  };

  return (
    <div>
      <h2>Graphiques de Météo</h2>
      {data.length > 0 ? (
        <div id="chart-container">
          <Line data={chartData} />
        </div>
      ) : (
        <p>Chargement des données...</p>
      )}

      {/* Bouton Material-UI */}
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={exportToPDF}
        >
          Exporter en PDF
        </Button>
      </div>
    </div>

  );
};

export default DataChart;
