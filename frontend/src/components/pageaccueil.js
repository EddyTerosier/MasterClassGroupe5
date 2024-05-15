import React, { useState } from 'react';
import './pageaccueil.css';
import concertImage from './images/concert.jpeg';
import expositionImage from './images/corcerta.jpeg'; // Image mise à jour
import brocanteImage from './images/brocante.jpeg';
import jsPDF from 'jspdf';

function PageAccueil() {
  const [showDetailsConcert, setShowDetailsConcert] = useState(false);
  const [showDetailsExposition, setShowDetailsExposition] = useState(false);
  const [showDetailsBrocante, setShowDetailsBrocante] = useState(false);
  const [ticketsConcert, setTicketsConcert] = useState(0);
  const [ticketsExposition, setTicketsExposition] = useState(0);
  const [ticketsBrocante, setTicketsBrocante] = useState(0);
  const [priceConcert, setPriceConcert] = useState(10);
  const [priceExposition, setPriceExposition] = useState(5);
  const [priceBrocante, setPriceBrocante] = useState(2);
  const [selectedExpositionDate, setSelectedExpositionDate] = useState('10 juillet 2024'); // Nouvel état pour la date sélectionnée

  const toggleDetailsConcert = () => {
    setShowDetailsConcert(!showDetailsConcert);
  };

  const toggleDetailsExposition = () => {
    setShowDetailsExposition(!showDetailsExposition);
  };

  const toggleDetailsBrocante = () => {
    setShowDetailsBrocante(!showDetailsBrocante);
  };

  const incrementTickets = (event) => {
    switch (event) {
      case 'concert':
        setTicketsConcert(ticketsConcert + 1);
        break;
      case 'exposition':
        setTicketsExposition(ticketsExposition + 1);
        break;
      case 'brocante':
        setTicketsBrocante(ticketsBrocante + 1);
        break;
      default:
        break;
    }
  };

  const decrementTickets = (event) => {
    switch (event) {
      case 'concert':
        setTicketsConcert(ticketsConcert > 0 ? ticketsConcert - 1 : 0);
        break;
      case 'exposition':
        setTicketsExposition(ticketsExposition > 0 ? ticketsExposition - 1 : 0);
        break;
      case 'brocante':
        setTicketsBrocante(ticketsBrocante > 0 ? ticketsBrocante - 1 : 0);
        break;
      default:
        break;
    }
  };

  const generateTicketPDF = (eventName, eventDate, eventLocation, eventDescription, eventTime, eventPrice, numTickets) => {
    const doc = new jsPDF();
    const content = `
      Événement: ${eventName}
      Date: ${eventDate} 
      Lieu: ${eventLocation}
      Description: ${eventDescription}
      Heure: ${eventTime}
      Prix: ${eventPrice} €
      Nombre de billets: ${numTickets}
      Total: ${eventPrice * numTickets} €
    `;
    doc.text(content, 10, 10);
    doc.save('billet_evenement.pdf');
  };

  return (
    <div className="page-accueil">
      <header>
        <h1>Bienvenue sur le site de la Mairie</h1>
       
      </header>
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
                <p>Plus d'infos : <a href="#" onClick={toggleDetailsConcert}>Détails</a></p>
                {showDetailsConcert && (
                  <div className="details">
                    <p>Description de l'événement...</p>
                    <p>Heure : 18h00</p>
                    <p>Prix : Gratuit</p>
                  </div>
                )}
                {showDetailsConcert && (
                  <div className="reservation">
                    <p>Nombre de billets : {ticketsConcert}</p>
                    <p>Prix du billet : {priceConcert} €</p>
                    <button onClick={() => incrementTickets('concert')}>Ajouter un billet</button>
                    <button onClick={() => decrementTickets('concert')}>Retirer un billet</button>
                    <p>Total : {ticketsConcert * priceConcert} €</p>
                    <button onClick={() => generateTicketPDF('Concert en plein air', '25 juin 2024', 'Place de la Mairie', 'Description du concert...', '18h00', priceConcert, ticketsConcert)}>Générer billet PDF</button>
                  </div>
                )}
              </div>
            </div>
            <div className="carte-evenement">
              <img src={expositionImage} alt="Exposition d'art local" />
              <div className="contenu-carte">
                <h3>Exposition d'art local</h3>
                <p>Date : 10 juillet 2024</p>
                <p>Lieu : Galerie municipale</p>
                <p>Choisir la date :
                  <select value={selectedExpositionDate} onChange={(e) => setSelectedExpositionDate(e.target.value)}>
                    <option value="10 juillet 2024">10 juillet 2024</option>
                    <option value="11 juillet 2024">11 juillet 2024</option>
                    <option value="12 juillet 2024">12 juillet 2024</option>
                  </select>
                </p>
                <p>Plus d'infos : <a href="#" onClick={toggleDetailsExposition}>Détails</a></p>
                {showDetailsExposition && (
                  <div className="details">
                    <p>Exposition des œuvres d'artistes locaux dans la galerie municipale.</p>
                    <p>Heure : 10h00 - 17h00</p>
                    <p>Prix : Entrée libre</p>
                  </div>
                )}
                {showDetailsExposition && (
                  <div className="reservation">
                    <p>Nombre de billets : {ticketsExposition}</p>
                    <p>Prix du billet : {priceExposition} €</p>
                    <button onClick={() => incrementTickets('exposition')}>Ajouter un billet</button>
                    <button onClick={() => decrementTickets('exposition')}>Retirer un billet</button>
                    <p>Total : {ticketsExposition * priceExposition} €</p>
                    <button onClick={() => generateTicketPDF('Exposition d\'art local', selectedExpositionDate, 'Galerie municipale', 'Exposition des œuvres d\'artistes locaux...', '10h00 - 17h00', priceExposition, ticketsExposition)}>Générer billet PDF</button>
                  </div>
                )}
              </div>
            </div>
            <div className="carte-evenement">
              <img src={brocanteImage} alt="Brocante place de la mairie" />
              <div className="contenu-carte">
                <h3>Brocante et Vide Grenier</h3>
                <p>Date : 1 Avril 2024</p>
                <p>Lieu : Place du marché</p>
                <p>Plus d'infos : <a href="#" onClick={toggleDetailsBrocante}>Détails</a></p>
                {showDetailsBrocante && (
                  <div className="details">
                    <p>Brocante et vide grenier organisés sur la place du marché.</p>
                    <p>Heure : 8h00 - 16h00</p>
                    <p>Prix : Gratuit pour les visiteurs</p>
                  </div>
                )}
                {showDetailsBrocante && (
                  <div className="reservation">
                    <p>Nombre de billets : {ticketsBrocante}</p>
                    <p>Prix du billet : {priceBrocante} €</p>
                    <button onClick={() => incrementTickets('brocante')}>Ajouter un billet</button>
                    <button onClick={() => decrementTickets('brocante')}>Retirer un billet</button>
                    <p>Total : {ticketsBrocante * priceBrocante} €</p>
                    <button onClick={() => generateTicketPDF('Brocante et Vide Grenier', '1 Avril 2024', 'Place du marché', 'Brocante et vide grenier organisés sur la place du marché...', '8h00 - 16h00', priceBrocante, ticketsBrocante)}>Générer billet PDF</button>
                  </div>
                )}
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
