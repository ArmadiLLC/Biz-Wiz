import React, { useState, useEffect } from "react";

// {
//     "id": 1,
//     "firstname": "Jacob",
//     "lastname": "Sasser",
//     "jobtitle": "server master",
//     "datehired": null,
//     "email": null,
//     "bossid": null,
//     "shortbio": null,
//     "salary": null
// },

const AddEmployeeBox = (props) => {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [jobtitle, setjobtitle] = useState("");
  const [bossid, setbossid] = useState();
  const [email, setEmail] = useState("");
  const [shortbio, setShortBio] = useState("");
  const [salary, setSalary] = useState("");
  const [dateHired, setDateHired] = useState();
  const [employeesAndID, setemployeesAndID] = useState([]);
  const editposition = props.pos;
  useEffect(() => {
    populateDropDown().then();
  }, []);
  const populateDropDown = async () => {
    let data = await fetch("/api");
    const tempEmployeeAndID = [];
    data = await data.json();
    console.log(data);
    data.forEach((e) => {
      tempEmployeeAndID.push({
        name: e.firstname + " " + e.lastname,
        id: e.id,
      });
    });
    setemployeesAndID(tempEmployeeAndID);
  };

  const onFirstNameChangeHandle = (e) => {
    setfirstname(e.target.value);
  };
  const onDateHiredChangeHandle = (e) => {
    setDateHired(e.target.value);
  };
  const onLastNameChangeHandle = (e) => {
    setlastname(e.target.value);
  };
  const onJobTitleChangeHandle = (e) => {
    setjobtitle(e.target.value);
  };
  const onBossIdChangeHandle = (e) => {
    setbossid(e.target.value);
    console.log(e.target.value);
  };
  const onEmailChangeHandle = (e) => {
    setEmail(e.target.value);
  };
  const onShortBioChangeHandle = (e) => {
    setShortBio(e.target.value);
  };
  const onSalaryChangeHandle = (e) => {
    setSalary(e.target.value);
  };

  const hidden = props.hidden;
  const style = {
    top: `${100}px`,
    left: `${100}px`,
    display: hidden ? "none" : "flex",
    flexDirection: "column",
    alignSelf: "center",
    justifyContent: "space-between",
    zIndex: 2,
    onFirstNameChangeHandle,
  };
  const submitEmployee = async () => {
    const newEmployee = {
      firstname: firstname,
      lastname: lastname,
      jobtitle: jobtitle,
      datehired: dateHired,
      email: email,
      salary: salary,
      shortbio: shortbio,
      bossid: bossid,
    };

    await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmployee),
    });
    setfirstname('');
    setlastname('');
    setjobtitle('');
    setEmail('');
    setSalary('');
    setShortBio('');
  };
  const options = [];
  for (let i = 0; i < employeesAndID.length; i++) {
    options.push(
      <option
        value={employeesAndID[i].id}
        key={`addemployeeoption${employeesAndID[i].id}`}
      >
        {employeesAndID[i].name}
      </option>
    );
  }

  return (
    <div style={style}>
      <form>
        <label>First Name:</label>
        <input
          type="text"
          onChange={onFirstNameChangeHandle}
          value={firstname}
        ></input>
        <br></br>
        <label>Last Name:</label>
        <input
          type="text"
          onChange={onLastNameChangeHandle}
          value={lastname}
        ></input>
        <br></br>
        <label>Job Title:</label>
        <input
          type="text"
          onChange={onJobTitleChangeHandle}
          value={jobtitle}
        ></input>
        <br></br>
        <label>Date Hired:</label>
        <input type="date" onChange={onDateHiredChangeHandle}></input>
        <br></br>
        <label>Email:</label>
        <input type="text" onChange={onEmailChangeHandle}></input>
        <br></br>
        <label>Boss: </label>
        <select id="bossSelector" onChange={onBossIdChangeHandle}>
          <option value={null}>Select an Employee</option>
          {options}
        </select>
        <br></br>
        <label>Short Bio:</label>
        <input type="text" onChange={onShortBioChangeHandle}></input>
        <br></br>
        <label>Salary:</label>
        <input type="text" onChange={onSalaryChangeHandle}></input>
        <br></br>
        <button onClick={submitEmployee}>Submit employee</button>
      </form>
    </div>
  );
};

export default AddEmployeeBox;
