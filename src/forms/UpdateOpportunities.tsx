import React from 'react';
import { useForm, Controller } from 'react-hook-form';

interface OpportunityFormValues {
  client: string;
  businessName: string;
  businessLine: string;
  description: string;
  estimatedValue: number;
  estimatedDate: string;
  status: string;
}

const OpportunityForm: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<OpportunityFormValues>();

  const onSubmit = (data: OpportunityFormValues) => {
    console.log(data);
  };

  return (
    <div className="m-2">
      <form className="flex flex-col mb-4 w-full max-w-lg mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <h1 className='font-bold text-2xl mb-4'>Update Opportunity</h1>
        <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
          <div className="flex-1">
            <label className="text-sm font-medium mt-2">Customer</label>
            <Controller
              name="client"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input {...field} id="client" readOnly className="mt-1 p-2 border rounded-md shadow-sm w-full" />
              )}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
          <div className="flex-1">
            <label className="text-sm font-medium mt-2">Business Name</label>
            <Controller
              name="businessName"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="businessName"
                  required
                  className="mt-1 p-2 border rounded-md shadow-sm w-full"
                />
              )}
            />
            {errors.businessName && <p className="text-red-500">{errors.businessName.message}</p>}
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
            <div className="flex-1">
                <label htmlFor="line" className="text-sm font-medium mt-2">Business Line</label>
                <Controller
                name="businessLine"
                control={control}
                render={({ field }) => (
                    <select
                    {...field}
                    id="status"
                    className="mt-1 p-2 border rounded-md shadow-sm w-full"
                    >
                    <option value="" disabled selected>Select a line</option>
                    <option value="outsoursing">Outsoursing Resources</option>
                    <option value="web">Web Development</option>
                    <option value="mobile">Mobile Development</option>
                    <option value= "consulting">IT Consulting</option>
                    </select>
                )}
                />
                {errors.businessLine && <p className="text-red-500">{errors.businessLine.message}</p>}
            </div>
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="description" className="text-sm font-medium mt-2">Description</label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <textarea {...field} id="description" required className="mt-1 p-2 border rounded-md shadow-sm w-full" />
            )}
          />
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
          <div className="flex-1">
            <label htmlFor="estimatedValue" className="text-sm font-medium mt-2">Estimated Value</label>
            <Controller
              name="estimatedValue"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  id="estimatedValue"
                  required
                  className="mt-1 p-2 border rounded-md shadow-sm w-full"
                />
              )}
            />
            {errors.estimatedValue && <p className="text-red-500">{errors.estimatedValue.message}</p>}
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
          <div className="flex-1">
            <label htmlFor="estimatedDate" className="text-sm font-medium mt-2">Estimated Date</label>
            <Controller
              name="estimatedDate"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="date"
                  id="estimatedDate"
                  required
                  className="mt-1 p-2 border rounded-md shadow-sm w-full"
                />
              )}
            />
            {errors.estimatedDate && <p className="text-red-500">{errors.estimatedDate.message}</p>}
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
            <div className="flex-1">
                <label htmlFor="status" className="text-sm font-medium mt-2">Status</label>
                <Controller
                name="status"
                defaultValue="open"
                control={control}
                render={({ field }) => (
                    <select
                    {...field}
                    id="status"
                    className="mt-1 p-2 border rounded-md shadow-sm w-full"
                    >
                    <option value="" disabled selected>Seleccione un estado</option>
                    <option value="open">Open</option>
                    <option value="review">Under Review</option>
                    <option value="purchase">Purchase Order</option>
                    <option value= "executed"> Executed</option>
                    </select>
                )}
                />
                {errors.status && <p className="text-red-500">{errors.status.message}</p>}
            </div>
        </div>
        <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded-md">Update Opportunity</button>
      </form>
    </div>
  );
};

export default OpportunityForm;
