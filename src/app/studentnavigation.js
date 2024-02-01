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
    path: "/student/dashboard/subject",
    icon: <span style={{ color: "#ffc107" }}>book</span>,
  },

  {
    name: "Exam Mark/Report Card",
    path: "/student/dashboard/student_mark_sheet",
    icon: <span style={{ color: "#ffc107" }}>assignment</span>,
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
    icon: <span style={{ color: "#ffc107" }}>payment</span>,
    path: "/student/dashboard/student-payment",
  },
  {
    name: " Attendance",
    icon: <span style={{ color: "#ffc107" }}>access_alarm</span>,
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
