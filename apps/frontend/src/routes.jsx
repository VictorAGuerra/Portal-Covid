import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import FormPage from './pages/FormPage';
import SchedulePage from './pages/SchedulePage';
import NotificationPopup from './components/notificationPopup'

const AppRoutes = () => (
  <BrowserRouter>
    <NotificationPopup />
    <Routes>
      <Route element={<Sidebar />} path='/'>
        <Route element={<FormPage />} path='formpage'/>
        <Route element={<SchedulePage />} path='schedulepage'/>
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
