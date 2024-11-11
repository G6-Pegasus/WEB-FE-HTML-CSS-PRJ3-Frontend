import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { bussinesLines , opportunitiesStatus } from '../utils/types';
import { useUpdateOpportunity} from '../hooks/useUpdateOpportunity';
import { getOpportunityByID } from '../services/opportunityServices';
import Swal from 'sweetalert2';

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
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<OpportunityFormValues>();
  const { opportunityId: opportunity_id } = useParams<{ opportunityId: string }>(); 
  const { mutate: updateOpportunity ,isSuccess, isError: isUpdateError } = useUpdateOpportunity();

  console.log("Id", opportunity_id);
  const allowedTransitions: { [key: string]: string[] } = {
    open: ["review"],
    review: ["purchase"],
    purchase: ["done"],
    done: [],
    "": ["open"], 
  }
  const handleStatusChange = (currentStatus: string, newStatus: string) => {
    return allowedTransitions[currentStatus]?.includes(newStatus);
  };
  useEffect(() => {
    const fetchOpportunityData = async () => {
      if (opportunity_id) {
        const opportunity = await getOpportunityByID(Number(opportunity_id));
        if (opportunity) {
          setValue("businessName", opportunity.businessName);
          setValue("businessLine", opportunity.businessLine);
          setValue("description", opportunity.description);
          setValue("estimatedValue", opportunity.estimatedBusinessValue);
          setValue("estimatedDate", opportunity.estimatedCompletionDate);
          setValue("status", opportunity.status);
          console.log(opportunity);
        }
      }
    };
    fetchOpportunityData();
  }, [opportunity_id, setValue]);


  const onSubmit = (data: OpportunityFormValues) => {
    updateOpportunity({
      id: opportunity_id || '',
      businessName: data.businessName,
      businessLine: data.businessLine as bussinesLines,
      description: data.description,
      status: data.status as opportunitiesStatus,
      customerId: Number(data.client), 
      estimatedBusinessValue:  data.estimatedValue, 
      estimatedCompletionDate: data.estimatedDate
    });
    if (isSuccess) {
      Swal.fire("Updated!", "", "success").then(() => {
      window.history.back();
      });
    }
    if (isUpdateError) Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something is wrong"
    });
  };

  return (
    <div className="m-2">
      <form className="flex flex-col mb-4 w-full max-w-lg mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <h1 className='font-bold text-2xl mb-4'>Update Opportunity</h1>
        <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
          <div className="flex-1">
            <label className="text-sm font-medium mt-2">Business Name</label>
            <Controller
              name="businessName"
              control={control}
              defaultValue=""
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
                  defaultValue=""
                  render={({ field }) => (
                    <select
                      {...field}
                      id="businessLine"
                      className="mt-1 p-2 border rounded-md shadow-sm w-full"
                    >
                      <option value="" disabled>Select a line</option>
                      <option value="outsourcing">Outsourcing Resources</option>
                      <option value="web">Web Development</option>
                      <option value="mobile">Mobile Development</option>
                      <option value="consulting">IT Consulting</option>
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
            defaultValue=""
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
              defaultValue={0}
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
              defaultValue=""
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
              control={control}
              defaultValue=""
              render={({ field }) => (
                <select
                  {...field}
                  id="status"
                  className="mt-1 p-2 border rounded-md shadow-sm w-full"
                  onChange={(e) => {
                    const newStatus = e.target.value;
                    const currentStatus = field.value;
                    if (handleStatusChange(currentStatus, newStatus)) {
                      field.onChange(newStatus)
                    } else {
                      Swal.fire("Transición no permitida", `No puedes cambiar el estado de ${currentStatus} a ${newStatus}.`, "error");
                    }
                  }}
                >
                  <option value="" disabled>Select status</option>
                  <option value="open">Open</option>
                  <option value="review">Under Review</option>
                  <option value="purchase">Purchase Order</option>
                  <option value="done">Done</option>
                </select>
              )}
            />
            {errors.status && <p className="text-red-500">{errors.status.message}</p>}
          </div>
        </div>
        <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded-md">Update Opportunity</button>
      </form>
    </div>
  )
}

export default OpportunityForm