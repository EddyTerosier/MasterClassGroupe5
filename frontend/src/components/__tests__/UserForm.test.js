// src/components/__tests__/UserForm.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import UserForm from '../UserForm';

describe('UserForm Composant', () => {
    // Réinitialisation du fetch avant chaque test
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    test('Affiche le formulaire de création initial', async () => {
        const handleSave = jest.fn();

        // Rendu du composant UserForm
        await act(async () => {
            render(<UserForm onSave={handleSave} />);
        });

        // Vérifie que les champs du formulaire sont vides
        expect(screen.getByLabelText(/Email/i)).toHaveValue('');
        expect(screen.getByLabelText(/Mot de passe/i)).toHaveValue('');
        expect(screen.getByLabelText(/Rôles/i)).toHaveValue('');
    });

    test('Affiche les données d\'un utilisateur existant', async () => {
        const handleSave = jest.fn();
        const user = { id: 1, email: 'user@example.com', roles: ['ROLE_USER'] };

        // Simulation de la réponse du fetch pour les données de l'utilisateur
        global.fetch.mockResolvedValueOnce({
            json: () => Promise.resolve(user)
        });

        // Rendu du composant UserForm avec un utilisateur existant
        await act(async () => {
            render(<UserForm userId={user.id} onSave={handleSave} />);
        });

        // Vérifie que les champs du formulaire contiennent les données de l'utilisateur
        expect(await screen.findByDisplayValue(user.email)).toBeInTheDocument();
        expect(await screen.findByDisplayValue('ROLE_USER')).toBeInTheDocument();
    });

    test('Soumet le formulaire pour la création d\'un utilisateur', async () => {
        const handleSave = jest.fn();

        // Rendu du composant UserForm
        await act(async () => {
            render(<UserForm onSave={handleSave} />);
        });

        // Simulation de la saisie des champs du formulaire
        fireEvent.change(screen.getByLabelText(/Email/i), {
            target: { value: 'newuser@example.com' },
        });
        fireEvent.change(screen.getByLabelText(/Mot de passe/i), {
            target: { value: 'password123' },
        });
        fireEvent.change(screen.getByLabelText(/Rôles/i), {
            target: { value: '' },
        });

        // Simulation de la réponse du fetch après soumission du formulaire
        global.fetch.mockResolvedValueOnce({
            json: () => Promise.resolve({ id: 1, email: 'newuser@example.com', roles: ['ROLE_USER'] })
        });

        // Soumission du formulaire
        await act(async () => {
            fireEvent.submit(screen.getByText(/Enregistrer/i));
        });

        // Vérifie que la fonction handleSave a été appelée avec les bonnes données
        await waitFor(() => {
            expect(handleSave).toHaveBeenCalledWith({
                id: 1,
                email: 'newuser@example.com',
                password: 'password123',
                roles: ['ROLE_USER'],
            });
        });
    });

    test('Soumet le formulaire pour la mise à jour d\'un utilisateur', async () => {
        const handleSave = jest.fn();
        const user = { id: 1, email: 'user@example.com', roles: ['ROLE_USER'] };

        // Simulation de la réponse du fetch pour les données de l'utilisateur
        global.fetch.mockResolvedValueOnce({
            json: () => Promise.resolve(user)
        });

        // Rendu du composant UserForm avec un utilisateur existant
        await act(async () => {
            render(<UserForm userId={user.id} onSave={handleSave} />);
        });

        // Simulation de la modification des champs du formulaire
        fireEvent.change(screen.getByLabelText(/Email/i), {
            target: { value: 'updateduser@example.com' },
        });
        fireEvent.change(screen.getByLabelText(/Rôles/i), {
            target: { value: 'ROLE_ADMIN' },
        });

        // Simulation de la réponse du fetch après soumission du formulaire de mise à jour
        global.fetch.mockResolvedValueOnce({
            json: () => Promise.resolve({ id: user.id, email: 'updateduser@example.com', roles: ['ROLE_ADMIN'] })
        });

        // Soumission du formulaire de mise à jour
        await act(async () => {
            fireEvent.submit(screen.getByText(/Enregistrer/i));
        });

        // Vérifie que la fonction handleSave a été appelée avec les bonnes données mises à jour
        await waitFor(() => {
            expect(handleSave).toHaveBeenCalledWith({
                id: user.id,
                email: 'updateduser@example.com',
                roles: ['ROLE_ADMIN'],
                password: ''
            });
        });
    });

    test('Vérifie que les champs obligatoires sont validés', async () => {
        const handleSave = jest.fn();

        // Rendu du composant UserForm
        await act(async () => {
            render(<UserForm onSave={handleSave} />);
        });

        // Soumission du formulaire sans remplir les champs obligatoires
        await act(async () => {
            fireEvent.submit(screen.getByText(/Enregistrer/i));
        });

        // Vérifie que la fonction handleSave n'a pas été appelée
        await waitFor(() => expect(handleSave).not.toHaveBeenCalled());
    });
});
