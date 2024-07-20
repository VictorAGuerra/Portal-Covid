import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import FormPage from './pages/FormPage';
import SchedulePage from './pages/SchedulePage';
import NotificationPopup from './components/notificationPopup';
import HomePage from './pages/HomePage';

const AppRoutes = () => (
  <BrowserRouter>
    <NotificationPopup />
    <Sidebar>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="form" element={<FormPage />} />
        <Route path="schedule" element={<SchedulePage />} />
      </Routes>
    </Sidebar>
  </BrowserRouter>
);

export default AppRoutes;
