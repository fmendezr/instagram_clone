import React from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
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
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
