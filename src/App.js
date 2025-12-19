import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import FoundItems from './components/FoundItems';
import RequestedItems from './components/RequestedItems';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/dashboard" element = {<Dashboard />} />
                <Route path="/requested-items" element={<RequestedItems />} />
                <Route path="/found-items" element={<FoundItems />} />
            </Routes>
        </Router>
    );
}
export default App;
