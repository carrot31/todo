<template>

  <div class="container">
    <h1>To-Do List</h1>
    <TodoSimpleForm @add-todo="addTodo" />
      <div v-if="!todos.length">
        추가된 Todo가 없습니다.
      </div>
      <div class="card mt-2" v-for="(todo,j) in todos" :key="todo+j">
        <div class="card-body p-2 d-flex">
          <div class="form-check flex-grow-1">
            <input 
              class="form-check-input" 
              type="checkbox"
              v-model="todo.completed"
            />
            <label class="form-check-label" :class="{todo: todo.completed}">
              {{todo.subject}}
            </label>   
          </div>
          <div>
            <button 
              class="btn btn-danger btn-sm"
              @click="deleteTodo(j)"
            >
            Delete
            </button>
          </div>
        </div>
      </div>
  </div>
  
</template>

<script>
import {ref} from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';

export default {
    component: {
        TodoSimpleForm,
    },
    setup() {
        const todos = ref([]);
        const todoStyle = {
            textDecoration: "line-through",
            color: "gray",
        };
        const addTodo = (todo) => {
            todos.value.push(todo)
        };
        const deleteTodo = (i) => {
            todos.value.splice(i, 1);
        };
        return {
            todoStyle,
            todos,
            addTodo,
            deleteTodo,
        };
    },
    components: { TodoSimpleForm }
}
</script>

<style>
.todo {
	color: gray;
  text-decoration: line-through;
}
</style>
