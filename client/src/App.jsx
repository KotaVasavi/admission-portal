import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/public/HomePage';
import CoursesPage from './pages/public/CoursesPage';
import CourseDetailsPage from './pages/public/CourseDetailsPage';
import LoginPage from './pages/public/LoginPage';
import StudentDashboard from './pages/student/StudentDashboard';
import ApplicationForm from './pages/student/ApplicationForm';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageApplications from './pages/admin/ManageApplications';
import PrivateRoute from './components/routing/PrivateRoute';

function App() {
  return (
    <>
      <Navbar />
      <main className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/course/:id" element={<CourseDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Student Routes */}
          <Route element={<PrivateRoute roles={['student']} />}>
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/apply/:courseId" element={<ApplicationForm />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<PrivateRoute roles={['admin']} />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/applications" element={<ManageApplications />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;