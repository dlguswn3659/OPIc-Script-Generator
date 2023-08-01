import React, { useEffect, useState } from "react";

const JsonViewer = ({ jsonData, setJsonData }) => {
  const jsonDataOnChange = (e) => {
    setJsonData(e.target.value);
  };
  return (
    <textarea
      style={{ width: "100%", height: "600px" }}
      value={jsonData}
      onChange={(e) => jsonDataOnChange(e)}
      //   readOnly
    />
  );
};

export default JsonViewer;
