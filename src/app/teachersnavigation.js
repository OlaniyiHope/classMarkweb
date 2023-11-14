export const navigations = [
  {
    name: "Teacher Dashboard",
    path: "/dashboard/admin",
    icon: <span style={{ color: "#ffc107" }}>dashboard</span>,
  },
  { label: "PAGES", type: "label" },
  {
    name: "Student",
    icon: "person",
    children: [
      {
        name: "Student information",
        iconText: "SU",

        children: [
          {
            name: "Class J.S.S 1",
            iconText: "SI",
            path: "/dashboard/jss1-student_information",
          },
          {
            name: "Class J.S.S 2",
            iconText: "SI",
            path: "/dashboard/jss2-student_information",
          },
          {
            name: "Class J.S.S 3",
            iconText: "SI",
            path: "/dashboard/jss3-student_information",
          },
          {
            name: "Class S.S.S 1",
            iconText: "SI",
            path: "/dashboard/ss1-student_information",
          },
          {
            name: "Class S.S.S 2",
            iconText: "SI",
            path: "/dashboard/ss2-student_information",
          },
          {
            name: "Class S.S.S 3",
            iconText: "SI",
            path: "/dashboard/ss3-student_information",
          },
        ],

        path: "/session/signup",
      },
    ],
  },
  { name: "Teachers", path: "/dashboard/teacher", icon: "dashboard" },

  {
    name: "Subject",
    icon: "school",
    children: [
      { name: "Class J.S.S 1", iconText: "SI", path: "/dashboard/js1-subject" },
      { name: "Class J.S.S 2", iconText: "SI", path: "/dashboard/js2-subject" },
      { name: "Class J.S.S 3", iconText: "SI", path: "/dashboard/js3-subject" },
      { name: "Class S.S.S 1", iconText: "SI", path: "/dashboard/ss1-subject" },
      { name: "Class S.S.S 2", iconText: "SI", path: "/dashboard/ss2-subject" },
      { name: "Class S.S.S 3", iconText: "SI", path: "/dashboard/ss3-subject" },
    ],
  },

  {
    name: "Exam",
    icon: "assignment",
    children: [
      { name: "Manage Marks", iconText: "SI", path: "/dashboard/exam" },
      {
        name: "Question Paper",
        iconText: "SI",
        path: "/dashboard/manage-mark-view",
      },
      {
        name: "Test List",
        iconText: "SI",
        path: "/dashboard/tabulation-sheet",
      },
      { name: "Question Paper", iconText: "SI", path: "/session/" },
    ],
  },

  {
    name: "Accounting",
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
