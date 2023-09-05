import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Flow from '../components/Chart.jsx';
import AddEmployeeBox from '../components/AddEmployeeBox.jsx';
import EmployeeInfoBox from '../components/EmployeeInfoBox.jsx';
// import { useDispatch } from 'react-redux';



function MainContainer() {
  // const dispatch = useDispatch();

  //   const addEmployee = () => {
  //     dispatch(addEmployeeActionCreator())
  //   }

  //   const deleteEmployee = () => {
  //     dispatch(deleteEmployeeActionCreator())
  //   }
  const [addemployeehidden, setaddemployeehidden] = useState(true);
  const [addemployeepos, setaddemployeepos] = useState([0,0]);
  const showAddEmployee = (e) => {
    setaddemployeehidden(!addemployeehidden);
    const pos = e.target.getBoundingClientRect();
    setaddemployeepos([pos.bottom, pos.left])
  }
  return (
    <div className="outerBox">
      <button onClick = {showAddEmployee}>Add Employee</button>
      <AddEmployeeBox hidden = {addemployeehidden} pos = {addemployeepos}/>
        
      {/* <button onClick = {() => {deleteEmployee()}}>Delete Employee</button> */}
      <Flow/>;{/* other components */}
    </div>
  );
}
export default MainContainer;
