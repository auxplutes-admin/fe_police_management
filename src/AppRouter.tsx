import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy load components
const Login = lazy(() => import("./pages/Auth/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const DashboardLayout = lazy(() => import("./pages/Dashboard/DashboardLayout"));
const Settings = lazy(() => import("./pages/Settings/Settings"));
// Crime Managment
const CrimeManagmentPage = lazy(() => import("./pages/Modules/CrimeManagement/CrimeManagmentPage"));
const CrimeCreatePage = lazy(() => import("./pages/Modules/CrimeManagement/CreateCrimePage"));
const UpdateCrimePage = lazy(() => import("./pages/Modules/CrimeManagement/UpdateCrimePage"));
const CrimeDashboardPage = lazy(() => import("./pages/Modules/CrimeManagement/CrimeDashboardPage"));
const ViewCrimePage = lazy(() => import("./pages/Modules/CrimeManagement/ViewCrimePage"));
// Application Managment
const ApplicationManagmentPage = lazy(() => import("./pages/Modules/ApplicationManagement/ApplicationManagmentPage"));
const ApplicationDashboardPage = lazy(() => import("./pages/Modules/ApplicationManagement/ApplicationDashboard"));
const ApplicationCreatePage = lazy(() => import("./pages/Modules/ApplicationManagement/CreateApplication"));
const ApplicationUpdatePage = lazy(() => import("./pages/Modules/ApplicationManagement/UpdateApplication"));
const ViewApplicationPage = lazy(() => import("./pages/Modules/ApplicationManagement/ViewApplicationPage"));
// Officer Managment
const OfficerManagmentPage = lazy(() => import("./pages/Modules/OfficerManagement/OfficerManagementPage"));
const ViewOfficersPage = lazy(() => import("./pages/Modules/OfficerManagement/ViewOfficersPage"));
const OfficerCreatePage = lazy(() => import("./pages/Modules/OfficerManagement/OfficerManagementPage"));
const OfficerUpdatePage = lazy(() => import("./pages/Modules/OfficerManagement/OfficerManagementPage"));
const OfficerDashboardPage = lazy(() => import("./pages/Modules/OfficerManagement/OfficerManagementPage"));


// Data Rules
const DataRules = lazy(() => import("./pages/Modules/DataRules/DataRules"));


const AppRouter = () => {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signin" element={<Login />} />
                    <Route path={"/dashboard"} element={
                        <ProtectedRoute>
                            <DashboardLayout />
                        </ProtectedRoute>
                    }>
                        <Route path="" element={<Dashboard />} />
                        <Route path="crime-dashboard" element={<CrimeDashboardPage />} />
                        <Route path="crime-dashboard/crimes" element={<CrimeManagmentPage />} />
                        <Route path="crime-dashboard/create" element={<CrimeCreatePage />} />
                        <Route path="crime-dashboard/update/:id" element={<UpdateCrimePage />} />
                        <Route path="crime-dashboard/view/:id" element={<ViewCrimePage />} />
                        <Route path="application-dashboard" element={<ApplicationDashboardPage />} />
                        <Route path="application-dashboard/applications" element={<ApplicationManagmentPage />} />
                        <Route path="application-dashboard/create" element={<ApplicationCreatePage />} />
                        <Route path="application-dashboard/update/:id" element={<ApplicationUpdatePage />} />
                        <Route path="application-dashboard/view/:id" element={<ViewApplicationPage />} />
                        <Route path="data-rules" element={<DataRules />} />
                        <Route path="officer-dashboard" element={<OfficerDashboardPage />} />
                        <Route path="officer-dashboard/officers" element={<OfficerManagmentPage />} />
                        <Route path="officer-dashboard/create" element={<OfficerCreatePage />} />
                        <Route path="officer-dashboard/update/:id" element={<OfficerUpdatePage />} />
                        <Route path="officer-dashboard/view/:id" element={<ViewOfficersPage />} />
                        <Route path="settings" element={<Settings />} />
                    </Route>
                </Routes>
            </Suspense>
        </>
    )
}

export default AppRouter