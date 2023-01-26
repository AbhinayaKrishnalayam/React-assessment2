import React, { useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const UserSelection = () => {
  const [value, setValue] = useState(null);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const options = [
    { value: "https://retoolapi.dev/u9Ba9K/data", label: "Personal Details" },
    { value: "https://retoolapi.dev/OrnEBJ/data", label: "Employee Details" },
  ];

  const onchangeSelectHandler = (value) => {
    setValue(value);
  };

  const onClickButtonHandler = () => {
    if (value === null) {
      setError(true);
    } else {
      navigate("/grid", { state: { query: value } });
      setError(false);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen w-full bg-gradient-to-b from-cyan-500 to-blue-300">
      <div className="flex w-full justify-center mt-5">
        <h1 className=" text-white text-4xl font-bold ">
          Select your data set !
        </h1>
      </div>
      <div className="flex px-10 mt-24 w-full items-center justify-center">
        <div className="flex flex-col px-10 py-10 space-y-10 bg-white w-96 border rounded-xl shadow-lg">
          <div>
            <Select
              options={options}
              placeholder={"choose a data set"}
              onChange={onchangeSelectHandler}
              menuPlacement={"top"}
            />
            {error && (
              <p className="text-xs text-red-500">please select a data set.</p>
            )}
          </div>
          <div>
            <button
              onClick={onClickButtonHandler}
              className="flex justify-center w-full bg-gradient-to-b from-cyan-500 to-blue-300 text-white py-2 rounded-lg hover:scale-105"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSelection;
