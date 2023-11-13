export const navigations = [
  { name: "Dashboard", path: "/dashboard/admin", icon: "dashboard" },
  { name: "Teachers", path: "/dashboard/teacher", icon: "dashboard" },
  {
    name: "Subject",
    icon: "security",
    children: [
      {
        name: "Class J.S.S 1",
        iconText: "SI",
        path: "student/dashboard/js1-subject",
      },
      { name: "Class J.S.S 2", iconText: "SI", path: "/dashboard/js2-subject" },
      { name: "Class J.S.S 3", iconText: "SI", path: "/dashboard/js3-subject" },
      { name: "Class S.S.S 1", iconText: "SI", path: "/dashboard/ss1-subject" },
      { name: "Class S.S.S 2", iconText: "SI", path: "/dashboard/ss2-subject" },
      { name: "Class S.S.S 3", iconText: "SI", path: "/dashboard/ss3-subject" },
    ],
  },

  {
    name: "Class Routine",
    icon: "security",
    children: [
      { name: "Manage Class", iconText: "SI", path: "dashboard/class" },
    ],
  },
  {
    name: "Exam",
    icon: "security",
    children: [
      { name: "Exam List", iconText: "SI", path: "student/dashboard/examlist" },
      { name: "Exam Grades", iconText: "SI", path: "/dashboard/grade" },
      { name: "Manage Marks", iconText: "SI", path: "student/dashboard/exam" },

      {
        name: "Tabulation Sheet",
        iconText: "SI",
        path: "/dashboard/tabulation-sheet",
      },
      { name: "Question Paper", iconText: "SI", path: "/session/" },
    ],
  },
  {
    name: "Mark View",
    path: "/student/dashboard/student_mark_sheet",
    icon: "dashboard",
  },
  {
    name: "Online Exam",
    icon: "security",
    children: [
      {
        name: "Mark View/Report card",
        iconText: "SI",
        path: "student/dashboard/online-exam",
      },
      {
        name: "Manage Online Exam",
        iconText: "SI",
        path: "student/dashboard/manage-online-exam",
      },
      {
        name: "View Result",
        iconText: "SI",
        path: "/student/dashboard/manage-online-result",
      },
    ],
  },
  {
    name: "Payment",
    icon: "security",
    children: [
      {
        name: "Student Payments",
        iconText: "SI",
        path: "/dashboard/student-payment",
      },
      { name: "Create Student Payment", iconText: "SI", path: "/session/" },
      { name: "Expenses", iconText: "SI", path: "/session/" },
    ],
  },

  { name: "Profile", path: "/dashboard/profile", icon: "dashboard" },
];
