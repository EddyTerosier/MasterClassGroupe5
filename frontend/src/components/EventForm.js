import React, { useState, useEffect } from 'react';

function EventForm({ eventId, onSave }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dates, setDates] = useState(['']);
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [cancelled, setCancelled] = useState(false);
    const [reason, setReason] = useState('');

    useEffect(() => {
        if (eventId) {
            fetch(`/api/events/${eventId}`)
                .then(response => response.json())
                .then(data => {
                    setTitle(data.title);
                    setDescription(data.description);
                    setDates(data.dates || ['']);
                    setLocation(data.location);
                    setPrice(data.price);
                    setCancelled(data.cancelled);
                    setReason(data.reason);
                });
        }
    }, [eventId]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const payload = { title, description, dates, location, price, cancelled, reason };
        const method = eventId ? 'PUT' : 'POST';
        const url = eventId ? `/api/events/${eventId}` : '/api/events';

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

    const handleDateChange = (index, value) => {
        const newDates = dates.slice();
        newDates[index] = value;
        setDates(newDates);
    };

    const addDateField = () => {
        setDates([...dates, '']);
    };

    const removeDateField = (index) => {
        const newDates = dates.slice();
        newDates.splice(index, 1);
        setDates(newDates);
    };

    return (
        <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
            <div className="mb-3 col-md-4">
                <label htmlFor="title" className="form-label">Titre</label>
                <input id="title" type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div className="mb-3 col-md-4">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea id="description" className="form-control" value={description} onChange={e => setDescription(e.target.value)} required />
            </div>
            <div className="mb-3 col-md-4">
                <label className="form-label">Dates</label>
                {dates.map((date, index) => (
                    <div key={index} className="d-flex align-items-center">
                        <label htmlFor={`date-${index}`} className="visually-hidden">Date {index + 1}</label>
                        <input
                            id={`date-${index}`}
                            type="datetime-local"
                            className="form-control"
                            value={date}
                            onChange={e => handleDateChange(index, e.target.value)}
                            required
                        />
                        {dates.length > 1 && (
                            <button type="button" className="btn btn-danger btn-sm ms-2" onClick={() => removeDateField(index)}>
                                Supprimer
                            </button>
                        )}
                    </div>
                ))}
                <button type="button" className="btn btn-secondary btn-sm mt-2" onClick={addDateField}>
                    Ajouter une date
                </button>
            </div>
            <div className="mb-3 col-md-4">
                <label htmlFor="location" className="form-label">Lieu</label>
                <input id="location" type="text" className="form-control" value={location} onChange={e => setLocation(e.target.value)} required />
            </div>
            <div className="mb-3 col-md-4">
                <label htmlFor="price" className="form-label">Prix</label>
                <input id="price" type="number" className="form-control" value={price} onChange={e => setPrice(e.target.value)} required />
            </div>
            <div className="mb-3 col-md-4">
                <label htmlFor="cancelled" className="form-label">Annulé</label>
                <input id="cancelled" type="checkbox" className="form-check-input" checked={cancelled} onChange={e => setCancelled(e.target.checked)} />
            </div>
            {cancelled && (
                <div className="mb-3 col-md-4">
                    <label htmlFor="reason" className="form-label">Raison</label>
                    <textarea id="reason" className="form-control" value={reason} onChange={e => setReason(e.target.value)} required />
                </div>
            )}
            <button type="submit" className="btn btn-primary mb-2">Enregistrer</button>
        </form>
    );
}

export default EventForm;
