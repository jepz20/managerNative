import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardSection, Button } from './common'
import { employeeCreate } from '../actions'
import EmployeeForm from './EmployeeForm'

class EmployeeCreate extends Component {
  onButtonPress () {
    const { name, phone, shift, employeeCreate } = this.props
    employeeCreate({ name, phone, shift: shift || 'Monday' })
  }

  render () {
    return (
      <Card>
        <EmployeeForm {...this.props} />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>Create</Button>
        </CardSection>
      </Card>
    )
  }
}

const mapStateToProps = ({ employeeForm }) => ({
  name: employeeForm.name,
  phone: employeeForm.phone,
  shift: employeeForm.shift
})

export default connect(mapStateToProps, { employeeCreate })(EmployeeCreate)
