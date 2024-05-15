// src/components/Events.js
import React, { useState, useEffect } from 'react';
import EventForm from './EventForm';

function Events() {
    const [events, setEvents] = useState([]);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [showCancelForm, setShowCancelForm] = useState(false);
    const [cancelReason, setCancelReason] = useState('');
    const [eventToCancel, setEventToCancel] = useState(null);

    useEffect(() => {
        fetch('/api/events')
            .then(response => response.json())
            .then(data => {
                const eventsWithDates = data.map(event => ({
                    ...event,
                    dates: event.dates || [],  // Assurez-vous que dates est toujours un tableau
                }));
                setEvents(eventsWithDates);
            });
    }, []);

    const handleDelete = (id) => {
        fetch(`/api/events/${id}`, { method: 'DELETE' })
            .then(() => setEvents(events.filter(event => event.id !== id)));
    };

    const handleSave = (event) => {
        setSelectedEventId(null);
        fetch('/api/events')
            .then(response => response.json())
            .then(data => {
                const eventsWithDates = data.map(event => ({
                    ...event,
                    dates: event.dates || [],
                }));
                setEvents(eventsWithDates);
            });
    };

    const handleCancel = (id) => {
        setEventToCancel(id);
        setShowCancelForm(true);
    };

    const submitCancelForm = () => {
        fetch(`/api/events/${eventToCancel}/cancel`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ reason: cancelReason }),
        })
            .then(response => response.json())
            .then(data => {
                setEvents(events.map(event => (event.id === eventToCancel ? data : event)));
                setShowCancelForm(false);
                setCancelReason('');
                setEventToCancel(null);
            });
    };

    return (
        <div>
            <h2>Gestion des Événements</h2>
            <table className="table table-striped my-4">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Titre</th>
                    <th>Dates</th>
                    <th>Annulé</th>
                    <th>Raison</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {events.map(event => (
                    <tr key={event.id}>
                        <td>{event.id}</td>
                        <td>{event.title}</td>
                        <td>{event.dates.join(', ')}</td>
                        <td>{event.cancelled ? 'Oui' : 'Non'}</td>
                        <td>{event.reason}</td>
                        <td>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(event.id)}>Supprimer</button>
                            <button className="btn btn-primary btn-sm" onClick={() => setSelectedEventId(event.id)}>Modifier</button>
                            <button className="btn btn-warning btn-sm" onClick={() => handleCancel(event.id)}>Annuler</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <h3 className="text-center">{selectedEventId ? 'Modifier' : 'Ajouter'} un Événement</h3>
            <EventForm eventId={selectedEventId} onSave={handleSave} />
            {showCancelForm && (
                <div>
                    <h4>Annuler l'Événement</h4>
                    <div className="mb-3 col-md-4">
                        <label htmlFor="cancelReason" className="form-label">Raison de l'annulation</label>
                        <textarea
                            id="cancelReason"
                            className="form-control"
                            value={cancelReason}
                            onChange={e => setCancelReason(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={submitCancelForm}>Annuler l'Événement</button>
                </div>
            )}
        </div>
    );
}

export default Events;
