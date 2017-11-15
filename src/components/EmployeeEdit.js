import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import { Card, CardSection, Button, Confirm } from './common'
import { employeeCreate, employeeUpdate, employeeSave, employeeDelete } from '../actions'
import EmployeeForm from './EmployeeForm'
import Communications from 'react-native-communications'

class EmployeeEdit extends Component {
  state = {
    error: false,
    showModal: false
  }

  componentWillMount () {
    const { employee } = this.props
    if (!employee) {
      return this.setState({ error: true })
    }
    Object.keys(employee).map(key => {
      this.props.employeeUpdate({ prop: key, value: employee[key] })
    })
  }

  onButtonPress () {
    const { name, phone, shift, employee } = this.props
    this.props.employeeSave({ name, phone, shift, uid: employee.uid })
  }

  onTextPress () {
    const { name, phone, shift } = this.props
    Communications.text(phone, `Hi ${name}. Your upcoming shift is on ${shift}`)
  }

  onAccept () {
    this.props.employeeDelete({ uid: this.props.employee.uid })
  }

  onDecline () {
    this.setState({ showModal: false })
  }

  render () {
    if (this.state.error) {
      return <View><Text>Error Loading the User!!!</Text></View>
    }

    return (
      <Card>
        <EmployeeForm {...this.props} />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>Save Changes</Button>
        </CardSection>
        <CardSection>
          <Button onPress={this.onTextPress.bind(this)}>Text Schedule</Button>
        </CardSection>
        <CardSection>
          <Button onPress={() => this.setState({ showModal: !this.state.showModal })} >
            Fire Employee
          </Button>
        </CardSection>
        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
          >
          Are you sure you want to delete {this.props.name}?
        </Confirm>
      </Card>
    )
  }
}

const mapStateToProps = ({ employeeForm }) => ({
  name: employeeForm.name,
  phone: employeeForm.phone,
  shift: employeeForm.shift
})

export default connect(mapStateToProps, { employeeCreate, employeeUpdate, employeeSave, employeeDelete })(EmployeeEdit)
