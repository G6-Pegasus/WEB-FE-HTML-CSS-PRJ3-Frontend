import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useCreateCustomer } from '../hooks/useCreateCustomer';
import { Customer } from '../utils/types';
import Swal from 'sweetalert2'

const countriesList = [
  {code: 'AR', name: 'Argentina' },
  {code: 'BR', name: 'Brazil' },
  {code: 'CO', name: 'Colombia' },
  {code: 'MX', name: 'Mexico' },
  {code: 'US', name: 'United States' },
  {code: 'CHN', name: 'China'},
]

const CreateClient: React.FC = () => {
  const { mutate: createCustomer, isSuccess, isError } = useCreateCustomer()
  const { register, handleSubmit, control, formState: { errors } } = useForm<Customer>()
  const { fields, append, remove } = useFieldArray({ control, name: 'contacts' })
  const onSubmit = (customer: Customer) => {
      createCustomer({ ...customer, id: crypto.randomUUID() })
      if(isSuccess) Swal.fire("Updated!", "", "success");
      if (isError) Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error creating customer"
      });
  }
  
  return (
    <div className='m-2'>
      <form className="flex flex-col mb-4 w-full max-w-2xl mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <h1 className='font-bold text-2xl'>Create Client</h1>

        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1">
            <label className="text-sm font-medium mt-2">Client Name</label>
            <input
              {...register('name', { required: 'This field is mandatory' })}
              placeholder="Company Name"
              className="mt-1 p-2 border rounded-md shadow-sm w-full"
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium mt-2">NIT</label>
            <input
              type="number"
              {...register("nit", { required: "The NIT is mandatory" })}
              className="mt-1 p-2 border rounded-md shadow-sm w-full"
            />
            {errors.nit && <p className="text-red-500">{errors.nit.message}</p>}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-4 mt-4">
          <div className="flex-1">
            <label className="text-sm font-medium mt-2">Direction</label>
            <input
              placeholder="Company direction"
              {...register("address", { required: "The direction is mandatory" })}
              className="mt-1 p-2 border rounded-md shadow-sm w-full"
            />
            {errors.address && <p className="text-red-500">{errors.address.message}</p>}
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium mt-2">City</label>
            <input
              {...register("city", { required: "The city is mandatory" })}
              className="mt-1 p-2 border rounded-md shadow-sm w-full"
            />
            {errors.city && <p className="text-red-500">{errors.city.message}</p>}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-4 mt-4">
          <div className="flex-1">
          <label className="text-sm font-medium mt-2">Country</label>
          <select
            {...register("country", { required: "The country is mandatory" })}
            className="mt-1 p-2 border rounded-md shadow-sm w-full"
          >
            <option value="">Select a country</option> 
            {countriesList.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
          {errors.country && <p className="text-red-500">{errors.country.message}</p>}
          </div>

          <div className="flex-1">
            <label className="text-sm font-medium mt-2">Email</label>
            <input
              {...register("corporateEmail", { required: "The email is mandatory",
                validate: value => {
                  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  return regex.test(value) || "The email is not valid";
                } })}
              className="mt-1 p-2 border rounded-md shadow-sm w-full"
              placeholder="Enter the company email"
            />
            {errors.corporateEmail && <p className="text-red-500">{errors.corporateEmail.message}</p>}
          </div>
        </div>

        <div className="flex-1 mt-4">
          <label className="text-sm font-medium mt-2">Phone</label>
          <input
            type="number"
            placeholder="Company phone"
            {...register("phone", { required: "The phone is mandatory" })}
            className="mt-1 p-2 border rounded-md shadow-sm w-full"
          />
          {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
        </div>

        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            {...register("active")}
            className="mr-2"
          />
          <label className="text-sm text-gray-700">Is Active</label>
        </div>

        <h1 className='font-bold text-2xl mt-4'>Add Contact</h1>
        {fields.map((contact, index) => (
          <div key={contact.id} className="mt-4">
            <h2 className='font-bold'>{index + 1}° Contact</h2>
            <label className="text-sm font-medium mt-2"> Name</label>
            <input
              {...register(`contacts.${index}.Cname`, { required: 'The contact name is mandatory' })}
              placeholder="Contact Name and Surname"
              className="mt-1 p-2 border rounded-md shadow-sm w-full"
            />
            {errors.contacts?.[index]?.Cname && <p className="text-red-500">{errors.contacts[index].Cname.message}</p>}

            <label className="text-sm font-medium mt-2"> Email</label>
            <input
              {...register(`contacts.${index}.Cemail`, { 
                required: "The email is mandatory",
                validate: value => {
                  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                  return regex.test(value) || "The email is not valid"
                }
              })}
              placeholder="Contact Email"
              className={`mt-1 p-2 border rounded-md shadow-sm w-full ${errors.contacts?.[index]?.Cemail ? 'border-red-500' : ''}`}
            />
            {errors.contacts?.[index]?.Cemail && (
              <p className="text-red-500">{errors.contacts[index].Cemail.message}</p>
            )}

            <label className="text-sm font-medium mt-2"> Phone</label>
            <input
              type="number"
              {...register(`contacts.${index}.Cphone`, { required: 'The phone is mandatory' })}
              placeholder="Contact phone"
              className="mt-1 p-2 border rounded-md shadow-sm w-full"
            />
            {errors.contacts?.[index]?.Cphone && <p className="text-red-500">{errors.contacts[index].Cphone.message}</p>}

            {fields.length > 1 && (
              <button type="button" onClick={() => remove(index)} className="mt-2 p-2 bg-red-500 text-white rounded-md">
                Delete Contact
              </button>
            )}
          </div>
        ))}
        {fields.length === 0 && <p className="text-red-500">You must add at least one contact.</p>}
        <button
          type="button"
          onClick={() => append({ Cname: '', Cemail: '', Cphone: '' })}
          className="mt-4 p-2 bg-blue-500 text-white rounded-md"
        >
          + Add other contact
        </button>
        <button type="submit" className="mt-4 p-2 bg-green-500 text-white rounded-md">
          Send
        </button>
      </form>
      {isSuccess && <p className="text-green-500">Client created successfully!</p>}
      {isError && <p className="text-red-500">Error creating client. Please try again.</p>}
    </div>
  )
}

export default CreateClient;