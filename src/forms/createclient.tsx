import React, { useState } from 'react';

const CreateClient = () => {
  const [name, setName] = useState('')
  const [nit, setNit] = useState<number | ''>('')
  const [direction, setDirection] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [phone, setPhone] = useState<number | ''>('')
  const [cEmail, setcEmail] = useState('')
  const [isDirty, setIsDirty] = useState(false)
  const [error, setError] = useState(false)
  const [isAccepted, setIsAccepted] = useState(false)
  const [numberError, setNumberError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [Eemail, setEemail] = useState('')
  const [Ename, setEname] = useState('')
  const [Ephone, setEphone] = useState<number | ''>('')

  const handleBlur = () => {
    setIsDirty(true)
    if (!name) {
      setError(true)
    } else {
      setError(false)
    }
  }

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    if (error && e.target.value) {
      setError(false)
    }
  }

  const handleChangeNit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '' || !isNaN(Number(value))) {
      setNit(value === '' ? '' : Number(value))
      setNumberError(false)
    } else {
      setNumberError(true)
    }
  }

  const handleChangeDirection = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDirection(e.target.value)
    if (error && e.target.value) {
      setError(false)
    }
  }

  const handleChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value)
    if (error && e.target.value) {
      setError(false)
    }
  }

  const handleChangeCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value)
    if (error && e.target.value) {
      setError(false)
    }
  }

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '' || !isNaN(Number(value))) {
      setPhone(value === '' ? '' : Number(value))
      setNumberError(false)
    } else {
      setNumberError(true)
    }
  }

  const handleChangeCemail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setcEmail(value)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(a\.com|a\.edu\.co|a\.org\.co|dominio\.co)$/
    if (emailRegex.test(value) || value === '') {
      setEmailError(false)
    } else {
      setEmailError(true)
    }
  }

  const handleCheckboxChange = () => {
    setIsAccepted(!isAccepted)
  }

  const handleChangeEname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEname(e.target.value)
    if (error && e.target.value) {
      setError(false)
    }
  }

  const handleChangeEemail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEemail(value)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(a\.com|a\.edu\.co|a\.org\.co|dominio\.co)$/
    if (emailRegex.test(value) || value === '') {
      setEmailError(false)
    } else {
      setEmailError(true)
    }
  }

  const handleChangeEphone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '' || !isNaN(Number(value))) {
      setEphone(value === '' ? '' : Number(value))
      setNumberError(false)
    } else {
      setNumberError(true)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Name submitted: ${name}, Nit submitted: ${nit}, Direction submitted: ${direction}, City submitted: ${city}, Country submitted: ${country}, Phone submitted: ${phone}, Corporate email submitted: ${cEmail}, Is Active: ${isAccepted}`);
  }

  return (
    <div className='m-2'>
      <form className="flex flex-col mb-4 w-full max-w-xs mx-auto" onSubmit={handleSubmit}>
        <h1 className='font-bold text-2xl'>Create Client</h1>

        <label className={`text-sm font-medium ${error ? 'text-red-500' : 'text-gray-700'}`}>
          Name {error ? '*' : ''}
        </label>
        <input
          type="text"
          value={name}
          onChange={handleChangeName}
          onBlur={handleBlur}
          placeholder="Write the name of the company"
          className={`mt-1 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
            error ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500'
          } w-full`}
          required
        />
        {error && isDirty && <p className="text-red-500 text-xs mt-1">This field is required.</p>}

        <label className="text-sm font-medium text-gray-700 mt-4">Nit</label>
        <input
          value={nit}
          onChange={handleChangeNit}
          placeholder="Enter the Nit"
          className={`mt-1 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500 w-full ${
            numberError ? 'border-red-500' : ''
          }`}
          required
        />
        {numberError && <p className="text-red-500 text-xs mt-1">Only numbers are allowed.</p>}

        <label className={`text-sm font-medium ${error ? 'text-red-500' : 'text-gray-700'}`}>
          Direction {error ? '*' : ''}
        </label>
        <input
          type="text"
          value={direction}
          onChange={handleChangeDirection}
          onBlur={handleBlur}
          placeholder="Write the direction of the company"
          className={`mt-1 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
            error ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500'
          } w-full`}
          required
        />
        {error && isDirty && <p className="text-red-500 text-xs mt-1">This field is required.</p>}

        <label className={`text-sm font-medium mt-4 ${error ? 'text-red-500' : 'text-gray-700'}`}>
          City {error ? '*' : ''}
        </label>
        <input
          type="text"
          value={city}
          onChange={handleChangeCity}
          onBlur={handleBlur}
          placeholder="City where is located"
          className={`mt-1 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
            error ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500'
          } w-full`}
          required
        />
        {error && isDirty && <p className="text-red-500 text-xs mt-1">This field is required.</p>}

        <label className={`text-sm font-medium mt-4 ${error ? 'text-red-500' : 'text-gray-700'}`}>
          Country {error ? '*' : ''}
        </label>
        <input
          type="text"
          value={country}
          onChange={handleChangeCountry}
          onBlur={handleBlur}
          placeholder="Country where is located"
          className={`mt-1 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
            error ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500'
          } w-full`}
          required
        />
        {error && isDirty && <p className="text-red-500 text-xs mt-1">This field is required.</p>}

        <label className={`text-sm font-medium ${emailError ? 'text-red-500' : 'text-gray-700'} mt-4`}>
          Email {emailError ? '*' : ''}
        </label>
        <input
          type="text"
          value={cEmail}
          onChange={handleChangeCemail}
          onBlur={() => setIsDirty(true)}
          placeholder="Write the Corporate Email"
          className={`mt-1 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500 w-full ${
            emailError ? 'border-red-500' : ''
          }`}
          required
        />
        {emailError && <p className="text-red-500 text-xs mt-1">Email must be from a valid domain.</p>}

        <label className="text-sm font-medium text-gray-700 mt-4">Phone</label>
        <input
          value={phone}
          onChange={handleChangePhone}
          placeholder="Enter the phone of the company"
          className={`mt-1 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500 w-full ${
            numberError ? 'border-red-500' : ''
          }`}
          required
        />
        {numberError && <p className="text-red-500 text-xs mt-1">Only numbers are allowed.</p>}
        
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            className="mr-2"
            checked={isAccepted}
            onChange={handleCheckboxChange}
          />
          <label className="text-sm text-gray-700">Is Active</label>
        </div>
        
        <h1 className='font-bold text-2xl'>Add contact</h1>

        <label className={`text-sm font-medium ${error ? 'text-red-500' : 'text-gray-700'}`}>
        Contact Name {error ? '*' : ''}
        </label>
        <input
        type="text"
        value={Ename}
        onChange={handleChangeEname}
        onBlur={handleBlur}
        placeholder="Write the name of the company"
        className={`mt-1 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
            error ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500'
        } w-full`}
        required
        />
        {error && isDirty && <p className="text-red-500 text-xs mt-1">This field is required.</p>}

        <label className={`text-sm font-medium ${emailError ? 'text-red-500' : 'text-gray-700'} mt-4`}>
        Contact Email {emailError ? '*' : ''}
        </label>
        <input
        type="text"
        value={Eemail}
        onChange={handleChangeEemail}
        onBlur={() => setIsDirty(true)}
        placeholder="Write the Corporate Email"
        className={`mt-1 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
            emailError ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500'
        } w-full`}
        required
        />
        {emailError && <p className="text-red-500 text-xs mt-1">Invalid email format.</p>}

        <label className="text-sm font-medium text-gray-700 mt-4">Phone</label>
        <input
        value={Ephone}
        onChange={handleChangeEphone}
        placeholder="Enter the phone of the company"
        className={`mt-1 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500 w-full ${
            numberError ? 'border-red-500' : ''
        }`}
        required
        />
        {numberError && <p className="text-red-500 text-xs mt-1">Only numbers are allowed.</p>}

        <button type="submit" className="mt-6 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors">
          Create Client
        </button>
      </form>
    </div>
  )
}

export default CreateClient;