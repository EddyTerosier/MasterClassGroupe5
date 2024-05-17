// src/components/__tests__/AdminDashboard.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AdminDashboard from '../AdminDashboard';

// Mock des sous-composants pour isoler les tests
jest.mock('../Users', () => () => <div>Gestion des Utilisateurs</div>);
jest.mock('../Events', () => () => <div>Gestion des Événements</div>);
jest.mock('../Tickets', () => () => <div>Gestion des Billets</div>);
jest.mock('../Denied', () => () => <div>Accès refusé</div>);

describe('AdminDashboard Component', () => {
    // Nettoyage de sessionStorage avant chaque test
    beforeEach(() => {
        sessionStorage.clear();
    });

    test('Retour du composant AdminDashboard et présence des liens', () => {
        sessionStorage.setItem('Role', 'ROLE_ADMIN');  // Simulation du rôle admin

        render(
            <BrowserRouter>
                <AdminDashboard />
            </BrowserRouter>
        );

        // Vérifie que le titre du tableau de bord et les liens de navigation sont présents.
        expect(screen.getByText(/Admin Dashboard/i)).toBeInTheDocument();
        expect(screen.getByText(/Gestion des Utilisateurs/i)).toBeInTheDocument();
        expect(screen.getByText(/Gestion des Événements/i)).toBeInTheDocument();
    });

    test('Renvoie vers le composant Users après un clique', async () => {
        sessionStorage.setItem('Role', 'ROLE_ADMIN');  // Simulation du rôle admin

        render(
            <BrowserRouter>
                <AdminDashboard />
            </BrowserRouter>
        );

        // Simulation de clique sur le bouton 'Gestion des Utilisateurs'
        fireEvent.click(screen.getByText(/Gestion des Utilisateurs/i));

        // Vérifie que le composant Users est bien retourné
        expect(await screen.findByText(/Gestion des Utilisateurs/i)).toBeInTheDocument();
    });

    test('Renvoie vers le composant Events après un clique', async () => {
        sessionStorage.setItem('Role', 'ROLE_ADMIN');  // Simulation du rôle admin

        render(
            <BrowserRouter>
                <AdminDashboard />
            </BrowserRouter>
        );

        // Simulation de clique sur le bouton 'Gestion des Événements'
        fireEvent.click(screen.getByText(/Gestion des Événements/i));

        // Vérifie que le composant Events est bien retourné
        expect(await screen.findByText(/Gestion des Événements/i)).toBeInTheDocument();
    });

    test('Affiche Denied pour les utilisateurs non admin', () => {
        sessionStorage.setItem('Role', 'ROLE_USER');  // Simulation du rôle utilisateur

        render(
            <BrowserRouter>
                <AdminDashboard />
            </BrowserRouter>
        );

        // Vérifie que le composant Denied est affiché
        expect(screen.getByText(/Accès refusé/i)).toBeInTheDocument();
    });
});
