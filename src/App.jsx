import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import Header from './components/layout/header/Header';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import TokenPage from './pages/TokenPage';
import Footer from './components/layout/footer/Footer';
function App() {
  const addEventOnElem = function (elem, type, callback) {
    if (elem.length > 1) {
      for (let i = 0; i < elem.length; i++) {
        elem[i].addEventListener(type, callback);
      }
    } else {
      elem.addEventListener(type, callback);
    }
  };

  useEffect(() => {
    const sections = document.querySelectorAll('[data-section]');
    const scrollReveal = function () {
      for (let i = 0; i < sections.length; i++) {
        if (
          sections[i].getBoundingClientRect().top <
          window.innerHeight / 1.5
        ) {
          sections[i].classList.add('active');
        } else {
          sections[i].classList.remove('active');
        }
      }
    };
    scrollReveal();

    addEventOnElem(window, 'scroll', scrollReveal);
  });

  const Layout = () => {
    return (
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    );
  };
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
      ],
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
