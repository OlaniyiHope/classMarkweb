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
      {
        name: "Class J.S.S 2",
        iconText: "SI",
        path: "/student/dashboard/js2-subject",
      },
      {
        name: "Class J.S.S 3",
        iconText: "SI",
        path: "/student/dashboard/js3-subject",
      },
      {
        name: "Class S.S.S 1",
        iconText: "SI",
        path: "/student/dashboard/ss1-subject",
      },
      {
        name: "Class S.S.S 2",
        iconText: "SI",
        path: "/student/dashboard/ss2-subject",
      },
      {
        name: "Class S.S.S 3",
        iconText: "SI",
        path: "/student/dashboard/ss3-subject",
      },
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
    name: "Mark View",
    path: "/student/dashboard/student_mark_sheet",
    icon: "assignment",
  },
  {
    name: "Online Exam",
    icon: "assignment",
    children: [
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
    name: " Payment History",
    iconText: "SI",
    path: "/student/dashboard/student-payment",
  },
  {
    name: " Attendance",
    iconText: "SI",
    path: "/student/dashboard/student-payment",
  },
  {
    name: "Study Material",
    iconText: "SI",
    path: "/student/dashboard/student-payment",
  },

  {
    name: "Profile",
    path: "/dashboard/profile",
    icon: <span style={{ color: "#ffc107" }}>person</span>,
  },
];
