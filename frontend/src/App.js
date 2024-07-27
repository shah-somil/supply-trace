import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CompanyList from './components/CompanyList';
import CompanyDetails from './components/CompanyDetails';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<CompanyList />} />
        <Route path="/companies/:companyId" element={<CompanyDetails />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
