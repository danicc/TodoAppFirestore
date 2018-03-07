import React from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight,
  TextInput
} from 'react-native';
import firebase from 'react-native-firebase';

const addIcon = require('../icons/icons-add.png');

export default class TodoComponent extends React.Component {
  constructor(props) {
    super(props);

    this.ref = firebase.firestore().collection('todos');

    this.state = {
      todoTasks: [],
      newTaskName: '',
      loading: true
    };
  }

  componentDidMount() {
    this.unsuscribe = this.ref.onSnapshot(this.onTodosUpdate);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onTodosUpdate = querySnapshot => {
    const todos = [];

    querySnapshot.forEach(doc => {
      todos.push({
        taskName: doc.data().taskName
      });
    });

    this.setState({
      todoTasks: todos.sort((a, b) => a.taskName > b.taskName),
      loading: false
    });
  };

  addTodo = async () => {
    try {
      await this.ref.add({
        taskName: this.state.newTaskName
      });
    } catch (exception) {
      console.log(exception);
    } finally {
      this.setState({
        newTaskName: ''
      });
    }
  };

  render() {
    if (this.state.loading) {
      return null; //render loading view
    }

    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: 'tomato',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            height: 64
          }}
        >
          <TextInput
            style={{
              height: 40,
              width: 200,
              margin: 10,
              padding: 10,
              borderColor: 'white',
              borderWidth: 1,
              color: 'white'
            }}
            keyboardType="default"
            placeholderTextColor="white"
            placeholder="Enter task name"
            autoCapitalize="none"
            onChangeText={text => {
              this.setState({ newTaskName: text });
            }}
          />
          <TouchableHighlight
            style={{ marginRight: 10 }}
            underlayColor="tomato"
            onPress={() => this.addTodo()}
          >
            <Image style={{ width: 35, height: 35 }} source={addIcon} />
          </TouchableHighlight>
        </View>
        <FlatList
          data={this.state.todoTasks}
          renderItem={({ item }) => (
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                margin: 40
              }}
            >
              {item.taskName}
            </Text>
          )}
          keyExtractor={item => item.taskName}
        />
      </View>
    );
  }
}
