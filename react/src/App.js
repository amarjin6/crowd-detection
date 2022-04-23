import './App.css';
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { About } from './pages/About';
import { Home } from './pages/Home';
import { Auth } from './pages/Auth';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

function App() {
  return (
    <BrowserRouter>
        <Header />
        <Routes>
          <Route path={'/crowd-detection/'} exact element={<Home />} />
          <Route path={'/crowd-detection/about'} element={<About />} />
          <Route path={'/crowd-detection/sign-in'} element={<Auth />} />
        </Routes>
        <Footer />
    </BrowserRouter>
  );
}

export default App;
