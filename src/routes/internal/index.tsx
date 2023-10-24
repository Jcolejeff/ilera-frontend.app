import CONSTANTS from 'constant';
import AppointmentPage from 'pages/app/appointment';
import Visits from 'pages/app/visits';
import BillingPage from 'pages/app/billing';
import InventoryPage from 'pages/app/inventory';
import Laboratory from 'pages/app/laboratory';
import Consultation from 'pages/app/consultation';
import Dashboard from 'pages/app/dashboard';
import GeneralForumns from 'pages/app/general-forums';
import ReportsPage from 'pages/app/master-classes';
import OnlineTraining from 'pages/app/online-training';
import ServiceAd from 'pages/app/service-ad';
import Profile from 'pages/app/user-profile';
import AccountSettings from 'pages/app/account-settings';
import SingleBlog from 'pages/inner-pages/single-blog';
import SingleBts from 'pages/inner-pages/single-bts';
import SinglePatient from 'pages/inner-pages/single-patient';
import { routeTypes, routesInterface } from 'types';
import PatientsPage from 'pages/app/patients';
import CreatePatientPage from 'pages/app/create-patient';

const internalRoute: routeTypes = [
  {
    element: <Dashboard />,
    path: 'dashboard',
    plan: 'student',
  },
  {
    element: <CreatePatientPage />,
    path: 'create-patient',
    plan: 'starter',
  },
  {
    element: <PatientsPage />,
    path: 'patients',
    plan: 'starter',
  },
  {
    element: <Visits />,
    path: 'visits',
    plan: 'starter',
  },
  {
    element: <Profile />,
    path: 'profile',
    plan: 'starter',
  },

  {
    element: <AppointmentPage />,
    path: 'appointment',
    plan: 'starter',
  },
  {
    element: <Consultation />,
    path: 'consultation',
    plan: 'student',
  },
  {
    element: <BillingPage />,
    path: 'billing',
    plan: 'student',
  },
  {
    element: <InventoryPage />,
    path: 'inventory',
    plan: 'student',
  },
  {
    element: <Laboratory />,
    path: 'laboratory',
    plan: 'student',
  },
  {
    element: <AccountSettings />,
    path: 'settings',
    plan: 'student',
  },
  {
    element: <ReportsPage />,
    path: 'reports',
    plan: 'student',
  },

  {
    element: <GeneralForumns />,
    path: 'general-forums',
    plan: 'student',
  },

  {
    element: <OnlineTraining />,
    path: 'online-training',
    plan: 'student',
  },

  {
    element: <ServiceAd />,
    path: 'service-ad',
    plan: 'professional',
  },
];

export const innerInternalRoutes: routesInterface<string>[] = [
  { element: <SingleBlog />, path: `${CONSTANTS.ROUTES.blogs}/:id`, plan: `starter` },
  { element: <SingleBts />, path: `${CONSTANTS.ROUTES.bts}/:id`, plan: `starter` },
  {
    element: <SinglePatient />,
    path: `${CONSTANTS.ROUTES.patients}/:id`,
    plan: `starter`,
  },
];

export default internalRoute;
