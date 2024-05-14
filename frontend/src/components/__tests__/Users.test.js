// src/components/__tests__/Users.test.js
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Users from '../Users';

describe('Users Composant', () => {
    test('Retourne une table avec les users et récupère les users', async () => {
        // Fetch est simulé pour renvoyer une réponse JSON contenant une liste d'utilisateurs.
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([{ id: 1, email: 'user@example.com' }]),
            })
        );

        await act(async () => {
            render(<Users />);
        });

        // Vérifie que l'email de l'utilisateur est bien retourné.
        expect(await screen.findByText('user@example.com')).toBeInTheDocument();
    });

    test('supprime un user au clique du bouton', async () => {
        global.fetch = jest.fn()
            // Premier appel pour simuler le renvoie d'une liste contenant un utilisateur.
            .mockImplementationOnce(() =>
                Promise.resolve({
                    json: () => Promise.resolve([{ id: 1, email: 'user@example.com' }]),
                })
            )
            // Deuxième appel pour simuler le renvoie d'une liste vide après la suppression de l'utilisateur.
            .mockImplementationOnce(() =>
                Promise.resolve({
                    json: () => Promise.resolve([]),
                })
            );

        // Retourne le composant en s'assurant que toutes les maj sont faites.
        await act(async () => {
            render(<Users />);
        });

        // Vérifie que l'email de l'utilisateur est bien retourné.
        expect(await screen.findByText('user@example.com')).toBeInTheDocument();

        // Simule un clic sur le bouton "Supprimer".
        await act(async () => {
            fireEvent.click(screen.getByText('Supprimer'));
        });

        // Vérifie que l'email de l'utilisateur n'est plus retourné dans le document.
        expect(screen.queryByText('user@example.com')).not.toBeInTheDocument();
    });
});
