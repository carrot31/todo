<template>

  <div class="container">
    <h1>To-Do List</h1>
    <input 
      class="form-control" 
      type="text" 
      v-model="searchText" 
      placeholder="Search"
    />
    <hr/>
    <TodoSimpleForm @add-todo="addTodo" />
    <div style="color:red">{{error}}</div>
      <div v-if="!filteredTodos.length">
        There is nothing to display
      </div>
    <TodoList 
      :todos="filteredTodos" 
      @toggle-todo="toggleTodo" 
      @delete-todo="deleteTodo"/>  
  </div>
  
</template>

<script>
import {ref, computed} from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';
import axios from 'axios';

export default {
    component: {
        TodoSimpleForm,
        TodoList,
    },
    setup() {
        const todos = ref([]);
        const todoStyle = {
            textDecoration: "line-through",
            color: "gray",
        };
        const error = ref('');
        const addTodo = (todo) => {
            //데이터베이스 todo 저장
            error.value='';
            axios.post('http://localhost:3000/todos', {
              subject: todo.subject,
              completed: todo.completed,
            }).then(res=>{
              console.log(res)
              todos.value.push(res.data)
            }).catch(err =>{
              console.log(err)
              error.value='Sth went wrong'
            })
        };
        const toggleTodo = (index) => {
            todos.value[index].completed = !todos.value[index].completed
        };
        const deleteTodo = (index) => {
            todos.value.splice(index, 1);
        };
        const searchText = ref('');
        const filteredTodos = computed(() => {
            if(searchText.value){
              return todos.value.filter(todo => 
              todo.subject.includes(searchText.value));
            }
            return todos.value;
        });
        return {
            todoStyle,
            todos,
            addTodo,
            toggleTodo,
            deleteTodo,
            searchText,
            filteredTodos,
            error,
        };
    },
    components: { TodoSimpleForm, TodoList }
}
</script>

<style>
.todo {
	color: gray;
  text-decoration: line-through;
}
</style>
