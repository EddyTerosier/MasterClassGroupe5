import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header"
import Login from "./Login";
import React, { useState } from 'react';

//import AdminDashboard from "./AdminDashboard"
//<Route path="Admin" element={<AdminDashboard />} />

export default function App() {
const [log, setLog] = useState(false);


  return (
    <BrowserRouter>
      <Routes>

      <Route path='/' element={<Header />}>

      <Route path="Login" element={<Login />} />

      </Route>
        </Routes>
    </BrowserRouter>

  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);