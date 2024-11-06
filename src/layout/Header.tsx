function Header() {
  return (
    <header className="flex fixed w-full h-16 items-center justify-between bg-white shadow-md z-10 p-4">
      {/* Logo */}
      <div className="flex-1 text-center font-bold text-xl text-gray-700">
        Web & Mobile Solutions
      </div>

      {/* Fake User */}
      <div className="text-gray-600">Hello, John</div>
    </header>
  );
}

export default Header;