import React from 'react'
import { Text, View, Modal } from 'react-native'
import { CardSection } from './CardSection'
import { Button } from './Button'

const Confirm = ({ children, onAccept, onDecline, visible }) => {
  return (
    <Modal
      animationType='slide'
      onRequestClose={() => {}}
      transparent
      visible={visible}
    >
      <View style={styles.container}>
        <CardSection>
          <Text style={styles.text}>
            {children}
          </Text>
        </CardSection>
        <CardSection>
          <Button onPress={onAccept}>Yes</Button>
          <Button onPress={onDecline}>No</Button>
        </CardSection>
      </View>
    </Modal>
  )
}

const styles = {
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
    lineHeight: 40
  },
  cardSection: {
    justifyContent: 'center'
  }
}

export { Confirm }
