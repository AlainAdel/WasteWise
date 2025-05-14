// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import History from "./pages/History";
import Info from "./pages/Info";

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App


// src/App.jsx


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/info" element={<Info />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;


// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-6">
//       <header className="mb-6 text-center text-3xl font-bold">WasteWise</header>
//       <main className="flex flex-col items-center space-y-4">
//         <button className="bg-green-600 px-4 py-2 rounded hover:bg-green-500 transition">Upload Waste Image</button>
//         <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 transition">View History</button>
//       </main>
//     </div>
//   );
// }

