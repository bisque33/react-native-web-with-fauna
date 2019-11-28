import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, TextInput } from 'react-native'
import { ApolloClient, ApolloProvider, InMemoryCache, gql, HttpLink, useQuery, useMutation } from '@apollo/client'
import { GetUncompletedTodos, GetUncompletedTodos_todosByCompletedFlag_data } from './types/GetUncompletedTodos'
import { CreateTodo } from './types/CreateTodo'
import { CompleteTodo } from './types/CompleteTodo'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://graphql.fauna.com/graphql',
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_FAUNADB_API_KEY}`,
      'X-Schema-Preview': 'partial-update-mutation'
    }
  })
})

const GET_UNCOMPLETED_TODOS = gql`
  query GetUncompletedTodos {
    todosByCompletedFlag(completed: false) {
      data {
        _id
        title
        completed
      }
    }
  }
`

const CREATE_TODO = gql`
  mutation CreateTodo($title: String!) {
    createTodo(data: { title: $title, completed: false }) {
      _id
      title
      completed
    }
  }
`

const COMPLETE_TODO = gql`
  mutation CompleteTodo($id: ID!) {
    partialUpdateTodo(id: $id, data: { completed: true }) {
      _id
      title
      completed
    }
  }
`

const App = () => {
  return (
    <ApolloProvider client={client}>
      <TodoList />
    </ApolloProvider>
  )
}

const TodoForm = (props: { setNewTitle: (text: string) => void; onPress: () => void }) => {
  return (
    <View style={styles.container}>
      <TextInput style={[styles.text, { borderWidth: 1 }]} onChangeText={text => props.setNewTitle(text)}></TextInput>
      <TouchableOpacity>
        <Button title="Add" onPress={props.onPress} />
      </TouchableOpacity>
    </View>
  )
}

const TodoItem = (props: { item: GetUncompletedTodos_todosByCompletedFlag_data; onPress: (id: string) => void }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.item.title}</Text>
      <TouchableOpacity>
        <Button title="Complete" onPress={() => props.onPress(props.item._id)} />
      </TouchableOpacity>
    </View>
  )
}

const TodoList = () => {
  const [newTitle, setNewTitle] = useState('')
  const { loading, error, data, refetch } = useQuery<GetUncompletedTodos>(GET_UNCOMPLETED_TODOS)
  const [createTodo] = useMutation<CreateTodo>(CREATE_TODO)
  const [completeTodo] = useMutation<CompleteTodo>(COMPLETE_TODO)

  if (loading) return <Text>Loading...</Text>
  if (error) {
    return <Text>Error : {error}</Text>
  }
  const onCreted = async () => {
    console.log('click onCreate()')
    await createTodo({ variables: { title: newTitle } })
    await refetch()
  }
  const onCompleted = async (id: string) => {
    console.log('click onCompleted()', id)
    await completeTodo({ variables: { id: id } })
    await refetch()
  }

  return (
    <View style={styles.app}>
      <Text style={styles.title}>TODO List</Text>
      <TodoForm setNewTitle={setNewTitle} onPress={onCreted}></TodoForm>
      <FlatList
        data={data!.todosByCompletedFlag.data}
        renderItem={({ item }) => <TodoItem item={item!} onPress={onCompleted} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  app: {
    marginHorizontal: 'auto',
    maxWidth: 500
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginBottom: 10
  },
  title: {
    fontSize: 30
  },
  text: {
    width: 400,
    fontSize: 20,
    borderBottomWidth: 1,
    marginRight: 10
  }
})

export default App
