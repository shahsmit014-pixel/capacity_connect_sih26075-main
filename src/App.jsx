import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ================================
// PUBLIC PAGES
// ================================
import Landing from "./Pages/Landing/Landing";
import Register from "./Pages/Auth/Register/Register";
import Login from "./Pages/Auth/Login/Login";

// ================================
// LEARNER ROUTES
// ================================
// import LearnerRoutes from "./routes/LearnerRoutes";

// import AdminRoutes from "./routes/AdminRoutes"
import AboutUs from "./Pages/AboutUs/AboutUs";
import ContactUs from "./Pages/ContactUs/ContactUs";
function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     {/* ========================================
    //         PUBLIC PAGES
    //     ======================================== */}

    //     {/* Landing Page */}
    //     <Route path="/" element={<Landing />} />

    //     {/* Login Page */}
    //     <Route
    //       path="/login"
    //       element={
    //         <>
    //           <Landing />
    //           <Login />
    //         </>
    //       }
    //     />

    //     {/* Register Page */}
    //     <Route
    //       path="/register"
    //       element={
    //         <>
    //           <Landing />
    //           <Register />
    //         </>
    //       }
    //     />

    //     {/* ========================================
    //         LEARNER APPLICATION
    //     ======================================== */}

    //     {/* 
    //       All learner routes are handled
    //       inside LearnerRoutes.jsx

    //       Examples:
    //       /learner
    //       /learner/dashboard
    //       /learner/learning
    //       /learner/courses
    //       /learner/skills
    //       /learner/skill-gaps
    //       /learner/recommendations
    //       /learner/certificates
    //       /learner/knowledge-hub
    //       /learner/profile
    //       /learner/settings
    //     */}
    //     <Route path="/learner/*" element={<LearnerRoutes />} />
    //   </Routes>
    // </BrowserRouter>
    // <AdminDashboard/>
  //  <AboutUs/> 
  <ContactUs/>
   
  );
}

export default App;
