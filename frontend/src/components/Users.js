// src/components/Users.js
import React, { useState, useEffect } from 'react';
import UserForm from './UserForm';

function Users() {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        // Remplacer par la route vers l'API
        fetch('/api/users')
            .then(response => response.json())
            .then(data => setUsers(data));
    }, []);

    const handleDelete = (id) => {
        // Remplacer par la route vers l'API
        fetch(`/api/users/${id}`, { method: 'DELETE' })
            .then(() => setUsers(users.filter(user => user.id !== id)));
    };

    const handleSave = (user) => {
        setSelectedUserId(null);
        // Sert à réactualiser la liste des utilisateurs
        fetch('/api/users')
            .then(response => response.json())
            .then(data => setUsers(data));
    };

    return (
        <div>
            <h2>Gestion des Utilisateurs</h2>
            <table className="table table-striped my-4">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.email}</td>
                        <td>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}>Supprimer</button>
                            <button className="btn btn-primary btn-sm" onClick={() => setSelectedUserId(user.id)}>Modifier</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <h3 className="text-center">{selectedUserId ? 'Modifier' : 'Ajouter'} un Utilisateur</h3>
            <UserForm userId={selectedUserId} onSave={handleSave} />
        </div>
    );
}

export default Users;
