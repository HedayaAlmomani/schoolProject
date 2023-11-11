import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Table from "../../coreComponent/table";
import "./style.scss";

const Student = () => {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const { studentClass } = useParams();
  const navigate = useNavigate();

  const handleDateChangeDate = (event) => {
    setSelectedDate(event.target.value);
  };

  const headCells = [
    {
      id: "name",
      label: "الطلاب",
    },
    {
      id: "class",
      label: "الصف",
    },
    {
      id: "section",
      label: "الشعبة",
    },
    {
      id: "nationality",
      label: "الجنسية",
    },
    {
      id: "phoneNum",
      label: "رقم الهاتف",
    },
    {
      id: "absencesNum",
      label: "عدد الغيابات",
    },
    {
      id: "actions",
      label: "actions",
    },
    {
      id: "absences",
      label: "الحضور و الغياب",
    },
    {
      id: "deleteStudent",
      label: "حذف الطالب",
    },
  ];
  const deleteStudent = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/student/${id}`
      );
      getStudent();
    } catch (error) {
      console.error("Error increasing absences:", error);
    }
  };

  const getStudent = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/student`);
      if (!studentClass) {
        setData(
          response?.data.reduce((prev, student) => {
            prev.push({
              id: student.id,
              name: student?.name,
              class: student?.class,
              section: student?.section,
              nationality: student?.nationality,
              phoneNum: student?.phoneNum,
              absencesNum: student?.absencesDates?.length,
              actions: (
                <div className="actions-container">
                  <button
                    className="record-absence"
                    onClick={() => {
                      recordAbsence(student);
                    }}
                  >
                    غياب
                  </button>
                  <button
                    className="remove-absence"
                    onClick={() => {
                      removeAbsence(student);
                    }}
                  >
                    حضور
                  </button>
                  <button
                    onClick={() => {
                      navigate(`/studentDetails/${student?.id}`);
                    }}
                  >
                    عرض المزيد
                  </button>
                </div>
              ),
              absences: student?.absencesDates?.includes(selectedDate)
                ? "غياب"
                : "حضور",
              deleteStudent: (
                <div>
                  <button
                    className="delete-student"
                    onClick={() => deleteStudent(student?.id)}
                  >
                    حذف الطالب
                  </button>
                </div>
              ),
            });
            return prev;
          }, [])
        );
      } else {
        setData(
          response?.data
            .filter((item) => {
              return item.class === studentClass;
            })
            .reduce((prev, student) => {
              prev.push({
                id: student.id,
                name: student?.name,
                class: student?.class,
                section: student?.section,
                nationality: student?.nationality,
                phoneNum: student?.phoneNum,
                absencesNum: student?.absencesDates?.length,
                actions: (
                  <div className="actions-container">
                    <button
                      className="record-absence"
                      onClick={() => {
                        recordAbsence(student);
                      }}
                    >
                      غياب
                    </button>
                    <button
                      className="remove-absence"
                      onClick={() => {
                        removeAbsence(student);
                      }}
                    >
                      حضور
                    </button>
                    <button
                      onClick={() => {
                        navigate(`/studentDetails/${student?.id}`);
                      }}
                    >
                      عرض المزيد
                    </button>
                  </div>
                ),
                absences: student?.absencesDates?.includes(selectedDate)
                  ? "غياب"
                  : "حضور",
                deleteStudent: (
                  <div>
                    <button
                      className="delete-student"
                      onClick={() => deleteStudent(student?.id)}
                    >
                      حذف الطالب
                    </button>
                  </div>
                ),
              });
              return prev;
            }, [])
        );
      }
    } catch (error) {
      console.error("Error creating student:", error);
    }
  };
  // وضع الغياب
  const recordAbsence = async (student) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/student/${student?.id}`,
        {
          ...student,
          absencesDates: [...student?.absencesDates, selectedDate],
          absencesDates: student?.absencesDates?.includes(selectedDate)
            ? student?.absencesDates
            : [...student?.absencesDates, selectedDate],
        }
      );
      getStudent();
    } catch (error) {
      console.error("Error increasing absences:", error);
    }
  };
  // ازالة الغياب
  const removeAbsence = async (student) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/student/${student?.id}`,
        {
          ...student,
          absencesDates: student?.absencesDates.filter(
            (item) => item !== selectedDate
          ),
        }
      );
      getStudent();
    } catch (error) {
      console.error("Error increasing absences:", error);
    }
  };

  useEffect(() => {
    getStudent();
  }, [studentClass, selectedDate]);

  return (
    <div className="students-table-container">
      <input
        className="date"
        type="date"
        id="datePicker"
        value={selectedDate}
        onChange={handleDateChangeDate}
      />
      <Table headCells={headCells} data={data} />
    </div>
  );
};

export default Student;
