import Header from "./Header";
import Sidebar from "./Sidebar";

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main className="ml-0 md:ml-20 overflow-y-auto my-16 md:mt-16 md:mb-0 p-5 w-[100vw] md:w-[94vw]">
            {children}
        </main>
      </div>
    </div>
  );
}

export default Main;