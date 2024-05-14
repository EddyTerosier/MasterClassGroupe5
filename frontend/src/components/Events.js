// src/components/Events.js
import React, { useState, useEffect } from 'react';
import EventForm from './EventForm';

function Events() {
    const [events, setEvents] = useState([]);
    const [selectedEventId, setSelectedEventId] = useState(null);

    useEffect(() => {
        // Remplacer par la route vers l'API
        fetch('/api/events')
            .then(response => response.json())
            .then(data => setEvents(data));
    }, []);

    const handleDelete = (id) => {
        // Remplacer par la route vers l'API
        fetch(`/api/events/${id}`, { method: 'DELETE' })
            .then(() => setEvents(events.filter(event => event.id !== id)));
    };

    const handleSave = (event) => {
        setSelectedEventId(null);
        // Sert à réactualiser la liste des événements
        fetch('/api/events')
            .then(response => response.json())
            .then(data => setEvents(data));
    };

    return (
        <div>
            <h2>Gestion des Événements</h2>
            <table className="table table-striped my-4">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Titre</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {events.map(event => (
                    <tr key={event.id}>
                        <td>{event.id}</td>
                        <td>{event.title}</td>
                        <td>{event.date}</td>
                        <td>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(event.id)}>Supprimer</button>
                            <button className="btn btn-primary btn-sm" onClick={() => setSelectedEventId(event.id)}>Modifier</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <h3 className={"text-center"}>{selectedEventId ? 'Modifier' : 'Ajouter'} un Événement</h3>
            <EventForm eventId={selectedEventId} onSave={handleSave} />
        </div>
    );
}

export default Events;
