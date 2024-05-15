import React, { useState } from 'react';
import './Login.css'; // Assurez-vous d'avoir un fichier LoginForm.css pour les styles
import axios from 'axios';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Effectuer la requête Axios vers votre API de connexion
      const response = await axios.post('http://127.0.0.1:8000/login', {
        email: username,
        password: password
      });
      alert(response.data);

      // Vérifier la réponse de l'API et effectuer la redirection si la connexion est réussie
      if (response.data === "Connecté") {
        // Redirection vers une page de succès ou autre
        window.location.href = '/Admin';
      } else {
        // Afficher un message d'erreur si la réponse de l'API indique un problème de connexion
        setError('Identifiants incorrects. Veuillez réessayer.');
      }
    } catch (error) {
      // Gérer les erreurs éventuelles de la requête Axios
      setError('Une erreur s\'est produite. Veuillez réessayer plus tard.');
      console.error('Erreur lors de la connexion :', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Bienvenue</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Nom d'utilisateur</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default LoginForm;
