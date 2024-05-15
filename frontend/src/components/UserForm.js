import React, { useState, useEffect } from 'react';

function UserForm({ userId, onSave }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [roles, setRoles] = useState('');

    useEffect(() => {
        if (userId) {
            fetch(`http://localhost:8000/users/${userId}`)
                .then(response => response.json())
                .then(data => {
                    setEmail(data.email);
                    setRoles(data.roles.join(', '));
                });
        }
    }, [userId]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const payload = { email, password, roles: roles.split(',').map(role => role.trim()) };
        const method = userId ? 'PUT' : 'POST';
        const url = userId ? `http://localhost:8000/users/${userId}` : 'http://localhost:8000/signup';

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
                <input id="password" type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="mb-3 col-md-4">
                <label htmlFor="roles" className="form-label">Rôles</label>
                <input id="roles" type="text" className="form-control" value={roles} onChange={e => setRoles(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary mb-2">Enregistrer</button>
        </form>
    );
}

export default UserForm;
