import Loadable from "app/components/Loadable";
import { lazy } from "react";
import { authRoles } from "../../auth/authRoles";
import Admin from "./admin/Admin";
import Class from "./forms/Class";
import Examlist from "./forms/Examlist";
import Exam from "./forms/Exam";
import Form from "./forms/Form";
import Grade from "./forms/Grade";
import Info from "./forms/Info";
import Info2 from "./forms/Info2";
import Manage from "./forms/Manage";
import Online from "./forms/Online";
import Payment from "./forms/Payment";
import Profile from "./forms/Profile";
import Sub1 from "./forms/Sub1";
import Sub2 from "./forms/Sub2";
import Sub3 from "./forms/Sub3";
import Subject from "./forms/Subject";
import Tab from "./forms/Tab";
import Teacher from "./forms/Teacher";
import ManagemarkView from "./forms/ManagemarkView";
import Info3 from "./forms/Info3";
import Info4 from "./forms/Info4";
import Info5 from "./forms/Info5";
import Info6 from "./forms/Info6";
import Sub4 from "./forms/Sub4";
import Sub5 from "./forms/Sub5";
import Sub6 from "./forms/Sub6";

const Analytics = Loadable(lazy(() => import("./Analytics")));

const studentDashboardRoutes = [
  {
    path: "/student/dashboard/default",
    element: <Analytics />,
    auth: "student",
  },
  {
    path: "/student/dashboard/admin",
    element: <Admin />,
    auth: "student",
  },
  {
    path: "/student/dashboard/student_add",
    element: <Form />,
    auth: "student",
  },
  {
    path: "/student/dashboard/js1-subject",
    element: <Sub1 />,
    auth: "student",
  },
  {
    path: "/student/dashboard/examlist",
    element: <Examlist />,
    auth: "student",
  },
  {
    path: "/student/dashboard/js3-subject",
    element: <Sub3 />,
    auth: "student",
  },
  {
    path: "/student/dashboard/js2-subject",
    element: <Sub2 />,
    auth: "student",
  },
  {
    path: "/student/dashboard/ss1-subject",
    element: <Sub4 />,
    auth: "student",
  },
  {
    path: "/student/dashboard/ss2-subject",
    element: <Sub5 />,
    auth: "student",
  },
  {
    path: "/student/dashboard/ss3-subject",
    element: <Sub6 />,
    auth: "student",
  },
  {
    path: "/student/dashboard/manage-mark-view",
    element: <ManagemarkView />,
    auth: "student",
  },
  {
    path: "/student/dashboard/jss1-student_information",
    element: <Info />,
    auth: "student",
  },
  {
    path: "/dashboard/jss2-student_information",
    element: <Info2 />,
    auth: "student",
  },
  {
    path: "/dashboard/jss3-student_information",
    element: <Info3 />,
    auth: "student",
  },
  {
    path: "/dashboard/ss1-student_information",
    element: <Info4 />,
    auth: "student",
  },
  {
    path: "/dashboard/ss2-student_information",
    element: <Info5 />,
    auth: "student",
  },
  {
    path: "/dashboard/ss3-student_information",
    element: <Info6 />,
    auth: "student",
  },
  { path: "/dashboard/teacher", element: <Teacher />, auth: "student" },
  { path: "/dashboard/subject", element: <Subject />, auth: "student" },
  { path: "/dashboard/class", element: <Class />, auth: "student" },
  { path: "/dashboard/exam", element: <Exam />, auth: "student" },
  { path: "/dashboard/grade", element: <Grade />, auth: "student" },
  {
    path: "/dashboard/tabulation-sheet",
    element: <Tab />,
    auth: "student",
  },
  {
    path: "/dashboard/online-exam",
    element: <Online />,
    auth: "student",
  },
  {
    path: "/dashboard/manage-online-exam",
    element: <Manage />,
    auth: "student",
  },
  {
    path: "/dashboard/student-payment",
    element: <Payment />,
    auth: "student",
  },
  { path: "/dashboard/profile", element: <Profile />, auth: "student" },
];

export default studentDashboardRoutes;
