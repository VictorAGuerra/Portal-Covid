import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'


const AppRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route element={<Home />} path='/' />
        </Routes>
    </BrowserRouter>
)

export default AppRoutes