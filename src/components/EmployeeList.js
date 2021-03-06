import React, { Component } from 'react'
import { ListView } from 'react-native'
import { connect } from 'react-redux'
import { employeesFetch } from '../actions'
import ListItem from './ListItem'

class EmployeeList extends Component {
  componentWillMount () {
    this.props.employeesFetch()
    this.createDataSource(this.props)
  }
  componentWillReceiveProps (nextProps) {
    if (this.props === nextProps) return
    this.createDataSource(nextProps)
  }

  createDataSource ({ employees }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.dataSource = ds.cloneWithRows(employees)
  }

  renderRow (employee) {
    return <ListItem employee={employee} />
  }

  render () {
    return (
      <ListView
        style={{ flex: 1 }}
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    )
  }
}

const mapStateToProps = ({ employees }) => ({
  employees: Object.keys(employees).map(key => ({ ...employees[key], uid: key }))
})

export default connect(mapStateToProps, { employeesFetch })(EmployeeList)
