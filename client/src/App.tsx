import React from 'react';
import Register from './pages/Register';
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Login from './pages/Login';
import Products from './pages/Products';
import Homepage from './pages/Homepage';
import { useAppSelector } from './redux/hooks';
import { RootState } from './redux/store';

const PrivateRoutes = () => {
  const authState = useAppSelector((state: RootState) => state.auth)

  return <>{authState.isAuth ? <Outlet /> : <Navigate to='/login' />}</>
}

const RestrictedRoute = () => {
  const authState = useAppSelector((state: RootState) => state.auth)


  return <>{!authState.isAuth ? <Outlet /> : <Navigate to='/' />}</>
}

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/products" element={<Products />} />
        </Route>
        <Route element={<RestrictedRoute />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
