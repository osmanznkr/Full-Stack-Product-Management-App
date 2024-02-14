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
import Profile from './pages/Profile';
import Admin from './pages/Admin';

const PrivateRoutes = () => {
  const authState = useAppSelector((state: RootState) => state.auth)
  const adminState = useAppSelector((state: RootState) => state.auth.isAdmin)
  console.log('admındstatsd', adminState)

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
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/products" element={<Homepage />} />
          <Route path="/admin" element={<Admin />} />
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
