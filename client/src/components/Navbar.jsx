import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="text-white px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* <div className="text-2xl font-bold montserrat-regular tracking-widest">WASTEWISE</div> */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="WasteWise Logo" className="h-10 w-12" />
          <span className="text-2xl font-bold montserrat-regular tracking-widest">WASTEWISE</span>
        </Link>
        <div className="space-x-10 text-sm sm:text-base">
          {/* <Link to="/" className="hover:text-gray-300 montserrat-regular">HOME</Link> */}
          <Link to="/history" className="hover:text-gray-300 montserrat-regular">HISTORY</Link>
          <Link to="/info" className="hover:text-gray-300 montserrat-regular">INFO</Link>
        </div>
      </div>
    </nav>
  );
}