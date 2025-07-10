import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/home/Home"; // ✅ Home page
import Newapplication from "./pages/add service/form 1/Newapplication";
import ProcessForm from "./pages/add service/form2/processform";
import ContactDetailsForm from "./pages/add service/from 3/contactdetailsform";
import SupportiveDocumentForm from "./pages/add service/form 4/supportivedocumentform";
import PublishServiceDetail from "./pages/add service/form6/publishServiceDetail";
import PublishDetails from "./pages/Details/publishDetails";
import PendingDetails from "./pages/Details/pendingDetails";
import Header from "./components/dashboard/header";
import Footer from "./components/dashboard/footer";

const App = () => {
  return (
    <Router>
      <Header />
      <div style={{ paddingTop: "64px" }}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/add-service/new-application"
            element={<Newapplication />}
          />
          <Route path="/add-service/process-form" element={<ProcessForm />} />
          <Route
            path="/add-service/supportive-document-form"
            element={<SupportiveDocumentForm />}
          />
          <Route
            path="/add-service/contact-details-form"
            element={<ContactDetailsForm />}
          />
          <Route
            path="/add-service/publishServiceDetail"
            element={<PublishServiceDetail />}
          />
          <Route path="/home/publishDetails" element={<PublishDetails />} />
          <Route path="/pendingDetails" element={<PendingDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
