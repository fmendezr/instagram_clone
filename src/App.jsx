import React from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from "./components/Home";
import CurrentUserProfile from './components/CurrentUserProfile';
import Settings from './components/Settings';
import PrivateRoute from './privateRoute'; 
import { AuthProvider} from './contexts/AuthContext';
import { DBProvider } from './contexts/DBContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
        <DBProvider>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login/>} />
            <Route path='/' element={<PrivateRoute><Home/></PrivateRoute>}/>
            <Route path="/:displayName" element={<PrivateRoute><CurrentUserProfile/></PrivateRoute>}/>
            <Route path="/:displayName/settings" element={<PrivateRoute><Settings/></PrivateRoute>} />
          </Routes>
        </DBProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
