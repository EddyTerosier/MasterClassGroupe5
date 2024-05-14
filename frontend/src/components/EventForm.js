// src/components/EventForm.js
import React, { useState, useEffect } from 'react';

function EventForm({ eventId, onSave }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        if (eventId) {
            // Remplacer par la route vers l'API
            fetch(`/api/events/${eventId}`)
                .then(response => response.json())
                .then(data => {
                    setTitle(data.title);
                    setDescription(data.description);
                    setDate(data.date);
                    setLocation(data.location);
                    setPrice(data.price);
                });
        }
    }, [eventId]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const payload = { title, description, date, location, price };
        const method = eventId ? 'PUT' : 'POST';
        const url = eventId ? `/api/events/${eventId}` : '/api/events';

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
        <form onSubmit={handleSubmit} className={"d-flex flex-column align-items-center"}>
            <div className="mb-3 col-md-4">
                <label className="form-label">Titre</label>
                <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div className="mb-3 col-md-4">
                <label className="form-label">Description</label>
                <textarea className="form-control" value={description} onChange={e => setDescription(e.target.value)} required />
            </div>
            <div className="mb-3 col-md-4">
                <label className="form-label">Date</label>
                <input type="datetime-local" className="form-control" value={date} onChange={e => setDate(e.target.value)} required />
            </div>
            <div className="mb-3 col-md-4">
                <label className="form-label">Lieu</label>
                <input type="text" className="form-control" value={location} onChange={e => setLocation(e.target.value)} required />
            </div>
            <div className="mb-3 col-md-4">
                <label className="form-label">Prix</label>
                <input type="number" className="form-control" value={price} onChange={e => setPrice(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary mb-2">Enregistrer</button>
        </form>
    );
}

export default EventForm;
