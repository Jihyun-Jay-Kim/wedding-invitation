// wedding-invitation-app/src/App.tsx
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";

function App() {
  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-md px-4">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
