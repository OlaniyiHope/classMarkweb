import React, { useContext, useState, useEffect } from "react";
import { SessionContext } from "./components/MatxLayout/Layout1/SessionContext";
import useFetch from "../hooks/useFetch";

export const Navigations = () => {
  const { currentSession } = useContext(SessionContext); // Moved inside the component
  const [classes, setClasses] = useState([]);

  const { data, reFetch } = useFetch(
    currentSession ? `/class/${currentSession._id}` : null
  );

  console.log("cls",data)

  
  useEffect(() => {
    if (data) {
      setClasses(data);
    }
  }, [data]);
  
  console.log("clases",classes)
  return [
    {
      name: "Dashboard ",
      path: "/dashboard/admin",
      icon: <span style={{ color: "#ffc107" }}>dashboard</span>,
    },
    {
      name: "Admin",
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
          children: classes.length > 0
          ? classes.map((item, index) => ({
              name: `Class ${item.name}`,
              iconText: "SI",
              path: `/dashboard/${item.name}-student_information`,
            }))
          : [], // Add the console log here for debugging
          path: "/session/signup",
        },

        {
          name: "Student Promotion",
          iconText: "404",
          path: "/dashboard/promotion",
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
  {
    name: "Teacher",
    path: "/dashboard/teacher",
    icon: <span style={{ color: "#ffc107" }}>person</span>,
  },
  {
    name: "Noticeboard",
    icon: <span style={{ color: "#ffc107" }}>info</span>,
    path: "/dashboard/noticeboard",
  },
  {
    name: "Parents",
    path: "/dashboard/parent",
    icon: <span style={{ color: "#ffc107" }}>person</span>,
  },

  {
    name: "Subject",
    icon: "book",
      children: classes.length > 0
      ? classes.map((item, index) => ({
          name: `Class ${item.name}`,
          iconText: "SI",
          path: `/dashboard/${item.name}-subject`,
        }))
      : [],
  },
  {
    name: "Class",
    icon: "school",
    children: [
      { name: "Manage Class", iconText: "SI", path: "/dashboard/class" },
      {
        name: "Academic Syllabus",
        iconText: "SI",
        path: "/dashboard/syllabus",
      },
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
        name: "On-Screen Marking",
        iconText: "SI",
        path: "/dashboard/onscreen-marking",
      },

      {
        name: "Tabulation Sheet",
        iconText: "SI",
        path: "/dashboard/tabulation-sheet",
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
    name: "Past Questions",
    icon: "assignment",
    children: [
      {
        name: "Add Past Questions",
        iconText: "SI",
        path: "/dashboard/addpq",
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
    name: "Study Material",
    path: "/dashboard/study-material",
    icon: <span style={{ color: "#ffc107" }}>group_work</span>,
  },
  {
    name: "Daily Attendance",
    path: "/dashboard/attendance",
    icon: <span style={{ color: "#ffc107" }}>access_alarm</span>,
  },
  {
    name: "Profile",
    path: "/dashboard/profile",
    icon: <span style={{ color: "#ffc107" }}>person</span>,
  },
  {
    name: "Setting",
    path: "/dashboard/setting",
    icon: <span style={{ color: "#ffc107" }}>settings</span>,
  },
  {
    name: "Account",
    path: "/dashboard/account",
    icon: <span style={{ color: "#ffc107" }}>edit</span>,
  },
  ];
};
