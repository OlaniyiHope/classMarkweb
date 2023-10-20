export const navigations = [
  { name: "Admin Dasbboard", path: "/dashboard/admin", icon: "dashboard" },
  { label: "PAGES", type: "label" },
  {
    name: "Student",
    icon: "security",
    children: [
      { name: "Admit Student", iconText: "SI", path: "dashboard/student_add" },
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
      {
        name: "Forgot Password",
        iconText: "FP",
        path: "/session/forgot-password",
      },
      { name: "Student Promotion", iconText: "404", path: "/session/404" },
    ],
  },
  { name: "Teacher", path: "/dashboard/teacher", icon: "dashboard" },
  { name: "Parents", path: "/dashboard/teacher", icon: "dashboard" },

  {
    name: "Subject",
    icon: "security",
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
    name: "Class",
    icon: "security",
    children: [
      { name: "Manage Class", iconText: "SI", path: "dashboard/class" },
      { name: "Academic Syllabus", iconText: "SI", path: "/session/signin" },
    ],
  },
  {
    name: "Exam",
    icon: "security",
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
    icon: "security",
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

  {
    name: "Session/Auth",
    icon: "security",
    children: [
      { name: "Sign in", iconText: "SI", path: "/session/signin" },
      { name: "Sign up", iconText: "SU", path: "/session/signup" },
      {
        name: "Forgot Password",
        iconText: "FP",
        path: "/session/forgot-password",
      },
      { name: "Error", iconText: "404", path: "/session/404" },
    ],
  },
  { label: "Components", type: "label" },
  {
    name: "Components",
    icon: "favorite",
    badge: { value: "30+", color: "secondary" },
    children: [
      { name: "Auto Complete", path: "/material/autocomplete", iconText: "A" },
      { name: "Buttons", path: "/material/buttons", iconText: "B" },
      { name: "Checkbox", path: "/material/checkbox", iconText: "C" },
      { name: "Dialog", path: "/material/dialog", iconText: "D" },
      {
        name: "Expansion Panel",
        path: "/material/expansion-panel",
        iconText: "E",
      },
      { name: "Form", path: "/material/form", iconText: "F" },
      { name: "Icons", path: "/material/icons", iconText: "I" },
      { name: "Menu", path: "/material/menu", iconText: "M" },
      { name: "Progress", path: "/material/progress", iconText: "P" },
      { name: "Radio", path: "/material/radio", iconText: "R" },
      { name: "Switch", path: "/material/switch", iconText: "S" },
      { name: "Slider", path: "/material/slider", iconText: "S" },
      { name: "Snackbar", path: "/material/snackbar", iconText: "S" },
      { name: "Table", path: "/material/table", iconText: "T" },
    ],
  },
  {
    name: "Charts",
    icon: "trending_up",
    children: [{ name: "Echarts", path: "/charts/echarts", iconText: "E" }],
  },
  {
    name: "Documentation",
    icon: "launch",
    type: "extLink",
    path: "http://demos.ui-lib.com/matx-react-doc/",
  },
];
