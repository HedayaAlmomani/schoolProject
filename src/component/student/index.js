import React, { useEffect } from "react";
import axios from "axios";
import "./style.scss";
import Table from "../../coreComponent/table";
import "./style.scss";
import { useState } from "react";
const Student = () => {
  const [data, setData] = useState([]);

  const headCells = [
    {
      id: "name",
      label: "الطلاب",
      sortable: true,
    },
    {
      id: "class",
      label: "الصف",
      sortable: true,
    },
    {
      id: "age",
      label:"العمر" ,
      sortable: true,
    },
    {
      id: "section",
      label: "الشعبة",
      sortable: true,
    },
    {
      id: "nationality",
      label: "الجنسية",
      sortable: true,
    },
    {
      id: "phoneNum",
      label: "رقم الهاتف",
      sortable: true,
    },
    {
      id: "absencesNum",
      label: "عدد الغيابات",
      sortable: true,
    },
  ];

  const getStudent = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/student`);
      console.log(response?.data);
      setData(response?.data);
    } catch (error) {
      console.error("Error creating student:", error);
    }
  };
  useEffect(() => {
    getStudent();
  }, []);
  return (
    <div className="students-table-container">
      <Table headCells={headCells} data={data} />
    </div>
  );
};

export default Student;
