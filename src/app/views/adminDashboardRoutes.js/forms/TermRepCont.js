// Your TermRepContainer component

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TermRep from "./TermRep";
import useAuth from "app/hooks/useAuth";

const TermRepCont = () => {
  const { id } = useParams();

  return (
    <div>
      {/* You can include any additional components or layout for the TermRep page */}
      <TermRep studentId={id} />
    </div>
  );
};

export default TermRepCont;
