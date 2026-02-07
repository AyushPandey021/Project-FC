import React from 'react'
import FinderDashboard from "./Pages/finder/Dashboard";
import { Route, Routes } from 'react-router-dom';
const App = () => {
  return (
    <Routes>
  
              <Route path="/" element={<FinderDashboard />} />
        </Routes> 
  )
}

export default App