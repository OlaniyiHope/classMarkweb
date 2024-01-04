export const navigations = [
  {
    name: "Dashboard ",
    path: "/dashboard/admin",
    icon: <span style={{ color: "#ffc107" }}>dashboard</span>,
  },
  {
    name: " Admin",
    path: "/admin/admin",
    icon: <span style={{ color: "#ffc107" }}>person</span>,
  },

  {
    name: "Student",
    icon: "people",
    children: [
      {
        name: "Admit Student",
        iconText: "SI",
        path: "/dashboard/student_add",
      },
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

      { name: "Student Promotion", iconText: "404", path: "/session/404" },
    ],
  },
  {
    name: "Teacher",
    path: "/dashboard/teacher",
    icon: <span style={{ color: "#ffc107" }}>person</span>,
  },
  {
    name: "Noticeboard",
    iconText: "SI",
    path: "/dashboard/noticeboard",
  },
  {
    name: "Parents",
    path: "/dashboard/teacher",
    icon: <span style={{ color: "#ffc107" }}>person</span>,
  },

  {
    name: "Subject",
    icon: "book",
    children: [
      {
        name: "Class J.S.S 1",
        iconText: "SI",
        path: "/dashboard/js1-subject",
      },
      {
        name: "Class J.S.S 2",
        iconText: "SI",
        path: "/dashboard/js2-subject",
      },
      {
        name: "Class J.S.S 3",
        iconText: "SI",
        path: "/dashboard/js3-subject",
      },
      {
        name: "Class S.S.S 1",
        iconText: "SI",
        path: "/dashboard/ss1-subject",
      },
      {
        name: "Class S.S.S 2",
        iconText: "SI",
        path: "/dashboard/ss2-subject",
      },
      {
        name: "Class S.S.S 3",
        iconText: "SI",
        path: "/dashboard/ss3-subject",
      },
    ],
  },
  {
    name: "Class",
    icon: "school",
    children: [
      { name: "Manage Class", iconText: "SI", path: "/dashboard/class" },
      { name: "Academic Syllabus", iconText: "SI", path: "/session/signin" },
    ],
  },
  {
    name: "Exam",
    icon: "assignment",
    children: [
      { name: "Exam List", iconText: "SI", path: "/dashboard/examlist" },
      { name: "Exam Grades", iconText: "SI", path: "/dashboard/grade" },
      { name: "Manage Marks", iconText: "SI", path: "/dashboard/exam" },
      {
        name: "Manage Marks View",
        iconText: "SI",
        path: "/dashboard/manage-mark-view",
      },
      {
        name: "Tabulation Sheet",
        iconText: "SI",
        path: "/dashboard/tabulation-sheet",
      },
      { name: "Question Paper", iconText: "SI", path: "/session/" },
    ],
  },
  {
    name: "Online Exam",
    icon: "assignment",
    children: [
      {
        name: "Create Online Exam",
        iconText: "SI",
        path: "/dashboard/online-exam",
      },
      {
        name: "Manage Online Exam",
        iconText: "SI",
        path: "/dashboard/manage-online-exam",
      },
    ],
  },
  {
    name: "Accounting",
    icon: "payment",
    children: [
      {
        name: "Create Student Receipt",
        iconText: "SI",
        path: "/dashboard/student-receipt",
      },
      {
        name: "Student Payments",
        iconText: "SI",
        path: "/dashboard/student-payment",
      },
    ],
  },

  {
    name: "Profile",
    path: "/dashboard/profile",
    icon: <span style={{ color: "#ffc107" }}>person</span>,
  },
];
