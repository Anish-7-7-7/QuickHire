
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllPosts from "./AllPosts";


const App = () => {
  return (
  
      <div className="bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={<AllPosts />} />

        </Routes>
      </div>
    
  );
};

export default App;
