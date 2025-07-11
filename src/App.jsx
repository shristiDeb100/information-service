import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home"; // ✅ Home page
import Newapplication from "./pages/add service/form 1/Newapplication";
import ProcessForm from "./pages/add service/form2/processform";

import Preview from "./pages/add service/preview/preview";
import PublishDetails from "./pages/Details/publishDetails";
import PendingDetails from "./pages/Details/pendingDetails";
import Header from "./components/dashboard/header";
import Footer from "./components/dashboard/footer";
import SupportiveDocumentForm from "./pages/add service/form 3/supportivedocumentform";
import ContactDetailsForm from "./pages/add service/form 4/contactdetailsform";
import PublishServiceDetail from "./pages/add service/form 5/publishServiceDetail";

const App = () => {
  return (
    <Router>
      <Header />
      <div style={{ paddingTop: "64px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
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
          <Route path="/add-service/preview" element={<Preview />} />
          <Route path="/publishDetails" element={<PublishDetails />} />
          <Route path="/pendingDetails" element={<PendingDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
