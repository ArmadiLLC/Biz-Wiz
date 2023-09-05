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
  const [salary, setSalary] = useState(0);
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
    top: props.pos[0]+window.scrollY,
    left: props.pos[1],
    display: hidden ? "none" : "flex",
    flexDirection: "column",
    alignSelf: "center",
    justifyContent: "flex-start",
    zIndex: 2,
    backgroundColor: 'white',
    position: 'absolute',
    padding: '5px'
  };
  const submitEmployee = async () => {
    const tempNewEmployee = {
      firstname: firstname,
      lastname: lastname,
      jobtitle: jobtitle,
      datehired: dateHired,
      email: email,
      salary: salary,
      shortbio: shortbio,
      bossid: bossid,
    };
    const newEmployee = {};
    for(const[key, value] of Object.entries(tempNewEmployee)){
        if(value !== undefined && value){
            newEmployee[key] = value;
        }
    }
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
    populateDropDown();
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
        <div style = {{display:'flex', justifyContent:'space-between'}}>
        <label>First Name:</label>
        <input
          type="text"
          onChange={onFirstNameChangeHandle}
          value={firstname}
        ></input>
        </div>
        <div style = {{display:'flex', justifyContent:'space-between'}}>
        <label>Last Name:</label>
        <input
          type="text"
          onChange={onLastNameChangeHandle}
          value={lastname}
        ></input>
        </div>
        <div style = {{display:'flex', justifyContent:'space-between'}}>
        <label>Job Title:</label>
        <input
          type="text"
          onChange={onJobTitleChangeHandle}
          value={jobtitle}
        ></input>
        </div>
        <div style = {{display:'flex', justifyContent:'space-between'}}>
        <label>Date Hired:</label>
        <input type="date" onChange={onDateHiredChangeHandle}></input>
        </div>
        <div style = {{display:'flex', justifyContent:'space-between'}}>
        <label>Email:</label>
        <input type="text" onChange={onEmailChangeHandle}></input>
        </div>
        <div style = {{display:'flex', justifyContent:'space-between'}}>
        <label>Boss: </label>
        <select id="bossSelector" onChange={onBossIdChangeHandle}>
          <option value={null}>Select an Employee</option>
          {options}
        </select>
        </div>
        <div style = {{display:'flex', justifyContent:'space-between'}}>
        <label>Short Bio:</label>
        <input type="text" onChange={onShortBioChangeHandle}></input>
        </div>
        <div style = {{display:'flex', justifyContent:'space-between'}}>
        <label>Salary:</label>
        <input type="text" onChange={onSalaryChangeHandle}></input>
        </div>
        <div style = {{display:'flex', justifyContent:'flex-end'}}>
        <button onClick={submitEmployee}>Submit employee</button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployeeBox;
