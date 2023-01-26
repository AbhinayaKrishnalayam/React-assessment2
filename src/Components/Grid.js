import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles//ag-grid.css";
import "ag-grid-community/styles//ag-theme-alpine.css";
import { useMemo } from "react";
import "./Grid.css";

const Grid = () => {
  const [header, setHeader] = useState(null);
  const [rowData, setRowData] = useState(null);

  const location = useLocation();

  const getData = async (link) => {
    const response = await fetch(link);

    if (response.ok) {
      const result = await response.json();

      let fields = [];

      Object.keys(result[0]).map((key) => {
        if (key === "id") {
          fields.push({ field: key, width: "90rem" });
        } else {
          fields.push({ field: key });
        }
        return null;
      });
      setHeader(fields);

      setRowData(result);
    }
  };

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
  }));

  useEffect(() => {
    if (location.state.query.value !== null)
      getData(location.state.query.value);
  }, [location]);

  return (
    <div className="flex w-full h-screen bg-gradient-to-b from-cyan-500 to-blue-300">
      <div className="flex flex-col space-y-8 justify-center items-center bg-red w-full h-full px-10 py-10">
        <h3 className="text-white text-3xl font-bold">
          {location.state.query.label !== null && location.state.query.label}
        </h3>
        <div className="ag-theme-alpine w-full lg:w-[710px] h-full rounded-lg">
          <AgGridReact
            rowData={rowData}
            columnDefs={header}
            defaultColDef={defaultColDef}
            animateRows={true}
            paginationAutoPageSize={true}
            pagination={true}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

export default Grid;
