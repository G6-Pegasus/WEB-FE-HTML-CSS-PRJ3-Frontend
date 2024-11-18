import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
import CustomersView from "./pages/customers/CustomersView";
import CreateCustomerView from "./pages/customers/CreateCustomerView";
import CustomerDetailsView from "./pages/customers/CustomerDetailsView";
import DashboardView from "./pages/dashboard/DashboardView";
import OpportunitiesView from "./pages/opportunities/OpportunitiesView";
import OpportunityDetailsView from "./pages/opportunities/OpportunityDetailsView";
import FollowUpsView from "./pages/followUps/FollowUpsView";
import OpportunityFormView from "./pages/opportunities/OpportunityFormView";

const router = createBrowserRouter([
    // Dashboard
    {
        path: "/",
        element: <DashboardView />
    },

    // Customers
    {
        path: "/customers",
        element: <CustomersView />,
    },
    {
        path: "/createCustomer",
        element: <CreateCustomerView />
    },
    {
        path: "/customerDetails/:customerId",
        element: <CustomerDetailsView />
    },

    // Opportunities
    {
        path: "/opportunities",
        element: <OpportunitiesView />
    },
    {
        path: "/createOpportunity",
        element: <OpportunityFormView option="create" />
    },
    {
        path: "/opportunityDetails/:opportunityId",
        element: <OpportunityDetailsView />
    },
    {
        path: "/updateOpportunity/:opportunityId",
        element: <OpportunityFormView option="update" />
    },      

    // Follow-Ups
    {
        path: "/followUps",
        element: <FollowUpsView />
    }
], {
    future: {
      v7_fetcherPersist: true,
    },
});

export default function App() {
    return <RouterProvider router={router} />
}