import React, { useState } from 'react'
import InputForm from '../components/shared/InputForm'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import Spinner from '../components/shared/Spinner';
import {toast} from 'react-toastify'

function Login() {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  // hook

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const {loading} = useSelector(state => state.alerts)
    // ..form funcrion 

    const  handlesubmit = async(e)=>{
      e.preventDefault()
      try {
        dispatch(showLoading());
        const {data} = await axios.post('/api/v1/auth/login',{email,password})
        if (data.success) {
          dispatch(hideLoading())
          localStorage.setItem('token',data.token)
          toast.success('login Successfully')
          navigate('/dashboard')
        }
    
      } catch (error) {
        dispatch(hideLoading())
      toast.error("Invalid Credintial please try again")
        console.log(error)
      }
    }
  return (
    <>
      {loading ? (<Spinner />) : (<div className='form-container'>
      
      <form className='card p-2' onSubmit={handlesubmit}>
        <img src='/assets/logo.png' alt='logo' height={200} width={400}  />

        <InputForm htmlFor={email} labelText={'Email'} type={'email'} value={email} handleChange={(e)=> setEmail(e.target.value)}
        name="email" />
        <InputForm htmlFor={password} labelText={'Password'} type={'password'} value={password} handleChange={(e)=> setPassword(e.target.value)}
        name="password" />
    
        
    
         
         <div className='d-flex justify-content-between'>
          <p>Not a user <Link to="/register">Register Here</Link> </p>
          <button type="submit" className="btn btn-primary">Login</button>
         </div>
         
      </form>
        </div>)}
    </>
  )
}

export default Login
