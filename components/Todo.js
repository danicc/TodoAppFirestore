import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';

export default class Todo extends React.PureComponent {
  toggleComplete() {
    this.props.doc.ref.update({
      isCompleted: !this.props.isCompleted
    });
  }

  render() {
    return (
      <TouchableHighlight onPress={() => this.toggleComplete()}>
        <View
          style={{
            flex: 1,
            height: 48,
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <View style={{ flex: 8 }}>
            <Text>{this.props.taskName}</Text>
          </View>
          <View style={{ flex: 2 }}>
            {this.props.isCompleted && <Text>COMPLETE</Text>}
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
