import React, { useState, useEffect } from "react";

const EmployeeInfoBox = (props) => {
    async function deleteHandler(){
        const response = await fetch('/api/'+props.data.id, 
        {   method: 'DELETE',

        });
        console.log(response.status);
        if(response.status === 200){
            await props.deleteNode(props.data.id);
        }
    }

    return (
        <div hidden={props.hidden} style={{zIndex:3}}> 
            <label>First Name: {props.data.firstname}</label> <br></br>
            <label>Last Name: {props.data.lastname}</label> <br></br>
            <label>Job Title: {props.data.jobtitle}</label> <br></br>
            <label>Date Hired: {props.data.datehired}</label> <br></br>
            <label>Email: {props.data.email}</label> <br></br>
            <label>Short Bio: {props.data.shortbio}</label> <br></br>
            <label>Salary: {props.data.salary}</label> <br></br>
            <button onClick={deleteHandler}>Delete This Employee</button>
        </div>
    )
}

export default EmployeeInfoBox;
