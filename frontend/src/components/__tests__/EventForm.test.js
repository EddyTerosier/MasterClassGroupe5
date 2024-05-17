// src/components/__tests__/EventForm.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import EventForm from '../EventForm';

describe('EventForm Composant', () => {
    // Réinitialisation du fetch et simulation du rôle admin avant chaque test
    beforeEach(() => {
        global.fetch = jest.fn();
        sessionStorage.setItem('Role', 'ROLE_ADMIN');  // Simulation du rôle admin pour les tests
    });

    // Nettoyage de sessionStorage après chaque test
    afterEach(() => {
        sessionStorage.clear();  // Nettoyer sessionStorage après chaque test
    });

    test('Affiche le formulaire de création initial', async () => {
        const handleSave = jest.fn();

        // Rendu du composant EventForm
        await act(async () => {
            render(<EventForm onSave={handleSave} />);
        });

        // Vérifie que les champs du formulaire sont vides
        expect(screen.getByLabelText(/Titre/i)).toHaveValue('');
        expect(screen.getByLabelText(/Description/i)).toHaveValue('');
        expect(screen.getByLabelText(/Lieu/i)).toHaveValue('');
        expect(screen.getByLabelText(/Prix/i)).toHaveValue(null);
        expect(screen.getByLabelText(/Limite/i)).toHaveValue(null);
    });

    test('Affiche les données d\'un événement existant', async () => {
        const handleSave = jest.fn();
        const event = { id: 1, titre: 'Event 1', description: 'Description', date: '2023-01-01T00:00', lieu: 'Lieu', prix: 10, maximum: 100, annulation: false, raison: '' };

        // Simulation de la réponse du fetch pour les données de l'événement
        global.fetch.mockResolvedValueOnce({
            json: () => Promise.resolve(event)
        });

        // Rendu du composant EventForm avec un événement existant
        await act(async () => {
            render(<EventForm eventId={event.id} onSave={handleSave} />);
        });

        // Vérifie que les champs du formulaire contiennent les données de l'événement
        expect(await screen.findByDisplayValue(event.titre)).toBeInTheDocument();
        expect(await screen.findByDisplayValue(event.description)).toBeInTheDocument();
        expect(await screen.findByDisplayValue(event.date)).toBeInTheDocument();
        expect(await screen.findByDisplayValue(event.lieu)).toBeInTheDocument();
        expect(await screen.findByDisplayValue(event.prix.toString())).toBeInTheDocument();
        expect(await screen.findByDisplayValue(event.maximum.toString())).toBeInTheDocument();
    });

    test('Soumet le formulaire pour la création d\'un événement', async () => {
        const handleSave = jest.fn();

        // Rendu du composant EventForm
        await act(async () => {
            render(<EventForm onSave={handleSave} />);
        });

        // Simulation de la saisie des champs du formulaire
        fireEvent.change(screen.getByLabelText(/Titre/i), {
            target: { value: 'New Event' },
        });
        fireEvent.change(screen.getByLabelText(/Description/i), {
            target: { value: 'New Description' },
        });
        fireEvent.change(screen.getByLabelText(/Lieu/i), {
            target: { value: 'New Lieu' },
        });
        fireEvent.change(screen.getByLabelText(/Prix/i), {
            target: { value: '20' },
        });
        fireEvent.change(screen.getByLabelText(/Limite/i), {
            target: { value: '200' },
        });
        fireEvent.change(screen.getByLabelText(/Date 1/i), {
            target: { value: '2023-01-01T00:00' },
        });

        // Simulation de la réponse du fetch après soumission du formulaire
        global.fetch.mockResolvedValueOnce({
            json: () => Promise.resolve({ id: 1, titre: 'New Event', description: 'New Description', date: '2023-01-01T00:00', lieu: 'New Lieu', prix: 20, maximum: 200, annulation: false, raison: '' })
        });

        // Soumission du formulaire
        await act(async () => {
            fireEvent.submit(screen.getByText(/Enregistrer/i));
        });

        // Vérifie que la fonction handleSave a été appelée avec les bonnes données
        await waitFor(() => {
            expect(handleSave).toHaveBeenCalledWith({
                id: 1,
                titre: 'New Event',
                description: 'New Description',
                date: '2023-01-01T00:00',
                lieu: 'New Lieu',
                prix: 20,
                maximum: 200,
                annulation: false,
                raison: ''
            });
        });
    });

    test('Soumet le formulaire pour la mise à jour d\'un événement', async () => {
        const handleSave = jest.fn();
        const event = { id: 1, titre: 'Event 1', description: 'Description', date: '2023-01-01T00:00', lieu: 'Lieu', prix: 10, maximum: 100, annulation: false, raison: '' };

        // Simulation de la réponse du fetch pour les données de l'événement
        global.fetch.mockResolvedValueOnce({
            json: () => Promise.resolve(event)
        });

        // Rendu du composant EventForm avec un événement existant
        await act(async () => {
            render(<EventForm eventId={event.id} onSave={handleSave} />);
        });

        // Simulation de la modification des champs du formulaire
        fireEvent.change(screen.getByLabelText(/Titre/i), {
            target: { value: 'Updated Event' },
        });
        fireEvent.change(screen.getByLabelText(/Description/i), {
            target: { value: 'Updated Description' },
        });
        fireEvent.change(screen.getByLabelText(/Lieu/i), {
            target: { value: 'Updated Lieu' },
        });
        fireEvent.change(screen.getByLabelText(/Prix/i), {
            target: { value: '30' },
        });
        fireEvent.change(screen.getByLabelText(/Limite/i), {
            target: { value: '300' },
        });
        fireEvent.change(screen.getByLabelText(/Date 1/i), {
            target: { value: '2023-02-01T00:00' },
        });

        // Simulation de la réponse du fetch après soumission du formulaire de mise à jour
        global.fetch.mockResolvedValueOnce({
            json: () => Promise.resolve({ id: 1, titre: 'Updated Event', description: 'Updated Description', date: '2023-02-01T00:00', lieu: 'Updated Lieu', prix: 30, maximum: 300, annulation: false, raison: '' })
        });

        // Soumission du formulaire de mise à jour
        await act(async () => {
            fireEvent.submit(screen.getByText(/Enregistrer/i));
        });

        // Vérifie que la fonction handleSave a été appelée avec les bonnes données mises à jour
        await waitFor(() => {
            expect(handleSave).toHaveBeenCalledWith({
                id: 1,
                titre: 'Updated Event',
                description: 'Updated Description',
                date: '2023-02-01T00:00',
                lieu: 'Updated Lieu',
                prix: 30,
                maximum: 300,
                annulation: false,
                raison: ''
            });
        });
    });

    test('Vérifie que les champs obligatoires sont validés', async () => {
        const handleSave = jest.fn();

        // Rendu du composant EventForm
        await act(async () => {
            render(<EventForm onSave={handleSave} />);
        });

        // Soumission du formulaire sans remplir les champs obligatoires
        await act(async () => {
            fireEvent.submit(screen.getByText(/Enregistrer/i));
        });

        // Vérifie que la fonction handleSave n'a pas été appelée
        await waitFor(() => expect(handleSave).not.toHaveBeenCalled());

        // Mock fetch pour empêcher les erreurs de promesse non gérées
        global.fetch.mockResolvedValueOnce({
            json: () => Promise.resolve({})
        });
    });
});
