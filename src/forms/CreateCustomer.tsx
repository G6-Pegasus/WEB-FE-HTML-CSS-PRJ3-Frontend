import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useCreateCustomer } from '../hooks/useCreateCustomer';
import { Customer } from '../utils/types';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const countriesList = [
  { code: 'AR', name: 'Argentina' },
  { code: 'BR', name: 'Brazil' },
  { code: 'CO', name: 'Colombia' },
  { code: 'MX', name: 'Mexico' },
  { code: 'US', name: 'United States' },
  { code: 'CHN', name: 'China' },
];

const CreateClient: React.FC = () => {
  const { mutate: createCustomer, isSuccess, isError } = useCreateCustomer();
  const { register, handleSubmit, control, formState: { errors } } = useForm<Customer>();
  const { fields, append, remove } = useFieldArray({ control, name: 'contacts' });
  const navigate = useNavigate()
  
  const onSubmit = (customer: Customer) => {
    createCustomer(customer);
  };

  if (isSuccess) {
    Swal.fire("Created!", "Customer has been successfully created.", "success")
        .then(() => navigate("/customers"))
  }
  if (isError) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error creating customer. Please try again.",
    }).then(() => navigate("/customers"))
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 max-w-5xl mx-auto mt-8">
      <form className="flex flex-col space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-2xl font-bold text-slate-700">Create Client</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700">Client Name</label>
            <input
              {...register('name', { required: 'This field is mandatory' })}
              placeholder="Company Name"
              className="mt-1 p-3 border rounded-md shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">NIT</label>
            <input
              type="number"
              {...register("id", { required: "The NIT is mandatory" })}
              placeholder="Enter NIT"
              className="mt-1 p-3 border rounded-md shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.id && <p className="text-red-500 text-sm">{errors.id.message}</p>}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700">Address</label>
            <input
              placeholder="Company Address"
              {...register("address", { required: "The address is mandatory" })}
              className="mt-1 p-3 border rounded-md shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">City</label>
            <input
              {...register("city", { required: "The city is mandatory" })}
              placeholder="City"
              className="mt-1 p-3 border rounded-md shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700">Country</label>
            <select
              {...register("country", { required: "The country is mandatory" })}
              className="mt-1 p-3 border rounded-md shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a country</option>
              {countriesList.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              {...register("corporateEmail", {
                required: "The email is mandatory",
                validate: value => {
                  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  return regex.test(value) || "The email is not valid";
                }
              })}
              placeholder="Company Email"
              className="mt-1 p-3 border rounded-md shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.corporateEmail && <p className="text-red-500 text-sm">{errors.corporateEmail.message}</p>}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Phone</label>
          <input
            type="number"
            placeholder="Company Phone"
            {...register("phone", { required: "The phone is mandatory" })}
            className="mt-1 p-3 border rounded-md shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>

        <div className="flex items-center mt-4">
          <input type="checkbox" {...register("active")} className="mr-2 h-4 w-4 rounded focus:ring-blue-500" />
          <label className="text-sm text-gray-700">Is Active</label>
        </div>

        <h2 className="text-xl font-bold text-slate-700 mt-6">Add Contacts</h2>
        {fields.map((contact, index) => (
          <div key={contact.id} className="border border-gray-300 rounded-lg p-4 mt-4">
            <h3 className="font-semibold text-gray-700 mb-2">{index + 1}° Contact</h3>
            <div>
              <label className="text-sm font-medium text-gray-700">Name</label>
              <input
                {...register(`contacts.${index}.Cname`, { required: 'The contact name is mandatory' })}
                placeholder="Contact Name"
                className="mt-1 p-3 border rounded-md shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.contacts?.[index]?.Cname && <p className="text-red-500 text-sm">{errors.contacts[index].Cname.message}</p>}
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                {...register(`contacts.${index}.Cemail`, {
                  required: "The email is mandatory",
                  validate: value => {
                    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return regex.test(value) || "The email is not valid";
                  }
                })}
                placeholder="Contact Email"
                className="mt-1 p-3 border rounded-md shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.contacts?.[index]?.Cemail && <p className="text-red-500 text-sm">{errors.contacts[index].Cemail.message}</p>}
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium text-gray-700">Phone</label>
              <input
                type="number"
                {...register(`contacts.${index}.Cphone`, { required: 'The phone is mandatory' })}
                placeholder="Contact Phone"
                className="mt-1 p-3 border rounded-md shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.contacts?.[index]?.Cphone && <p className="text-red-500 text-sm">{errors.contacts[index].Cphone.message}</p>}
            </div>

            <button type="button" onClick={() => remove(index)} className="mt-4 bg-red-500 text-white px-3 py-2 rounded-md shadow-md hover:bg-red-600 transition">
              Delete Contact
            </button>
          </div>
        ))}
        
        <div className='flex flex-row justify-center items-center gap-5'>
            <button type="button" onClick={() => append({ Cname: '', Cemail: '', Cphone: '' })} 
              className="w-60 h-14 bg-blue-500 text-white px-3 py-2 rounded-md shadow-md hover:bg-blue-600 transition">
              + Add Another Contact
            </button>
            
            <button type="submit" className="w-60 h-14 bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition">
              Submit
            </button>
        </div>
      </form>
    </div>
  );
};

export default CreateClient;