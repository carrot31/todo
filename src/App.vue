<template>

  <div class="container">
    <h4>count: {{count}}</h4>
    <h4>doubleCount: {{doubleCount}}</h4>
    <h4>doubleCountMethod: {{doubleCountMethod()}}</h4>
    <button @click="count++">Click</button>
    <h1>To-Do List</h1>
    <TodoSimpleForm @add-todo="addTodo" />
      <div v-if="!todos.length">
        추가된 Todo가 없습니다.
      </div>
    <TodoList 
      :todos="todos" 
      @toggle-todo="toggleTodo" 
      @delete-todo="deleteTodo"/>  
  </div>
  
</template>

<script>
import {ref, computed} from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';

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
        const addTodo = (todo) => {
            todos.value.push(todo)
        };
        const toggleTodo = (index) => {
            todos.value[index].completed = !todos.value[index].completed
        };
        const deleteTodo = (index) => {
            todos.value.splice(index, 1);
        };
        const count = ref(1);
        //함수 vs computed 
        //computed는 인자로 받아올 수 x => computed안에 ref가 실행되거나 값이 변경될때만 변경됌 
        //computed는 값을 캐쉬함! 
        const doubleCount = computed(()=>{
          console.log('computed')
          return count.value*2
        })
        const doubleCountMethod = () =>{
          console.log('method')
          return count.value*2;
        }
        return {
            todoStyle,
            todos,
            addTodo,
            toggleTodo,
            deleteTodo,
            count,
            doubleCount,
            doubleCountMethod,
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
