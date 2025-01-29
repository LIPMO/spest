// Fonction pour obtenir la localisation
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("La géolocalisation n'est pas supportée par ce navigateur.");
  }
}

// Fonction pour afficher les informations de localisation
function showPosition(position) {
  let speed = position.coords.speed * 3.6; // Conversion de m/s en km/h
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let time = new Date().toLocaleTimeString();

  document.getElementById("speed").innerText = speed.toFixed(2);
  document.getElementById("latitude").innerText = latitude;
  document.getElementById("longitude").innerText = longitude;

  // Ajouter les données au tableau
  if (speed !== null && !isNaN(speed)) {
    speedData.push(speed);
    timeData.push(time);

    // Mettre à jour le graphique
    updateChart();
}

// Fonction pour afficher les erreurs
function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("Permission de géolocalisation refusée. Veuillez autoriser l'accès.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("La position est indisponible. Essayez à nouveau.");
      break;
    case error.TIMEOUT:
      alert("La demande de géolocalisation a expiré.");
      break;
    case error.UNKNOWN_ERROR:
      alert("Une erreur inconnue s'est produite.");
      break;
  }
}

// Fonction pour réinitialiser les données
document.getElementById("resetBtn").addEventListener("click", function() {
  speedData = [];
  timeData = [];
  updateChart(); // Réinitialiser le graphique
  document.getElementById("speed").innerText = "0";
  document.getElementById("latitude").innerText = "0.0";
  document.getElementById("longitude").innerText = "0.0";
});

// Fonction pour mettre à jour le graphique
let speedChart = null;

function updateChart() {
  if (speedChart) {
    speedChart.destroy(); // Supprimer l'ancien graphique
  }

  let ctx = document.getElementById("speedChart").getContext("2d");
  
  speedChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: timeData, // Temps
      datasets: [{
        label: 'Vitesse (km/h)',
        data: speedData, // Vitesse
        borderColor: '#1D9BF0', // Couleur bleue iOS
        fill: false,
        tension: 0.1
      }]
    },
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: 'Temps'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Vitesse (km/h)'
          }
        }
      }
    }
  });
}

// Obtenir la localisation dès que la page est chargée
window.onload = function() {
  getLocation();
  setInterval(getLocation, 1000); // Mettre à jour toutes les 5 secondes
};
