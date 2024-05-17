// src/components/__tests__/Users.test.js
import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import Users from '../Users';

// On crée un mock du composant UserForm pour isoler les tests sur le composant Users.
// Ce mock retourne un bouton qui simule l'ajout ou la mise à jour d'un utilisateur.
jest.mock('../UserForm', () => ({ userId, onSave }) => (
    <div data-testid="user-form">
        <button onClick={() => onSave({ id: userId || 'new', email: 'test@example.com', roles: ['ROLE_USER'] })}>
            {userId ? 'Update' : 'Add'} User
        </button>
    </div>
));

describe('Users Component', () => {
    // Réinitialisation du fetch avant chaque test
    beforeEach(() => {
        global.fetch = jest.fn();
        sessionStorage.setItem('Role', 'ROLE_ADMIN');  // Simulation du rôle admin pour les tests
    });

    afterEach(() => {
        sessionStorage.clear(); // Nettoyer sessionStorage après chaque test
    });

    test('Récupère et affiche les utilisateurs', async () => {
        // Simulation de la réponse du fetch
        global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue([{ id: 1, email: 'user@example.com', roles: ['ROLE_USER'] }]),
        });

        // Rendu du composant Users
        await act(async () => {
            render(<Users />);
        });

        // Vérifie que l'email de l'utilisateur est bien retourné.
        await waitFor(() => {
            expect(screen.getByText('user@example.com')).toBeInTheDocument();
            expect(screen.getByText('ROLE_USER')).toBeInTheDocument();
        });
    });

    test('Supprime un utilisateur au clic du bouton', async () => {
        // Simulation des réponses successives du fetch pour la suppression d'un utilisateur
        global.fetch
            .mockResolvedValueOnce({
                json: jest.fn().mockResolvedValue([{ id: 1, email: 'user@example.com', roles: ['ROLE_USER'] }]),
            })
            .mockResolvedValueOnce({
                ok: true,
            })
            .mockResolvedValueOnce({
                json: jest.fn().mockResolvedValue([]),
            });

        await act(async () => {
            render(<Users />);
        });

        // Vérifie que l'utilisateur est bien affiché avant la suppression
        await waitFor(() => {
            expect(screen.getByText('user@example.com')).toBeInTheDocument();
            expect(screen.getByText('ROLE_USER')).toBeInTheDocument();
        });

        // Simulation du clic sur le bouton de suppression
        await act(async () => {
            fireEvent.click(screen.getByText('Supprimer'));
        });

        // Vérifie que l'utilisateur n'est plus affiché après la suppression
        await waitFor(() => {
            expect(screen.queryByText('user@example.com')).not.toBeInTheDocument();
        });
    });

    test('Ouvre le formulaire pour ajouter un utilisateur', async () => {
        // Simulation de la réponse du fetch
        global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue([{ id: 1, email: 'user@example.com', roles: ['ROLE_USER'] }]),
        });

        await act(async () => {
            render(<Users />);
        });

        // Simulation du clic sur le bouton 'Ajouter un Utilisateur'
        fireEvent.click(screen.getByText('Ajouter un Utilisateur'));

        // Vérifie que le formulaire d'ajout est bien affiché
        await waitFor(() => {
            expect(screen.getByTestId('user-form')).toBeInTheDocument();
            expect(screen.getByText('Add User')).toBeInTheDocument();
        });
    });

    test('Ouvre le formulaire pour modifier un utilisateur', async () => {
        // Simulation de la réponse du fetch
        global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue([{ id: 1, email: 'user@example.com', roles: ['ROLE_USER'] }]),
        });

        await act(async () => {
            render(<Users />);
        });

        // Vérifie que l'utilisateur est bien affiché avant la modification
        await waitFor(() => {
            expect(screen.getByText('user@example.com')).toBeInTheDocument();
        });

        // Simulation du clic sur le bouton 'Modifier'
        fireEvent.click(screen.getByText('Modifier'));

        // Vérifie que le formulaire de modification est bien affiché
        await waitFor(() => {
            expect(screen.getByTestId('user-form')).toBeInTheDocument();
            expect(screen.getByText('Update User')).toBeInTheDocument();
        });
    });

    test('Ajoute un nouvel utilisateur via le formulaire', async () => {
        // Simulation des réponses successives du fetch pour l'ajout d'un utilisateur
        global.fetch
            .mockResolvedValueOnce({
                json: jest.fn().mockResolvedValue([{ id: 1, email: 'user@example.com', roles: ['ROLE_USER'] }]),
            })
            .mockResolvedValueOnce({
                json: jest.fn().mockResolvedValue([{ id: 1, email: 'user@example.com', roles: ['ROLE_USER'] }, { id: 2, email: 'test@example.com', roles: ['ROLE_USER'] }]),
            });

        await act(async () => {
            render(<Users />);
        });

        // Simulation du clic sur le bouton 'Ajouter un Utilisateur' et soumission du formulaire
        fireEvent.click(screen.getByText('Ajouter un Utilisateur'));
        fireEvent.click(screen.getByText('Add User'));

        // Vérifie que le nouvel utilisateur est bien ajouté et affiché
        await waitFor(() => {
            expect(screen.getByText('test@example.com')).toBeInTheDocument();
        });
    });

    test('Met à jour un utilisateur via le formulaire', async () => {
        // Simulation des réponses successives du fetch pour la mise à jour d'un utilisateur
        global.fetch
            .mockResolvedValueOnce({
                json: jest.fn().mockResolvedValue([{ id: 1, email: 'user@example.com', roles: ['ROLE_USER'] }]),
            })
            .mockResolvedValueOnce({
                json: jest.fn().mockResolvedValue([{ id: 1, email: 'updated@example.com', roles: ['ROLE_USER'] }]),
            });

        await act(async () => {
            render(<Users />);
        });

        // Vérifie que l'utilisateur est bien affiché avant la modification
        await waitFor(() => {
            expect(screen.getByText('user@example.com')).toBeInTheDocument();
        });

        // Simulation du clic sur le bouton 'Modifier' et soumission du formulaire de modification
        fireEvent.click(screen.getByText('Modifier'));
        fireEvent.click(screen.getByText('Update User'));

        // Vérifie que l'utilisateur est bien mis à jour et affiché
        await waitFor(() => {
            expect(screen.getByText('updated@example.com')).toBeInTheDocument();
        });
    });
});
