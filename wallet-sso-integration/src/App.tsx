import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { PageLoading } from "./components/page-loading";
import Login from "./login";
import Dashboard from "./dashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route loader={PageLoading} path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
