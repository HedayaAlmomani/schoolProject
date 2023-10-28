import React , { useState }from "react";
import Input from "../../coreComponent/input";
import axios from "axios";
import "./style.scss";


const CreateStudent = () => {
  const [student, setStudent] = useState({
    name: "",
    class: "",
    section: "",
    age: "",
    nationality: "",
    phoneNum: "",
  });
  const handleChange=(key , value)=>{
    setStudent((prev)=>{
        return {...student , [key]:value}
    })
  }

  const createStudent = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/student`, {
       ...student,
        id: Math.random() * 9999,
      });
      console.log(response);
    } catch (error) {
      console.error("Error creating student:", error);
    }
  };
  return (
    <div className="add-student-form">
      <Input
        placeholder="e.g. Student Name"
        onChange={(value) => handleChange('name',value)}
        value={student?.name}
        size="medium"
        type="text"
        clearable={true}
        // onClear={() => setFilterCustomerName('')}
        label="Student Name"
      />
      <Input
        placeholder="e.g. class"
        onChange={(value) =>  handleChange('class',value)}
        value={student?.class}
        size="medium"
        type="text"
        clearable={true}
        onClear={() =>  handleChange('class','')}
        label="Class"
      />
      <Input
        placeholder="D"
        onChange={(value) =>handleChange('section',value)}
        value={student?.section}
        size="medium"
        type="text"
        clearable={true}
        onClear={() =>  handleChange('section','')}
        label="Section"
      />
      <Input
        placeholder="16"
        onChange={(value) => handleChange('age',value)}
        value={student.age}
        size="medium"
        type="text"
        clearable={true}
        onClear={() =>  handleChange('age',"")}
        label="Age"
      />
      <Input
        placeholder="jordanian"
        onChange={(value) => handleChange('nationality',value)}
        value={student?.nationality}
        size="medium"
        type="text"
        clearable={true}
        onClear={() =>  handleChange('nationality','')}
        label="Nationality"
      />
      <Input
        placeholder="0798576241"
        onChange={(value) =>  handleChange('phoneNum',value)}
        value={student?.phoneNum}
        size="medium"
        type="text"
        clearable={true}
        onClear={() => handleChange('phoneNum',"")}
        label="Phone Number"
      />
      <button onClick={()=> createStudent()}>Add Student</button>
    </div>
  );
};

export default CreateStudent;
