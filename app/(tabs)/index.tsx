import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, FlatList, Modal, Alert, Pressable } from 'react-native'
import React, { useState } from 'react'

const Home = () => {
  const [input, setInput] = useState('');
  const [todo, setTodo] = useState<string[]>(['hello world'])
  const [modalVisible, setModalVisible] = useState(false);
  const [updateInput, setUpdateInput] = useState('')
  const [index, setIndex] = useState(0)


  // addtodo
  const addTodo = () => {
    console.log(input);
    todo.push(input);
    setTodo([...todo])
    setInput('')
  }

  // deleteTodo
  const deleteTodo = (index: number) => {
    console.log('todo deleted', index)
    todo.splice(index, 1);
    setTodo([...todo])
  }

  const editTodo = (index: number) => {
    console.log(updateInput, index)
    todo.splice(index , 1 , updateInput)
    setTodo([...todo])
    setModalVisible(false)
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Todo App</Text>
      <TextInput
        style={styles.input}
        onChangeText={setInput}
        value={input}
        placeholder='Enter a new task'
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={styles.button} onPress={addTodo}>
        <Text style={styles.buttonText}>Add Todo</Text>
      </TouchableOpacity>

      {todo.length > 0 ? (
        <FlatList
          style={{ marginTop: 20 }}
          data={todo}
          renderItem={({ item, index }) => {
            return <View style={styles.item}>
              <Text style={styles.title}>{item}</Text>
              <View style={styles.actions}>
                <TouchableOpacity style={styles.actionButton} onPress={() => deleteTodo(index)} activeOpacity={0.5}>
                  <Text style={styles.actionText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={() => {
                  setIndex(index)
                  setModalVisible(true)
                }}>
                  <Text style={styles.actionText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={styles.noTodoText}>No Todos Found...</Text>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Update Todo!</Text>
            <TextInput
              style={styles.updateInput}
              onChangeText={setUpdateInput}
              value={updateInput}
              placeholder="Edit task"
            />
            <Pressable style={styles.modalButton} onPress={() => editTodo(index)}>
              <Text style={styles.modalButtonText}>Update</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#f0f4f7'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#0066CC',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: '#FF6B6B',
    padding: 8,
    borderRadius: 6,
  },
  actionText: {
    color: 'white',
    fontSize: 14,
  },
  noTodoText: {
    color: '#333',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    width: 300,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    color: '#333',
  },
  updateInput: {
    width: '100%',
    height: 40,
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#0066CC',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})

export default Home
