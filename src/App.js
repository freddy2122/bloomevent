import React,{useState, useEffect} from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import Politique from './pages/Politique';
import AllEvent from './pages/AllEvent';
import All from './pages/All';
import DetailEvent from './pages/DetailEnvent';
import ProfilePromoteur from './pages/promoteur/ProfilePromoteur';
import ProfileAdmin from './pages/admin/ProfileAdmin';
import InfoCompte from './pages/user/InfoCompte';
import ChangeEmail from './pages/user/ChangeEmail';
import History from './pages/user/History';
import ChangePassword from './pages/user/ChangePassword';
import ProtectedRoute from './ProtectedRoute ';
import ProtectedAdminRoute from './pages/admin/ProtectedAdminRoute';
import ProtectedUserRoute from './pages/user/ProtectedUserRoute';
import ProtectedPromoteurRoute from './pages/promoteur/ProtectedPromoteurRoute';
import NotAuthorized from './NotAuthorized';
import DashboardPromoteur from './pages/promoteur/DashobardPromoteur';
import GestionUser from './pages/admin/GestionUser';
import Category from './pages/admin/Category';
import EventList from './pages/admin/EventList';
import Organisateur from './pages/Organisateur';
import CreateEventForm from './pages/promoteur/CreateEventForm';
import Loader from './components/Loader';
import ResultPage from './pages/ResultPage';
import MyEvent from './pages/promoteur/MyEvent';
import TicketsDisplay from './pages/promoteur/TicketsDisplay ';
import EventPerformanceReport from './pages/promoteur/EventPerformanceReport';
import ProfileSettings from './pages/promoteur/ProfileSettings';
import WithdrawalRequest from './pages/promoteur/WithdrawalRequest';
import WithdrawalRequests from './pages/admin/WithdrawalRequest';
import ProfileAdminSetting from './pages/admin/ProfileAdminSetting';
import DashboardAdmin from './pages/admin/DashboardAdmin';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ProfileUser from './pages/user/ProfileUser';
import UserSetting from './pages/user/UserSetting';
import PaidTickets from './pages/user/PaidTickets';

function App() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  useEffect(() => {
    // Activer le loader au début du changement de route
    setLoading(true);

    // Désactiver le loader après un court délai pour simuler le chargement
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Ajustez le temps selon vos besoins

    // Nettoyer le timer pour éviter des effets indésirables
    return () => clearTimeout(timer);
  }, [location]);
  return (
    <>
      <Loader loading={loading} />
     

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/politique-et-confidentialite" element={<Politique />} />
          <Route path="/result-page" element={<ResultPage />} />
          <Route path="/all-events" element={<AllEvent />} />
          <Route path="/events" element={<All />} />
          <Route path="/email-verify" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/detail-event/:id" element={<DetailEvent />} />
          <Route path="/organisateur" element={<ProtectedRoute><Organisateur /></ProtectedRoute>} />


          {/* organize route */}
          <Route path="/promoteur/info-compte" element={<ProtectedRoute><ProtectedPromoteurRoute><ProfilePromoteur /></ProtectedPromoteurRoute></ProtectedRoute>} />
          <Route path="/promoteur/dashboard" element={<ProtectedRoute><ProtectedPromoteurRoute><DashboardPromoteur /></ProtectedPromoteurRoute></ProtectedRoute>} />
          <Route path="/organisateur/creer-event" element={<ProtectedRoute><ProtectedPromoteurRoute><CreateEventForm /></ProtectedPromoteurRoute></ProtectedRoute>} />
          <Route path="/organisateur/my-event" element={<ProtectedRoute><ProtectedPromoteurRoute><MyEvent /></ProtectedPromoteurRoute></ProtectedRoute>} />
          <Route path="/organisateur/gestion-billet" element={<ProtectedRoute><ProtectedPromoteurRoute><TicketsDisplay /></ProtectedPromoteurRoute></ProtectedRoute>} />
          <Route path="/organisateur/rapport" element={<ProtectedRoute><ProtectedPromoteurRoute><EventPerformanceReport /></ProtectedPromoteurRoute></ProtectedRoute>} />
          <Route path="/organisateur/setting" element={<ProtectedRoute><ProtectedPromoteurRoute><ProfileSettings /></ProtectedPromoteurRoute></ProtectedRoute>} />
          <Route path="/organisateur/wallet" element={<ProtectedRoute><ProtectedPromoteurRoute><WithdrawalRequest /></ProtectedPromoteurRoute></ProtectedRoute>} />

          {/* admin route */}
          <Route path="/admin/info-compte" element={<ProtectedRoute> <ProtectedAdminRoute><ProfileAdmin /></ProtectedAdminRoute></ProtectedRoute>} />
          <Route path="/gestion-users" element={<ProtectedRoute> <ProtectedAdminRoute><GestionUser /></ProtectedAdminRoute></ProtectedRoute>} />
          <Route path="/all-category" element={<ProtectedRoute> <ProtectedAdminRoute><Category /></ProtectedAdminRoute></ProtectedRoute>} />
          <Route path="/list-event" element={<ProtectedRoute> <ProtectedAdminRoute><EventList /></ProtectedAdminRoute></ProtectedRoute>} />
          <Route path="/admin/setting" element={<ProtectedRoute> <ProtectedAdminRoute><ProfileAdminSetting /></ProtectedAdminRoute></ProtectedRoute>} />
          <Route path="/admin/demande-retrait" element={<ProtectedRoute> <ProtectedAdminRoute><WithdrawalRequests /></ProtectedAdminRoute></ProtectedRoute>} />
          <Route path="/admin/dashboard" element={<ProtectedRoute> <ProtectedAdminRoute><DashboardAdmin /></ProtectedAdminRoute></ProtectedRoute>} />

          {/* user route */}
          <Route path="/dashbord-utilisateur" element={<ProtectedRoute><ProtectedUserRoute><ProfileUser /></ProtectedUserRoute></ProtectedRoute>} />
          <Route path="/account-info" element={<ProtectedRoute><ProtectedUserRoute><InfoCompte /></ProtectedUserRoute></ProtectedRoute>} />
          <Route path="/change-email" element={<ProtectedRoute><ProtectedUserRoute><ChangeEmail /></ProtectedUserRoute></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><ProtectedUserRoute><History /></ProtectedUserRoute></ProtectedRoute>} />
          <Route path="/change-password" element={<ProtectedRoute><ProtectedUserRoute><ChangePassword /></ProtectedUserRoute></ProtectedRoute>} />
          <Route path="/user/setting" element={<ProtectedRoute><ProtectedUserRoute><UserSetting /></ProtectedUserRoute></ProtectedRoute>} />
          <Route path="/user/ticket-paid" element={<ProtectedRoute><ProtectedUserRoute><PaidTickets /></ProtectedUserRoute></ProtectedRoute>} />

          {/* 401 error */}
          <Route path="/not-authorized" element={<NotAuthorized />} />
        </Routes>
     
    </>
  );
}

export default App;
