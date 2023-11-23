import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ErrorPage } from './ErrorPage.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import { LicensePage } from './LicensePage.tsx';
import { LoaderCircularDot } from './loaders/LoaderCircularDot.tsx';
import { Header } from './UI/Header.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' errorElement={<ErrorPage />} element={<App />} />
        <Route path='/license' element={<LicensePage />} />
        <Route path='/loader1' element={<LoaderCircularDot />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
