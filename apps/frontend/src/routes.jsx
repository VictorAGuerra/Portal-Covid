import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Sidebar from './components/Sidebar'
import FormPage from './pages/FormPage'


const AppRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route element={<Sidebar />} path='/'>
                <Route element={<FormPage />} path='formpage'/>
            </Route>
        </Routes>
    </BrowserRouter>
)

export default AppRoutes