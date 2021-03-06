import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text } from 'react-native'
import { emailChanged, passwordChanged, loginUser } from '../actions'
import { Card, CardSection, Input, Button, Spinner } from './common'

class LoginForm extends Component {
  onEmailChange (text) {
    this.props.emailChanged(text)
  }
  onPasswordChange (text) {
    this.props.passwordChanged(text)
  }
  onButtonPress () {
    const { email, password } = this.props
    this.props.loginUser({ email, password })
  }
  renderButton () {
    if (this.props.loading) {
      return <Spinner size='small' />
    }
    return <Button onPress={this.onButtonPress.bind(this)}>Login</Button>
  }

  render () {
    console.log(this.props, 'STATE')
    return (
      <Card>
        <CardSection>
          <Input
            label='Email'
            placeholder='test@test.com'
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>
        <CardSection>
          <Input
            label='Password'
            placeholder='Your password'
            value={this.props.password}
            onChangeText={this.onPasswordChange.bind(this)}
            secureTextEntry
          />
        </CardSection>
        {!!this.props.error &&
          <Text style={styles.error}>
            {this.props.error}
          </Text>
        }
        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    )
  }
}

const styles = {
  error: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
    backgroundColor: '#fff'
  }
}
const mapStateToProps = ({ auth }) => ({
  email: auth.email,
  password: auth.password,
  error: auth.error,
  loading: auth.loading
})

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm)
