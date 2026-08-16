import {Routes,Route} from "react-router-dom";

import Homepage from "./pages/Homepage";
import SearchPage from './pages/SearchPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
}