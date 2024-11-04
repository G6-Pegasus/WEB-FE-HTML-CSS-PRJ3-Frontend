import CustomersView from "../customers/CustomersView";

const DashboardView = () => {
    return <>
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to the dashboard. Here you can find a summary of the most important information.</p>
        </div>
        <div>        
            <CustomersView />
        </div>
    </>
}

export default DashboardView