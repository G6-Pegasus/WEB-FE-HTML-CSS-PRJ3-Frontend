import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { bussinesLines , opportunitiesStatus } from '../utils/types';
import { useUpdateOpportunity} from '../hooks/useUpdateOpportunity';
import { getOpportunityDetails } from '../services/opportunityServices';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

interface OpportunityFormValues {
  client: string
  businessName: string
  businessLine: string
  description: string
  estimatedValue: number
  estimatedDate: string
  status: string
}

const OpportunityForm = ({ onCancel } : { onCancel: () => void }) => {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<OpportunityFormValues>()
  const { opportunityId: opportunity_id } = useParams<{ opportunityId: string }>()
  const { mutate: updateOpportunity ,isSuccess, isError: isUpdateError } = useUpdateOpportunity()
  const navigate = useNavigate()

  const allowedTransitions: { [key: string]: string[] } = {
    "Opening": ["Under study"],
    "Under study": ["Purchase order"],
    "Purchase order": ["Executed"],
    "Executed": [],
    "": ["Opening"], 
  }
  const handleStatusChange = (currentStatus: string, newStatus: string) => {
    return allowedTransitions[currentStatus]?.includes(newStatus)
  }
  useEffect(() => {
    const fetchOpportunityData = async () => {
      if (opportunity_id) {
        const opportunity = await getOpportunityDetails(opportunity_id)
        if (opportunity) {
          setValue("businessName", opportunity.businessName)
          setValue("businessLine", opportunity.businessLine)
          setValue("description", opportunity.description)
          setValue("estimatedValue", opportunity.estimatedBusinessValue)
          setValue("estimatedDate", opportunity.estimatedCompletionDate)
          setValue("status", opportunity.status)
        }
      }
    }
    fetchOpportunityData()
  }, [opportunity_id, setValue])


  const onSubmit = (data: OpportunityFormValues) => {
    updateOpportunity({
      id: opportunity_id || '',
      data: {
        businessName: data.businessName,
        businessLine: data.businessLine as bussinesLines,
        description: data.description,
        status: data.status as opportunitiesStatus, 
        estimatedBusinessValue:  data.estimatedValue, 
        estimatedCompletionDate: data.estimatedDate
      }
    })
    if (isSuccess) {
      Swal.fire("Updated!", "", "success").then(() => navigate("/opportunities"))
    }
    if (isUpdateError) Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something is wrong"
    })
  }

  return <div className="container mx-auto p-6 max-w-lg bg-white shadow-lg rounded-lg">
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
                      <option value="Outsourcing Resources">Outsourcing Resources</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Mobile Development">Mobile Development</option>
                      <option value="IT Consulting">IT Consulting</option>
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
                    const newStatus = e.target.value
                    const currentStatus = field.value
                    if (handleStatusChange(currentStatus, newStatus)) {
                      field.onChange(newStatus)
                    } else {
                      Swal.fire("Transición no permitida", `No puedes cambiar el estado de ${currentStatus} a ${newStatus}.`, "error")
                    }
                  }}
                >
                  <option value="" disabled>Select status</option>
                  <option value="Opening">Opening</option>
                  <option value="Under study">Under study</option>
                  <option value="Purchase order">Purchase order</option>
                  <option value="Executed">Executed</option>
                </select>
              )}
            />
            {errors.status && <p className="text-red-500">{errors.status.message}</p>}
          </div>
        </div>
        <div className="flex justify-center gap-5">
          <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
          >
              Update Opportunity
          </button>
          <button
              type="button"
              onClick={onCancel}
              className="bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600"
          >
              Cancel
          </button>
      </div>
      </form>
    </div>
}

export default OpportunityForm