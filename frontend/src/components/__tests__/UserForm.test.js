// src/components/__tests__/UserForm.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import UserForm from '../UserForm';

describe('UserForm Composant', () => {
    // Avant chaque test, on simule un fetch
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    test('Retourne le formulaire et soumet les données', async () => {
        const handleSave = jest.fn();

        await act(async () => {
            render(<UserForm onSave={handleSave} />);
        });

        // On remplit les champs Email et Mot de passe du formulaire afin de pouvoir tester par la suite
        fireEvent.change(screen.getByLabelText(/Email/i), {
            target: { value: 'newuser@example.com' },
        });
        fireEvent.change(screen.getByLabelText(/Mot de passe/i), {
            target: { value: 'password123' },
        });

        // Fetch est configuré pour renvoyer une réponse simulée correspondant aux données du formulaire soumis.
        global.fetch.mockResolvedValueOnce({
            json: () => Promise.resolve({ email: 'newuser@example.com', password: 'password123' })
        });

        // Le bouton de soumission est cliqué avec fireEvent.click.
        await act(async () => {
            fireEvent.click(screen.getByText(/Enregistrer/i));
        });

        // WaitFor est utilisé pour attendre que l'appel fetch soit complété et vérifie que handleSave a été appelé avec les bonnes données.
        await waitFor(() => expect(handleSave).toHaveBeenCalledWith({
            email: 'newuser@example.com',
            password: 'password123',
        }));
    });

    test('Retourne le formulaire avec des données existantes et met à jour', async () => {
        const handleSave = jest.fn();
        const user = { id: 1, email: 'user@example.com' };

        // Fetch est simulé pour renvoyer les données utilisateur existantes
        global.fetch.mockResolvedValueOnce({
            json: () => Promise.resolve(user)
        });

        // Le formulaire est retourné avec les données user.
        await act(async () => {
            render(<UserForm userId={user.id} onSave={handleSave} />);
        });

        // On vérifie si le champ email contient bien les données user
        expect(await screen.findByDisplayValue(user.email)).toBeInTheDocument();

        // On modifie le champ email avec fireEvent
        fireEvent.change(screen.getByLabelText(/Email/i), {
            target: { value: 'updateduser@example.com' },
        });

        // Fetch est configuré pour renvoyer une réponse simulée correspondant aux données mises à jour.
        global.fetch.mockResolvedValueOnce({
            json: () => Promise.resolve({ id: user.id, email: 'updateduser@example.com', password: '' })
        });

        // Le bouton de soumission est cliqué avec fireEvent.
        await act(async () => {
            fireEvent.click(screen.getByText(/Enregistrer/i));
        });

        // WaitFor est utilisé pour attendre que l'appel fetch soit complété et vérifie que handleSave a été appelé avec les données mises à jour.
        await waitFor(() => expect(handleSave).toHaveBeenCalledWith({
            id: user.id,
            email: 'updateduser@example.com',
            password: '',
        }));
    });
});
