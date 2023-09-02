import * as types from '../constants/actionTypes';

/*
export const openDrawerActionCreator = currentView => ({
    type: types.OPEN_DRAWER,
    payload: currentView
})*/

export const addEmployeeActionCreator = inputData => ({ // inputData = {firstName: , lastName: , jobTitle: , email: , bossID: , shortBio: , salary: }
    type: types.ADD_EMPLOYEE,
    payload: inputData
})

export const findEmployeeActionCreator = inputData => ({ //inputData = {element: , value: }
    type: types.FIND_EMPLOYEE,
    payload: inputData
})

export const updateEmployeeActionCreator = inputData => ({ //inputData = {employeeID: , newEmployeeObject: }
    type: types.UPDATE_EMPLOYEE,
    payload: inputData
})

export const deleteEmployeeActionCreator = inputData => ({ //inputData = {employeeID: }
    type: types.DELETE_EMPLOYEE,
    payload: inputData
})