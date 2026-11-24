import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Booking from './pages/Booking.jsx';
import Confirmation from './pages/Confirmation.jsx';
import Admin from './pages/Admin.jsx';
import NotFound from './pages/NotFound.jsx';

// All pages share one Layout (header + footer) via a nested route.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="book" element={<Booking />} />
        <Route path="confirmation/:reference" element={<Confirmation />} />
        <Route path="admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
