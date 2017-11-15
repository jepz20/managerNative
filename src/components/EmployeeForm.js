import React, { Component } from 'react'
import { View, Text, Picker } from 'react-native'
import { CardSection, Input } from './common'
import { connect } from 'react-redux'
import { employeeUpdate } from '../actions'

class EmployeeForm extends Component {
  render () {
    const { name, phone, shift, employeeUpdate } = this.props
    return (
      <View>
        <CardSection>
          <Input
            label='Name'
            placeholder='Jose'
            value={name}
            onChangeText={(value) => employeeUpdate({ prop: 'name', value })}
          />
        </CardSection>
        <CardSection>
          <Input
            label='Phone'
            placeholder='514-594-12345'
            value={phone}
            onChangeText={(value) => employeeUpdate({ prop: 'phone', value })}
          />
        </CardSection>
        <CardSection>
          <Text style={styles.pickerLabel}>Shift</Text>
          <Picker
            style={{ flex: 1 }}
            selectedValue={shift}
            onValueChange={value => employeeUpdate({ prop: 'shift', value })}
          >
            <Picker.Item label='Lunes' value='Lunes' />
            <Picker.Item label='Martes' value='Martes' />
            <Picker.Item label='Miercoles' value='Miercoles' />
            <Picker.Item label='Jueves' value='Jueves' />
            <Picker.Item label='Viernes' value='Viernes' />
            <Picker.Item label='Sabado' value='Sabado' />
            <Picker.Item label='Domingo' value='Domingo' />
          </Picker>
        </CardSection>
      </View>
    )
  }
}

const styles = {
  pickerLabel: {
    fontSize: 18,
    paddingLeft: 20
  }
}

const mapStateToProps = ({ employeeForm }) => ({
  name: employeeForm.name,
  phone: employeeForm.phone,
  shift: employeeForm.shift
})

export default connect(mapStateToProps, { employeeUpdate })(EmployeeForm)
