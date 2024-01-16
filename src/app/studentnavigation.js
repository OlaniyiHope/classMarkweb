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
    path: "/student/dashboard/js1-subject",
    icon: <span style={{ color: "#ffc107" }}>book</span>,
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
