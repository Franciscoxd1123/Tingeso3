import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Home from './components/Home';
import CreateClient from './components/CreateClient';
import NotFound from './components/NotFound';
import MyRequests from './components/MyRequests';
import CreateRequest from './components/CreateRequest';
import AllRequests from './components/AllRequests';
import Simulation from './components/Simulation';
import Evaluation from './components/Evaluation';
import TotalCost from './components/TotalCost';

function App() {
  return (
      <Router>
          <div className="container">
          <Navbar></Navbar>
            <Routes>
              <Route path="/home" element={<Home/>} />
              <Route path="/clients/create" element={<CreateClient />} />
              <Route path="/simulation" element={<Simulation />} />
              <Route path="/myRequests" element={<MyRequests />} />
              <Route path="/loan" element={<CreateRequest />} />
              <Route path="/allRequests" element={<AllRequests />} />
              <Route path="/evaluation" element={<Evaluation />} />
              <Route path="/totalCost" element={<TotalCost />} />
              <Route path="*" element={<NotFound/>} />
            </Routes>
          </div>
      </Router>
  );
}
export default App;