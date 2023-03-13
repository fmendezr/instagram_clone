import React from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from "./components/Home";
import PrivateRoute from './privateRoute'; 
import { AuthProvider} from './contexts/AuthContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login/>} />
            <Route path='/' element={<PrivateRoute><Home/></PrivateRoute>}/>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
