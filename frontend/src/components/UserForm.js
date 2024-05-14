// src/components/UserForm.js
import React, { useState, useEffect } from 'react';

function UserForm({ userId, onSave }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (userId) {
            // Remplacer par la route vers l'API
            fetch(`/api/users/${userId}`)
                .then(response => response.json())
                .then(data => {
                    setEmail(data.email);
                });
        }
    }, [userId]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const payload = { email, password };
        const method = userId ? 'PUT' : 'POST';
        const url = userId ? `/api/users/${userId}` : '/api/users';

        // Remplacer par la route vers l'API
        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(response => response.json())
            .then(data => {
                onSave(data);
            });
    };

    return (
        <form onSubmit={handleSubmit} className="col-md-12 d-flex flex-column align-items-center">
            <div className="mb-3 col-md-4">
                <label htmlFor="email" className="form-label">Email</label>
                <input id="email" type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3 col-md-4">
                <label htmlFor="password" className="form-label">Mot de passe</label>
                <input id="password" type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary mb-2">Enregistrer</button>
        </form>
    );
}

export default UserForm;
