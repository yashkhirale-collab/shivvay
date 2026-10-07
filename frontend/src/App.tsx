import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Doctors from "./components/Doctors";
import Services from "./components/Services";
import Vaccination from "./components/Vaccination";
import AppointmentCTA from "./components/AppointmentCTA";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import Appointment from "./pages/Appointment";

import DoctorLogin from "./pages/doctor/DoctorLogin";
import DoctorRegister from "./pages/doctor/DoctorRegister";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import DoctorPatients from "./pages/doctor/DoctorPatients";
import PatientDetails from "./pages/doctor/PatientDetails";
import Vaccinations from "./pages/doctor/vaccinations";

import NotFound from "./pages/NotFound";


function Home() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main>
                <Hero />
                <About />
                <Doctors />
                <Services />
                <Vaccination />
                <AppointmentCTA />
                <Contact />
            </main>

            <Footer />
        </div>
    );
}


function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/appointment"
                    element={<Appointment />}
                />


                {/* Doctor Authentication */}
                <Route
                    path="/doctor/login"
                    element={<DoctorLogin />}
                />

                <Route
                    path="/doctor/register"
                    element={<DoctorRegister />}
                />


                {/* ONE COMMON DOCTOR DASHBOARD */}
                <Route
                    path="/doctor/dashboard"
                    element={<DoctorDashboard />}
                />

                <Route
                    path="/doctor/appointments"
                    element={<DoctorAppointments />}
                />

                <Route
                    path="/doctor/patients"
                    element={<DoctorPatients />}
                />

                <Route
                    path="/doctor/patients/:patientId"
                    element={<PatientDetails />}
                />

                <Route
                    path="/doctor/vaccinations"
                    element={<Vaccinations />}
                />


                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>
        </BrowserRouter>
    );
}


export default App;