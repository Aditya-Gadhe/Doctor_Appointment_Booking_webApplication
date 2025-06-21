import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [state,setState] = useState("Sign Up")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [name,setName] = useState("")
  const [loading, setLoading] = useState(false)

  const [city, setCity] = useState('');
  const [allCities, setAllCities] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
  const fetchCities = async () => {
    try {
      const res = await fetch('https://countriesnow.space/api/v0.1/countries/cities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ country: 'India' }),
      });
      const data = await res.json();
      setAllCities(data.data);
    } catch (err) {
      console.error('City fetch error:', err);
    }
  };

  if (state === 'Sign Up') {
      fetchCities();
    }
  }, [state]);

  const handleCityChange = (e) => {
  const input = e.target.value;
  setCity(input);
  if (input.length === 0) {
    setSuggestions([]);
    return;
  }
  const filtered = allCities.filter(c =>
    c.toLowerCase().startsWith(input.toLowerCase())
  );
  setSuggestions(filtered.slice(0, 5)); // limit to 5
  };

  const handleSelectCity = (selectedCity) => {
    setCity(selectedCity);
    setSuggestions([]);
  };



  const navigate = useNavigate()
  
  const {backendURL , token , setToken} = useContext(AppContext)

  const onSubmitHandler = async (event)=>{
    event.preventDefault()
    setLoading(true)  // Start loading
    try {
      if(state === 'Sign Up') {
        const {data} = await axios.post(backendURL + '/api/user/register' , {name,password,email,city})
        if(data.success) {
          localStorage.setItem('token',data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      } else {
          const {data} = await axios.post(backendURL + '/api/user/login' , {password,email})
          if(data.success) {
            localStorage.setItem('token',data.token)
            setToken(data.token)
            
          } else {
            toast.error(data.message)
          }
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)  // End loading
    }
  }

  useEffect(()=>{
    if(token)
    {
      navigate('/')
    }
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
          <p className='text-2xl font-semibold'>{state==='Sign Up' ? 'Create Account' : 'Login'}</p>
          <p>Please {state==='Sign Up' ? 'sign up' : 'login'} to book appointment</p>
          {
            state === 'Sign Up' &&
            <div className='w-full'>
                <p>Full Name</p>
                <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" name="" id="" onChange={(e)=> setName(e.target.value)} value={name} required/>
            </div>
          }
          
          <div className='w-full'>
            <p>Email</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" name="" id="" onChange={(e)=> setEmail(e.target.value)} value={email} required/>
          </div>

          {
            state === 'Sign Up' &&
            <div className='w-full relative'>
              <p>City</p>
              <input
                className='border border-zinc-300 rounded w-full p-2 mt-1'
                type='text'
                value={city}
                onChange={handleCityChange}
                placeholder='Enter your city'
                required
              />
              {suggestions.length > 0 && (
                <ul className='absolute bg-white border w-full rounded mt-1 z-10 shadow-md max-h-40 overflow-y-auto'>
                  {suggestions.map((c, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelectCity(c)}
                      className='p-2 cursor-pointer hover:bg-blue-100'
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          }

          <div className='w-full'>  
            <p>Password</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" name="" id="" onChange={(e)=> setPassword(e.target.value)} value={password} required/>
          </div>
          <button
              type='submit'
              disabled={loading}
              className={`w-full py-2 rounded-medium text-base transition-all ${loading ? 'bg-primary text-white opacity-70 cursor-not-allowed' : 'bg-primary text-white hover:opacity-90'}`}
          >
            {loading ? 'Please wait...' : state === 'Sign Up' ? 'Create Account' : 'Login'}
          </button>
          {
            state === 'Sign Up' 
            ? <p>Already have an account? <span onClick={()=> setState('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>
            : <p>Create an new account? <span onClick={()=> setState('Sign Up')} className='text-primary underline cursor-pointer'>click here</span></p>
          }
          
      </div>
    </form>
    
  )
}

export default Login