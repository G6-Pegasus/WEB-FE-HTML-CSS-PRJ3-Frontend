import Header from "./Header";
import Sidebar from "./Sidebar";

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Page content */}
        <main className="overflow-y-auto">
            {children}
        </main>
      </div>
    </div>
  );
}

export default Main;