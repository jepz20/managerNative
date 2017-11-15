import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_CREATE,
  EMPLOYEES_FETCH_SUCCESS,
  EMPLOYEE_SAVE_SUCCESS
} from './types'

export const employeeUpdate = ({ prop, value }) => ({
  type: EMPLOYEE_UPDATE,
  payload: { prop, value }
})

export const employeeCreate = (employeeData) => {
  return (dispatch) => {
    const { currentUser } = firebase.auth()
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
    .push({ ...employeeData })
    .then(() => {
      Actions.main({ type: 'reset' })
      dispatch({ type: EMPLOYEE_CREATE })
    })
    .catch((error) => console.log(error))
  }
}

export const employeesFetch = () => {
  const { currentUser } = firebase.auth()
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .on('value', snapshot => {
        dispatch({
          type: EMPLOYEES_FETCH_SUCCESS,
          payload: snapshot.val()
        })
      })
  }
}

export const employeeSave = ({ name, phone, shift, uid }) => {
  const { currentUser } = firebase.auth()
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .set({ name, phone, shift })
      .then(_ => {
        dispatch({ type: EMPLOYEE_SAVE_SUCCESS })
        Actions.main({ type: 'reset' })
      })
      .catch(error => console.log(error))
  }
}

export const employeeDelete = ({ uid }) => {
  const { currentUser } = firebase.auth()
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .remove()
      .then(_ => {
        Actions.main({ type: 'reset' })
      })
      .catch(error => console.log(error))
  }
}
