import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ErrorPage } from './ErrorPage.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import { AboutPage } from './AboutPage.tsx';
import { Header } from './UI/Header.tsx';
import { NotificationComponent } from './components/Notification.tsx';
import { Analytics } from '@vercel/analytics/react';
import { LoaderDotLinear } from './loaders/LoaderDotLinear.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/loaderdotlinear' element={LoaderDotLinear.component} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      <NotificationComponent />
      <Analytics />
    </BrowserRouter>
  </React.StrictMode>
);
