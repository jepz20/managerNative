import React from 'react'
import { Scene, Router, Stack, Actions } from 'react-native-router-flux'
import LoginForm from './components/LoginForm'
import EmployeeList from './components/EmployeeList'
import EmployeeCreate from './components/EmployeeCreate'
import EmployeeEdit from './components/EmployeeEdit'

const RouterComponent = () => (
  <Router sceneStyle={{ paddingTop: 5 }}>
    <Stack key='root' hideNavBar>
      <Stack key='auth' initial>
        <Scene key='login' title='Please Login' component={LoginForm} />
      </Stack>
      <Stack key='main'>
        <Scene
          key='employeeList'
          component={EmployeeList}
          title='Employees'
          onRight={() => Actions.employeeCreate()}
          rightTitle='Add'
          initial
        />
        <Scene
          key='employeeCreate'
          component={EmployeeCreate}
          title='Create Employee'
        />
        <Scene
          key='employeeEdit'
          component={EmployeeEdit}
          title='Edit Employee'
        />
      </Stack>
    </Stack>
  </Router>
)

export default RouterComponent
