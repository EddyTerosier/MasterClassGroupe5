// src/components/__tests__/Events.test.js
import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import Events from '../Events';

describe('Events Composant', () => {
    // Réinitialisation du fetch et simulation du rôle admin avant chaque test
    beforeEach(() => {
        global.fetch = jest.fn();
        sessionStorage.setItem('Role', 'ROLE_ADMIN');  // Simulation du rôle admin pour les tests
    });

    // Nettoyage de sessionStorage après chaque test
    afterEach(() => {
        sessionStorage.clear();  // Nettoyer sessionStorage après chaque test
    });

    test('Rendu du composant et récupération des événements', async () => {
        // Simulation de la réponse du fetch pour récupérer les événements
        global.fetch.mockResolvedValueOnce({
            json: () => Promise.resolve([{ id: 1, titre: 'Event 1', date: '2023-01-01' }])
        });

        // Rendu du composant Events
        await act(async () => {
            render(<Events />);
        });

        // Vérifie que l'événement est bien affiché
        expect(await screen.findByText('Event 1')).toBeInTheDocument();
    });

    test("Suppression d'un évènement au clique du bouton", async () => {
        // Simulation des réponses successives du fetch pour la suppression d'un événement
        global.fetch
            .mockResolvedValueOnce({
                json: () => Promise.resolve([{ id: 1, titre: 'Event 1', date: '2023-01-01' }])
            })
            .mockResolvedValueOnce({
                json: () => Promise.resolve([])
            });

        // Rendu du composant Events
        await act(async () => {
            render(<Events />);
        });

        // Vérifie que l'événement est bien affiché avant la suppression
        expect(await screen.findByText('Event 1')).toBeInTheDocument();

        // Simulation du clic sur le bouton de suppression
        await act(async () => {
            fireEvent.click(screen.getByText('Supprimer'));
        });

        // Vérifie que l'événement n'est plus affiché après la suppression
        await waitFor(() => expect(screen.queryByText('Event 1')).not.toBeInTheDocument());
    });

    test("Annule un évènement au clique du bouton d'annulation", async () => {
        // Simulation des réponses successives du fetch pour l'annulation d'un événement
        global.fetch
            .mockResolvedValueOnce({
                json: () => Promise.resolve([{ id: 1, titre: 'Event 1', date: '2023-01-01' }])
            })
            .mockResolvedValueOnce({
                json: () => Promise.resolve({ id: 1, titre: 'Event 1', date: '2023-01-01', annulation: true, raison: 'Reason' })
            });

        // Rendu du composant Events
        await act(async () => {
            render(<Events />);
        });

        // Vérifie que l'événement est bien affiché avant l'annulation
        expect(await screen.findByText('Event 1')).toBeInTheDocument();

        // Simulation du clic sur le bouton d'annulation
        fireEvent.click(screen.getByText('Annuler'));

        // Saisie de la raison de l'annulation
        fireEvent.change(screen.getByLabelText(/Raison de l'annulation/i), {
            target: { value: 'Reason' }
        });

        // Soumission du formulaire d'annulation
        fireEvent.click(screen.getAllByText("Annuler l'Événement")[1]);

        // Vérifie que l'événement est bien annulé et que la raison est affichée
        await waitFor(() => expect(screen.queryByText('Oui')).toBeInTheDocument());
        expect(screen.queryByText('Reason')).toBeInTheDocument();
    });

    test('Ouverture du formulaire de modification au clique du bouton', async () => {
        // Simulation des réponses successives du fetch pour la modification d'un événement
        global.fetch.mockResolvedValueOnce({
            json: () => Promise.resolve([{ id: 1, titre: 'Event 1', date: '2023-01-01' }])
        });

        global.fetch.mockResolvedValueOnce({
            json: () => Promise.resolve({ id: 1, titre: 'Event 1', date: '2023-01-01', description: '', lieu: '', prix: '' })
        });

        // Rendu du composant Events
        await act(async () => {
            render(<Events />);
        });

        // Vérifie que l'événement est bien affiché avant la modification
        expect(await screen.findByText('Event 1')).toBeInTheDocument();

        // Simulation du clic sur le bouton de modification
        fireEvent.click(screen.getByText('Modifier'));

        // Vérifie que le formulaire de modification est bien affiché
        expect(await screen.findByText('Modifier un Événement')).toBeInTheDocument();
    });

    test("Ajout d'un nouvel évènement en utilisant EventForm", async () => {
        // Simulation des réponses successives du fetch pour l'ajout d'un événement
        global.fetch
            .mockResolvedValueOnce({
                json: () => Promise.resolve([])  // Fetch pour récupérer les évènements
            })
            .mockResolvedValueOnce({
                json: () => Promise.resolve({ id: 2, titre: 'New Event', date: '2023-01-02T00:00', description: 'New Description', lieu: 'New Lieu', prix: 20, maximum: 200 })  // Fetch pour le nouvel évènement crée
            })
            .mockResolvedValueOnce({
                json: () => Promise.resolve([{ id: 2, titre: 'New Event', date: '2023-01-02T00:00', description: 'New Description', lieu: 'New Lieu', prix: 20, maximum: 200 }])  // Fetch pour sauvegarder le nouvel évènement
            });

        // Rendu du composant Events
        await act(async () => {
            render(<Events />);
        });

        // Simulation du clic sur le bouton 'Ajouter un Événement'
        fireEvent.click(screen.getByText('Ajouter un Événement'));

        // Simulation de la saisie des champs du formulaire d'ajout d'un événement
        fireEvent.change(screen.getByLabelText(/Titre/i), {
            target: { value: 'New Event' }
        });
        fireEvent.change(screen.getByLabelText(/Description/i), {
            target: { value: 'New Description' }
        });
        fireEvent.change(screen.getByLabelText(/Lieu/i), {
            target: { value: 'New Lieu' }
        });
        fireEvent.change(screen.getByLabelText(/Prix/i), {
            target: { value: '20' }
        });
        fireEvent.change(screen.getByLabelText(/Limite/i), {
            target: { value: '200' }
        });
        fireEvent.change(screen.getByLabelText(/Date 1/i), {
            target: { value: '2023-01-02T00:00' }
        });

        // Soumission du formulaire d'ajout d'un événement
        await act(async () => {
            fireEvent.submit(screen.getByText('Enregistrer'));
        });

        // Vérifie que le nouvel événement est bien ajouté et affiché
        await waitFor(() => {
            expect(screen.getByText('New Event')).toBeInTheDocument();
        });
    });
});
