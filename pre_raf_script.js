// Initialize the Leaflet map
function initMap() {
    const map = L.map('map').setView([51.505, -0.09], 6);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const locations = [
        { coords: [51.5081, -0.1281], title: "Tate Britain" },
        { coords: [51.7520, -1.2577], title: "Ashmolean Museum" },
        { coords: [52.4862, -1.8904], title: "Birmingham Museum & Art Gallery" },
    ];

    locations.forEach(location => {
        L.marker(location.coords)
            .addTo(map)
            .bindPopup(`<b>${location.title}</b><br>Explorez l'art et la culture.`); // Custom popup text
    });
}

window.addEventListener("load", initMap);

//Gallery lightbox
function openLightbox(imageSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    lightbox.style.display = 'flex';
    lightboxImg.src = imageSrc;
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

//History interactive timeline
document.addEventListener("DOMContentLoaded", function() {
    const items = document.querySelectorAll(".timeline-item");
    
    items.forEach(item => {
        item.addEventListener("click", function() {
            alert("Année: " + this.getAttribute("data-year"));
        });
    });
});

//Workshops cards
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add animation to workshop cards on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.workshop-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Add click handler for registration buttons
document.querySelectorAll('.register-btn').forEach(button => {
    button.addEventListener('click', function() {
        const workshopTitle = this.closest('.workshop-content').querySelector('h3').textContent;
        alert(`Inscription à l'atelier "${workshopTitle}" en cours de traitement...`);
    });
});

//Community
document.querySelectorAll('.profile').forEach(profile => {
    profile.addEventListener('click', function() {
        document.getElementById('popup-name').innerText = this.dataset.name;
        document.getElementById('popup-topic').innerText = this.dataset.topic;
        document.getElementById('profile-popup').style.display = 'block';
    });
});

document.getElementById('close-popup').addEventListener('click', function() {
    document.getElementById('profile-popup').style.display = 'none';
});


//Contact form
document.getElementById('contactForm').addEventListener('submit', function(event) {
      event.preventDefault();

      const prenom = document.getElementById('prenom').value.trim();
      const nom = document.getElementById('nom').value.trim();
      const email = document.getElementById('email').value.trim();
      const sujet = document.getElementById('sujet').value.trim();
      const message = document.getElementById('message').value.trim();

      let hasError = false;

      if (prenom === '' || nom === '') {
        alert('Prénom et Nom sont requis.');
        hasError = true;
      }

      if (email === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Un email valide est requis.');
        hasError = true;
      }

      if (message === '') {
        alert('Le message est requis.');
        hasError = true;
      }

      if (!hasError) {
        alert('Message envoyé avec succès !');
        document.getElementById('contactForm').reset();
      }
    });