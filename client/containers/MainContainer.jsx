import React from 'react';
import ReactDOM from 'react-dom';
import Flow from '../components/Chart.jsx';
import { useDispatch } from 'react-redux';

function MainContainer() {

  const dispatch = useDispatch();

    const addEmployee = () => {
      dispatch(addEmployeeActionCreator())
    }

    const deleteEmployee = () => {
      dispatch(deleteEmployeeActionCreator())
    }

  return (
    <div className="outerBox">
      <button onClick = {() => {addEmployee()}}>Add Employee</button>
      <button onClick = {() => {deleteEmployee()}}>Delete Employee</button>
      <Flow/>;{/* other components */}
    </div>
  );
}
export default MainContainer;
