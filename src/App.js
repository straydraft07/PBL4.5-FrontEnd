import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./components/HomePage";
import LoginForm from './components/LoginForm';
import SignUp from "./components/SignUp";
import Dashboard from './components/Dashboard';
import FoundItems from './components/FoundItems';
import RequestedItems from './components/RequestedItems';
import ItemSearch from './components/ItemSearch';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/requested-items" element={<RequestedItems />} />
                <Route path="/found-items" element={<FoundItems />} />
                <Route path="/item-search" element={<ItemSearch />} />
            </Routes>
        </Router>
    );
}
export default App;
