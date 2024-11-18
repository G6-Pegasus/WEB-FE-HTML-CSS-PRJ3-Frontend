import { Opportunity } from '../../utils/types';

interface OpportunityDetailsProps {
    opportunity: Opportunity;
}

export default function OpportunityDetails({ opportunity }: OpportunityDetailsProps) {
    return (
        <div className="w-full p-6 bg-white shadow-md border-gray-200 rounded-xl">
            <h2 className="text-xl font-semibold text-slate-800 mb-4 border-b border-gray-300  ">
                Opportunity Details
            </h2>
            <div className="text-slate-700 grid grid-cols-2 gap-x-6 gap-y-2">
                <p className="mb-2"><strong>Opportunity ID:</strong> {opportunity.id}</p>
                <p className="mb-2"><strong>Customer NIT:</strong> {opportunity.customerId}</p>
                <p className="mb-2"><strong>Name:</strong> {opportunity.businessName}</p>
                <p className="mb-2"><strong>Business Line:</strong> {opportunity.businessLine}</p>
                <p className="mb-2"><strong>Deadline:</strong> {opportunity.estimatedCompletionDate}</p>
                <p className="mb-2"><strong>Estimated Value:</strong> {opportunity.estimatedBusinessValue}</p>
                <p className="mb-2"><strong>Status:</strong> {opportunity.status}</p>
            </div> 
        </div>
    );
}
