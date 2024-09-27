import Loadable from "../../../app/components/Loadable";

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
import ViewAdmin from "./ViewAdmin";
import Info7 from "./forms/Info7";
import Info8 from "./forms/Info8";
import Info9 from "./forms/Info9";
import Info10 from "./forms/Info10";
import Info11 from "./forms/Info11";
import Info12 from "./forms/Info12";

const Analytics = Loadable(lazy(() => import("./Analytics")));

const teacherDashboardRoutes = [
  {
    path: "/teacher/dashboard",
    element: <Analytics />,
    auth: "teacher",
  },
  {
    path: "/teacher/dashboard/student_add",
    element: <Form />,
    auth: "teacher",
  },
  { path: "/dashboard/:classname-subject", element: <Sub1 />, auth: "admin" },

  {
    path: "/teacher/dashboard/examlist",
    element: <Examlist />,
    auth: "teacher",
  },
  {
    path: "/teacher/dashboard/js3-subject",
    element: <Sub3 />,
    auth: "teacher",
  },
  {
    path: "/teacher/dashboard/js2-subject",
    element: <Sub2 />,
    auth: "teacher",
  },
  {
    path: "/teacher/dashboard/ss1-subject",
    element: <Sub4 />,
    auth: "teacher",
  },
  {
    path: "/teacher/dashboard/ss2-subject",
    element: <Sub5 />,
    auth: "teacher",
  },
  {
    path: "/teacher/dashboard/ss3-subject",
    element: <Sub6 />,
    auth: "teacher",
  },
  {
    path: "/teacher/dashboard/manage-mark-view",
    element: <ManagemarkView />,
    auth: "teacher",
  },
  {
    path: "/teacher/dashboard/:classname-student_information",
    element: <Info />,
    auth: "teacher",
  },
  {
    path: "/teacher/dashboard/teacher",
    element: <Teacher />,
    auth: "teacher",
  },
  { path: "/dashboard/subject", element: <Subject />, auth: "teacher" },
  { path: "/dashboard/class", element: <Class />, auth: "teacher" },
  { path: "/dashboard/exam", element: <Exam />, auth: "teacher" },
  { path: "/dashboard/grade", element: <Grade />, auth: "teacher" },
  {
    path: "/dashboard/tabulation-sheet",
    element: <Tab />,
    auth: "teacher",
  },
  {
    path: "/dashboard/online-exam",
    element: <Online />,
    auth: "teacher",
  },
  {
    path: "/dashboard/manage-online-exam",
    element: <Manage />,
    auth: "teacher",
  },
  {
    path: "/dashboard/student-payment",
    element: <Payment />,
    auth: "teacher",
  },
  { path: "/dashboard/profile", element: <Profile />, auth: "teacher" },
];

export default teacherDashboardRoutes;
