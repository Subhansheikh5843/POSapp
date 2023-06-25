import HomePage from "./pages/HomePage";
import { Route,Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFount from "./pages/NotFount";
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import PrivateRoute from "./components/routes/PrivateRoute"
import PublicRoute from "./components/routes/PublicRoute";


function App() {
  return (
    <>
    <ToastContainer />
    <Routes>

    
      <Route path="/" element={
        <PublicRoute>
         <HomePage />
         </PublicRoute>
         
         }  />
      <Route path="/login" element={ 
     
        <PublicRoute>
         <Login />
         </PublicRoute>
         
      }  />
      <Route path="/register" element={

            <PublicRoute>
            <Register />
         </PublicRoute>

         } 
          />
      <Route path="/dashboard" element={
        <PrivateRoute>
      <Dashboard />
      </PrivateRoute> 
      }  />
      <Route path="*" element={ <NotFount />}  />
    </Routes>

    </>
  );
}

export default App;
