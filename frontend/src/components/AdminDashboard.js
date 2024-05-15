// src/components/AdminDashboard.js
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Users from './Users';
import Events from './Events';
import Tickets from './Tickets';

function AdminDashboard() {
    return (
        <div className="container mt-5">
            <Link className="nav-link" to="/admin">
                <h1 className="mb-4">Admin Dashboard</h1>
            </Link>
            <nav className="mb-4">
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/users">Gestion des Utilisateurs</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/events">Gestion des Événements</Link>
                    </li>
                  
                </ul>
            </nav>
            <Routes>
                <Route path="users" element={<Users />} />
                <Route path="events" element={<Events />} />
                <Route path="tickets" element={<Tickets />} />
            </Routes>
        </div>
    );
}

export default AdminDashboard;
