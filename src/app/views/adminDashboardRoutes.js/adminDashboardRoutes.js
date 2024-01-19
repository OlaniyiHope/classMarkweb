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
import AddClass from "./forms/AddClass";
import ManSin from "./forms/ManSin";
import ViewResult from "./forms/ViewResult";
import MarkSheet from "./forms/MarkSheet";
import ReportCard from "./forms/ReportCard";
import ViewAdmin from "./admin/ViewAdmin";

import TermRepCont from "./forms/TermRepCont";
import StuReceipt from "./forms/StuReceipt";

import { ReceiptProvider } from "./forms/receiptContext";
import NoticeBoard from "./forms/NoticeBoard";
import ViewNotice from "./forms/ViewNotice";
import Parent from "./forms/Parent";
import Setting from "./forms/Settings";
import Account from "./forms/Account";
import Info7 from "./forms/Info7";

import Info9 from "./forms/Info9";
import Info8 from "./forms/Info8";
import Info10 from "./forms/Info10";
import Info11 from "./forms/Info11";
import Info12 from "./forms/Info12";
import ManagePsy from "./forms/ManagePsy";

const Analytics = Loadable(lazy(() => import("./Analytics")));

const adminDashboardRoutes = [
  { path: "/dashboard/admin", element: <Admin />, auth: "admin" },
  { path: "/admin/admin", element: <ViewAdmin />, auth: "admin" },
  { path: "/dashboard/student_add", element: <Form />, auth: "admin" },
  { path: "/dashboard/classes", element: <AddClass />, auth: "admin" },
  { path: "/dashboard/js1-subject", element: <Sub1 />, auth: "admin" },
  { path: "/dashboard/examlist", element: <Examlist />, auth: "admin" },
  { path: "/dashboard/js3-subject", element: <Sub3 />, auth: "admin" },
  { path: "/dashboard/js2-subject", element: <Sub2 />, auth: "admin" },
  { path: "/dashboard/ss1-subject", element: <Sub4 />, auth: "admin" },
  { path: "/dashboard/ss2-subject", element: <Sub5 />, auth: "admin" },
  { path: "/dashboard/ss3-subject", element: <Sub6 />, auth: "admin" },
  { path: "/dashboard/manage-mark-view", element: <ManagemarkView /> },
  {
    path: "/dashboard/jss1-student_information",
    element: <Info />,
    auth: "admin",
  },
  {
    path: "/dashboard/jss2-student_information",
    element: <Info2 />,
    auth: "admin",
  },
  {
    path: "/dashboard/jss3-student_information",
    element: <Info3 />,
    auth: "admin",
  },
  {
    path: "/dashboard/ss1-science-student_information",
    element: <Info4 />,
    auth: "admin",
  },
  {
    path: "/dashboard/ss1-art-student_information",
    element: <Info5 />,
    auth: "admin",
  },
  {
    path: "/dashboard/ss1-commercial-student_information",
    element: <Info6 />,
    auth: "admin",
  },
  {
    path: "/dashboard/ss2-science-student_information",
    element: <Info7 />,
    auth: "admin",
  },
  {
    path: "/dashboard/ss2-art-student_information",
    element: <Info8 />,
    auth: "admin",
  },
  {
    path: "/dashboard/ss2-commercial-student_information",
    element: <Info9 />,
    auth: "admin",
  },
  {
    path: "/dashboard/ss3-science-student_information",
    element: <Info10 />,
    auth: "admin",
  },
  {
    path: "/dashboard/ss3-art-student_information",
    element: <Info11 />,
    auth: "admin",
  },
  {
    path: "/dashboard/ss3-commercial-student_information",
    element: <Info12 />,
    auth: "admin",
  },

  { path: "/dashboard/teacher", element: <Teacher />, auth: "admin" },
  { path: "/dashboard/parent", element: <Parent />, auth: "admin" },
  { path: "/dashboard/add_notice", element: <NoticeBoard />, auth: "admin" },
  { path: "/dashboard/noticeboard", element: <ViewNotice />, auth: "admin" },
  { path: "/dashboard/subject", element: <Subject />, auth: "admin" },
  { path: "/dashboard/class", element: <Class />, auth: "admin" },
  { path: "/dashboard/exam", element: <Exam />, auth: "admin" },
  { path: "/dashboard/grade", element: <Grade />, auth: "admin" },
  {
    path: "/dashboard/tabulation-sheet",
    element: <Tab />,
    auth: "admin",
  },
  {
    path: "/dashboard/online-exam",
    element: <Online />,
    auth: "admin",
  },
  {
    path: "/dashboard/manage-online-exam",
    element: <Manage />,
    auth: "admin",
  },
  {
    path: "/dashboard/manage-online-exam/:id",
    element: <ManSin />,
    auth: "admin",
  },
  {
    path: "/dashboard/view-result/:id",
    element: <ViewResult />,
    auth: "admin",
  },
  {
    path: "/dashboard/student_mark_sheet/:id",
    element: <MarkSheet />,
    auth: "admin",
  },
  {
    path: "/dashboard/report_card/:id",
    element: <ReportCard />,
    auth: "admin",
  },
  // {
  //   path: "/dashboard/term_report_card/:id",
  //   element: <TermRep />,
  //   auth: "admin",
  // },
  {
    path: "/dashboard/term_report_card/:id",
    element: <TermRepCont />,
    auth: "admin",
  },

  {
    path: "/dashboard/student-payment",
    element: <Payment />,
    auth: "admin",
  },
  {
    path: "/dashboard/student-receipt",
    element: (
      <ReceiptProvider>
        <StuReceipt />
      </ReceiptProvider>
    ),
    auth: "admin",
  },

  { path: "/dashboard/profile", element: <Profile />, auth: "admin" },
  { path: "/dashboard/setting", element: <Setting />, auth: "admin" },
  { path: "/dashboard/account", element: <Account />, auth: "admin" },
  {
    path: "/dashboard/psychomotor_report_cat",
    element: <Account />,
    auth: "admin",
  },
  {
    path: "/dashboard/manage_psychomotor",
    element: <ManagePsy />,
    auth: "admin",
  },
];

export default adminDashboardRoutes;
