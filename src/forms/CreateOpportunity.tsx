import { useForm, Controller } from 'react-hook-form';
import { useCreateOpportunity } from '../hooks/useCreateOpportunity';
import { useGetCustomers } from '../hooks/useGetCustomers';
import { Opportunity } from '../utils/types';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import ErrorComponent from '../components/common/ErrorComponent';
import Loader from '../components/common/Loader';

const CreateOpportunity = ({ onCancel } : { onCancel: () => void }) => {
    const { mutate: createOpportunity, isSuccess, isError } = useCreateOpportunity();
    const { data: customers = [], isLoading, isError: isCustomersError } = useGetCustomers();
    const { register, handleSubmit, control, formState: { errors } } = useForm<Opportunity>({
        defaultValues: {
            status: 'Opening',
        }
    });

    const onSubmit = (opportunity: Opportunity) => {
        createOpportunity({ ...opportunity, id: crypto.randomUUID() });
        if (isSuccess) Swal.fire("Created!", "Opportunity has been successfully created.", "success");
        if (isError) Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error creating opportunity. Please try again.",
        });
    };

    if (isLoading) return <Loader />;
    if (isCustomersError) return <ErrorComponent message="An error occurred while fetching the information." />;

    return <div className="container mx-auto p-6 max-w-lg bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Opportunity</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                
                {/* Client */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Client</label>
                    <select
                        {...register("customerId", { required: "Client is required" })}
                        className={`block w-full p-2 border rounded-md ${errors.customerId ? 'border-red-500' : 'border-gray-300'}`}
                    >
                        <option value="">Select a customer</option>
                        {customers.map((customer, index) => <option key={index} value={customer.id}>{customer.name}</option>)}
                    </select>
                    {errors.customerId && <p className="text-red-500 text-sm mt-1">{errors.customerId.message}</p>}
                </div>

                {/* Business Name */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Business Name</label>
                    <input
                        type="text"
                        {...register("businessName", { required: "Business name is required" })}
                        className={`block w-full p-2 border rounded-md ${errors.businessName ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.businessName && <p className="text-red-500 text-sm mt-1">{errors.businessName.message}</p>}
                </div>

                {/* Business Line */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Business Line</label>
                    <select
                        {...register("businessLine", { required: "Business line is required" })}
                        className={`block w-full p-2 border rounded-md ${errors.businessLine ? 'border-red-500' : 'border-gray-300'}`}
                    >
                        <option value="">Select a business line</option>
                        <option value="Outsourcing Resources">Outsourcing Resources</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Mobile Development">Mobile Development</option>
                        <option value="IT Consultancy">IT Consultancy</option>
                    </select>
                    {errors.businessLine && <p className="text-red-500 text-sm mt-1">{errors.businessLine.message}</p>}
                </div>

                {/* Opportunity Description */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Opportunity Description</label>
                    <textarea
                        {...register("description", { required: "Description is required" })}
                        className={`block w-full p-2 border rounded-md ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                </div>

                {/* Estimated Business Value */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Estimated Business Value (COP)</label>
                    <input
                        type="number"
                        {...register("estimatedBusinessValue", {
                            required: "Estimated business value is required",
                            min: { value: 0, message: "Value must be a positive number" }
                        })}
                        className={`block w-full p-2 border rounded-md ${errors.estimatedBusinessValue ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.estimatedBusinessValue && <p className="text-red-500 text-sm mt-1">{errors.estimatedBusinessValue.message}</p>}
                </div>

                {/* Estimated Completion Date */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Estimated Completion Date</label>
                    <Controller
                        name="estimatedCompletionDate"
                        control={control}
                        rules={{ required: "Completion date is required" }}
                        render={({ field }) => (
                            <input
                                type="date"
                                {...field}
                                min={dayjs().format('YYYY-MM-DD')}
                                className={`block w-full p-2 border rounded-md ${errors.estimatedCompletionDate ? 'border-red-500' : 'border-gray-300'}`}
                            />
                        )}
                    />
                    {errors.estimatedCompletionDate && <p className="text-red-500 text-sm mt-1">{errors.estimatedCompletionDate.message}</p>}
                </div>

                {/* Status - Read-only */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Status</label>
                    <input
                        type="text"
                        value="Opening" // Default value for status
                        readOnly
                        className="block w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center gap-5">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        Create Opportunity
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
};

export default CreateOpportunity;