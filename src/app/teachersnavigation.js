export const navigations = [
  {
    name: " Dashboard",
    path: "/teacher/dashboard",
    icon: <span style={{ color: "#ffc107" }}>dashboard</span>,
  },
  {
    name: " Admin",
    path: "/teacher/dashboard/admin",
    icon: <span style={{ color: "#ffc107" }}>Admin</span>,
  },
  {
    name: "Student",
    icon: "people",
    children: [
      {
        name: "Student information",
        iconText: "SU",

        children: [
          {
            name: "Class J.S.S 1",
            iconText: "SI",
            path: "/teacher/dashboard/jss1-student_information",
          },
          {
            name: "Class J.S.S 2",
            iconText: "SI",
            path: "/teacher/dashboard/jss2-student_information",
          },
          {
            name: "Class J.S.S 3",
            iconText: "SI",
            path: "/teacher/dashboard/jss3-student_information",
          },
          {
            name: "Class S.S.1.S",
            iconText: "SI",
            path: "/teacher/dashboard/ss1-science-student_information",
          },
          {
            name: "Class S.S.1.A",
            iconText: "SI",
            path: "/teacher/dashboard/ss1-art-student_information",
          },
          {
            name: "Class S.S.1.C",
            iconText: "SI",
            path: "/teacher/dashboard/ss1-commercial-student_information",
          },
          {
            name: "Class S.S.2.S",
            iconText: "SI",
            path: "/teacher/dashboard/ss2-science-student_information",
          },
          {
            name: "Class S.S.2.A",
            iconText: "SI",
            path: "/teacher/dashboard/ss2-art-student_information",
          },
          {
            name: "Class S.S.2.C",
            iconText: "SI",
            path: "/teacher/dashboard/ss2-commercial-student_information",
          },
          {
            name: "Class S.S.3.S",
            iconText: "SI",
            path: "/teacher/dashboard/ss3-science-student_information",
          },
          {
            name: "Class S.S.3.A",
            iconText: "SI",
            path: "/teacher/dashboard/ss3-art-student_information",
          },
          {
            name: "Class S.S.3.C",
            iconText: "SI",
            path: "/teacher/dashboard/ss3-commercial-student_information",
          },
        ],

        path: "/session/signup",
      },
    ],
  },
  {
    name: "Affective Psychomotor",
    icon: "person",
    children: [
      {
        name: "Manage Category",
        iconText: "SI",
        path: "/dashboard/psychomotor_report_cat",
      },
      {
        name: "Manage Student Report",
        iconText: "SI",
        path: "/dashboard/manage_psychomotor",
      },
    ],
  },
  { name: "Teachers", path: "/teacher/dashboard/teacher", icon: "dashboard" },

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
        name: "On-Screen Marking",
        iconText: "SI",
        path: "/dashboard/onscreen-marking",
      },

      // { name: "Question Paper", iconText: "SI", path: "/session/" },
    ],
  },

  {
    name: "Online Exam",
    icon: "computer",
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
    name: "Profile",
    path: "/dashboard/profile",
    icon: <span style={{ color: "#ffc107" }}>person</span>,
  },
];
