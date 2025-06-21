import React, { useContext, useId, useState , useEffect} from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [experience, setExperience] = useState("1 Year")
  const [fees, setFees] = useState("")
  const [about, setAbout] = useState("")
  const [speciality, setSpeciality] = useState("General Physician")
  const [degree, setDegree] = useState("")
  const [address, setAddress] = useState("")
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  {/* logic for city suggestion */}
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
  fetchCities();
  }, []);

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

  const { backendURL, aToken } = useContext(AdminContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!docImg) return toast.error("Image Not Selected")
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', Number(fees))
      formData.append('about', about)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append('address', address)
      formData.append('city', city)

      const { data } = await axios.post(backendURL + '/api/admin/add-doctor', formData, {
        headers: { aToken }
      })

      if (data.success) {
        toast.success(data.message)
        setDocImg(false)
        setName("")
        setEmail("")
        setPassword("")
        setAbout("")
        setAddress("")
        setCity("")
        setDegree("")
        setFees("")
        setDone(true)
        setTimeout(() => setDone(false), 2000)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
      <p className='mb-3 text-lg font-medium'>Add Doctor</p>
      <fieldset disabled={loading} className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll disabled:opacity-50">
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor="docImage">
            <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="docImage" hidden />
          <p>Upload doctor <br /> picture</p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor name</p>
              <input onChange={(e) => setName(e.target.value)} value={name} className='border rounded px-3 py-2' type="text" placeholder='Name' required />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Email</p>
              <input onChange={(e) => setEmail(e.target.value)} value={email} className='border rounded px-3 py-2' type="email" placeholder='Email' required />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Password</p>
              <input onChange={(e) => setPassword(e.target.value)} value={password} className='border rounded px-3 py-2' type="password" placeholder='Password' required />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Experience</p>
              <select onChange={(e) => setExperience(e.target.value)} value={experience} id={useId()}>
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={`${i + 1} Year`}>{i + 1} Year</option>
                ))}
              </select>
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Fees</p>
              <input onChange={(e) => setFees(e.target.value)} value={fees} className='border rounded px-3 py-2' type="number" placeholder='Fees' required />
            </div>
          </div>

          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Speciality</p>
              <select onChange={(e) => setSpeciality(e.target.value)} value={speciality}>
                <option value="General Physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
                <option value="Cardiologist">Cardiologist</option>
              </select>
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Education</p>
              <input onChange={(e) => setDegree(e.target.value)} value={degree} className='border rounded px-3 py-2' type="text" placeholder='Education' required />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Address</p>
              <input onChange={(e) => setAddress(e.target.value)} value={address} className='border rounded px-3 py-2' type="text" placeholder='Address' required />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
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
          </div>
        </div>

        <div>
          <p className='mt-4 mb-2'>About Doctor</p>
          <textarea onChange={(e) => setAbout(e.target.value)} value={about} className='w-full px-2 pt-2 border rounded' placeholder='Write about doctor' rows={5} />
        </div>

        <button
            type='submit'
            className='bg-primary px-10 py-3 mt-4 text-white rounded-full flex items-center justify-center gap-2 disabled:opacity-50'
            disabled={loading}
            >
            {loading ? (
              <>
                <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Adding...</span>
              </>
            ) : (
              "Add doctor"
            )}
        </button>

      </fieldset>
    </form>
  )
}

export default AddDoctor
