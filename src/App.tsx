import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter as Router, Route, Routes 
} from "react-router-dom";
import CustomersView from "./pages/customers/CustomersView";
import CreateCustomerView from "./pages/customers/CreateCustomerView";
import CustomerDetailsView from "./pages/customers/CustomerDetailsView";
import DashboardView from "./pages/dashboard/DashboardView";
import OpportunitiesView from "./pages/opportunities/OpportunitiesView";
import OpportunityDetailsView from "./pages/opportunities/OpportunityDetailsView";
import FollowUpsView from "./pages/followUps/FollowUpsView";
import Client_Opportunities_Table from "./components/customers/clientOpportunitiesTable";
import ClientOpportunitiesTable from "./components/customers/clientOpportunitiesTable";
import ClientDetail from "./components/customers/ClientDetail"

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
        path: "/opportunityDetails/:opportunityId",
        element: <OpportunityDetailsView />
    },

    // Follow-Ups
    {
        path: "/followUps",
        element: <FollowUpsView />
    }
]);

export default function App() {
    return (
        <><ClientDetail />
        <Client_Opportunities_Table /></>

    //   <Router>
    //     <Routes>
    //       <Route path="/" element={<Client_Opportunities_Table />} />
    //       <Route path="/client/:clientId" element={<ClientDetail />} />
    //     </Routes>
    //   </Router>
    );
  }