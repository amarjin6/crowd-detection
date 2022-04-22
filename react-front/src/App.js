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
      <div className='container'>
        <Header />
        <Routes>
          <Route path={'/'} exact element={<Home />} />
          <Route path={'/about'} element={<About />} />
          <Route path={'/sign-in'} element={<Auth />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
