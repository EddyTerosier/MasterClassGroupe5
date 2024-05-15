import React from 'react';
import { useNavigate } from 'react-router-dom';
import './pageaccueil.css';
import concertImage from './images/concert.jpeg';
import expositionImage from './images/corcerta.jpeg';
import brocanteImage from './images/brocante.jpeg';

function PageAccueil() {


  return (
    <div className="page-accueil">
   
      <main>
        <section className="evenements">
          <h2>Événements à venir</h2>
          <div className="cartes-evenement">
            <div className="carte-evenement">
              <img src={concertImage} alt="Concert en plein air" />
              <div className="contenu-carte">
                <h3>Concert en plein air</h3>
                <p>Date : 25 juin 2024</p>
                <p>Lieu : Place de la Mairie</p>
                <p>Plus d'infos : <a href="#">Détails</a></p>
                <button>Participer</button> {/* Ajout de l'événement onClick */}
              </div>
            </div>
            <div className="carte-evenement">
              <img src={expositionImage} alt="Exposition d'art local" />
              <div className="contenu-carte">
                <h3>Exposition d'art local</h3>
                <p>Date : 10 juillet 2024</p>
                <p>Lieu : Galerie municipale</p>
                <p>Plus d'infos : <a href="#">Détails</a></p>
                <button>Participer</button> {/* Ajout de l'événement onClick */}
              </div>
            </div>
            <div className="carte-evenement">
              <img src={brocanteImage} alt="Brocante place de la mairie" />
              <div className="contenu-carte">
                <h3>Brocante et Vide Grenier</h3>
                <p>Date : 1 Avril 2024</p>
                <p>Lieu : Place du marché</p>
                <p>Plus d'infos : <a href="#">Détails</a></p>
                <button>Participer</button> {/* Ajout de l'événement onClick */}
              </div>
            </div>
            {/* Ajoutez d'autres cartes ici */}
          </div>
        </section>
        <section className="apropos">
          <h2>À propos de nous</h2>
          <p>Bienvenue sur le site officiel de la Mairie, votre source d'informations sur les événements sociaux et culturels de notre ville.</p>
          <p>Explorez notre calendrier d'événements pour découvrir ce qui se passe près de chez vous et restez connecté avec la vie communautaire.</p>
          <p>N'hésitez pas à nous contacter pour toute question ou suggestion. Nous sommes là pour vous servir !</p>
        </section>
      </main>
      <footer>
        <p>&copy; {new Date().getFullYear()} Mairie de Paris</p>
      </footer>
    </div>
  );
}

export default PageAccueil;
