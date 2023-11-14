export const navigations = [
  {
    name: "Dashboard",
    path: "/student/dashboard/default",
    icon: <span style={{ color: "#ffc107" }}>dashboard</span>,
  },
  {
    name: "Teachers",
    path: "/student/dashboard/teacher",
    icon: <span style={{ color: "#ffc107" }}>person</span>,
  },
  {
    name: "Subject",
    icon: "book",
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
    icon: "school",
    children: [
      { name: "Manage Class", iconText: "SI", path: "dashboard/class" },
    ],
  },
  {
    name: "Exam",
    icon: "assignment",
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
    icon: "assignment",
  },
  {
    name: "Online Exam",
    icon: "assignment",
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
    icon: "payment",
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

  {
    name: "Profile",
    path: "/dashboard/profile",
    icon: <span style={{ color: "#ffc107" }}>person</span>,
  },
];
