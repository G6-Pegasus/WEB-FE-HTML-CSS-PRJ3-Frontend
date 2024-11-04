import React, { useState } from 'react';

interface Contact {
    name: string;
    email: string;
    phone: string;
}

const CreateClient : React.FC = () => {
  const [name, setName] = useState('');
  const [nit, setNit] = useState<number | ''>('');
  const [direction, setDirection] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState<number | ''>('');
  const [cEmail, setcEmail] = useState('');
  const [isDirty, setIsDirty] = useState(false);
  const [error, setError] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [numberError, setNumberError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([{ name: '', email: '', phone: '' }]);

  const handleBlur = () => {
    setIsDirty(true);
    if (!name) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (error && e.target.value) {
      setError(false);
    }
  };

  const handleChangeNit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || !isNaN(Number(value))) {
      setNit(value === '' ? '' : Number(value));
      setNumberError(false);
    } else {
      setNumberError(true);
    }
  };

  const handleChangeDirection = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDirection(e.target.value);
    if (error && e.target.value) {
      setError(false);
    }
  };

  const handleChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    if (error && e.target.value) {
      setError(false);
    }
  };

  const handleChangeCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
    if (error && e.target.value) {
      setError(false);
    }
  };

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || !isNaN(Number(value))) {
      setPhone(value === '' ? '' : Number(value));
      setNumberError(false);
    } else {
      setNumberError(true);
    }
  };

  const handleChangeCemail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setcEmail(value);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(a\.com|a\.edu\.co|a\.org\.co|dominio\.co)$/;
    if (emailRegex.test(value) || value === '') {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };

  const handleCheckboxChange = () => {
    setIsAccepted(!isAccepted);
  };

  const handleContactChange = (index: number, field: keyof Contact, value: string) => {
    const newContacts = [...contacts];
    newContacts[index][field] = value;
    setContacts(newContacts);
  };

  const addContact = () => {

    const lastContact = contacts[contacts.length - 1];
    if (lastContact.name && lastContact.email && lastContact.phone) {
      setContacts([...contacts, { name: '', email: '', phone: '' }]);
    } else {
      alert("Please complete all the fields of the previous contact before adding another one.");
    }
  };

  const removeContact = (index: number) => {
    if (index === 0) {
      alert("The first contact is mandatory and cannot be removed.")
      return
    }
    const newContacts = contacts.filter((_, i) => i !== index)
    setContacts(newContacts)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Name submitted: ${name}, Nit submitted: ${nit}, Direction submitted: ${direction}, City submitted: ${city}, Country submitted: ${country}, Phone submitted: ${phone}, Corporate email submitted: ${cEmail}, Is Active: ${isAccepted}, contact info: ${contacts}`);
  };

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
          placeholder="Name of the company"
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
          placeholder="Direction of the company"
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
          placeholder="Country of the company"
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
          placeholder="Enter the Corporate Email"
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
          placeholder="Phone of the company"
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

        <h1 className='font-bold text-2xl mt-4'>Contact info</h1>

        {contacts.map((contact, index) => (
          <div key={index} className="mt-4">
            <h2 className='font-bold'>{index + 1}° Contact</h2>
            <label className="text-sm font-medium mt-2">Contact Name</label>
            <input
              type="text"
              value={contact.name}
              onChange={(e) => handleContactChange(index, 'name', e.target.value)}
              placeholder="Name and Surname"
              className="mt-1 p-2 border rounded-md shadow-sm w-full"
              required
            />
            <label className="text-sm font-medium mt-2">Email</label>
            <input
              type="email"
              value={contact.email}
              onChange={(e) => handleContactChange(index, 'email', e.target.value)}
              placeholder="Contact Email"
              className="mt-1 p-2 border rounded-md shadow-sm w-full"
              required
            />
            <label className="text-sm font-medium mt-2">Phone</label>
            <input
              type="tel"
              value={contact.phone}
              onChange={(e) => handleContactChange(index, 'phone', e.target.value)}
              placeholder="Contact Phone"
              className="mt-1 p-2 border rounded-md shadow-sm w-full"
              required
            />
            {index !== 0 && (
              <button type="button" onClick={() => removeContact(index)} className="mt-2 p-2 bg-red-500 text-white rounded-md">
                Eliminar Contacto
              </button>
            )}
          </div>
        ))}
        
        <button type="button" onClick={addContact} className="mt-4 p-2 bg-blue-500 text-white rounded-md">
          Añadir otro contacto
        </button>

        <button type="submit" className="mt-6 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors">
          Create Client
        </button>
      </form>
    </div>
  );
};

export default CreateClient;
