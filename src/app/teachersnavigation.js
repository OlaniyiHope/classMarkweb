import React, { useContext, useState, useEffect } from "react";
import { SessionContext } from "./components/MatxLayout/Layout1/SessionContext";
import useFetch from "../hooks/useFetch";

// Define a function that returns the navigations
export const getNavigations = () => {
  const { currentSession } = useContext(SessionContext);
  const [classes, setClasses] = useState([]);

  const { data } = useFetch(
    currentSession ? `/class/${currentSession._id}` : null
  );

  useEffect(() => {
    if (data) {
      setClasses(data);
    }
  }, [data]);

  // Return the navigations array dynamically
  return [
    {
      name: " Dashboard",
      path: "/teacher/dashboard",
      icon: <span style={{ color: "#ffc107" }}>dashboard</span>,
    },
    {
      name: "Student",
      icon: "people",
      children: [
        {
          name: "Student information",
          iconText: "SU",
          children:
            classes.length > 0
              ? classes.map((item, index) => ({
                  name: `Class ${item.name}`,
                  iconText: "SI",
                  path: `/dashboard/${item.name}-student_information`,
                }))
              : [], // Add the console log here for debugging
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
    {
      name: "Teachers",
      path: "/teacher/dashboard/teacher",
      icon: "dashboard",
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
};
