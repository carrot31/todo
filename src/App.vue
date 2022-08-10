<template>

  <div class="container">
    <h1>To-Do List</h1>
      <form @submit.prevent="onSubmit">
        <div class="d-flex">
          <div class="flex-grow-1 mr-2">
          <input 
            class="form-control" 
            type="text" 
            v-model="todo" 
            placeholder="Type new to-do"
          />
        </div>
        <div>
          <button 
            class="btn btn-primary" 
            type="submit">
          Add
          </button>
        </div>    
        </div>
        <div v-show="hasError" style="color: red">This field can't be empty</div>
      </form>
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

export default {
  setup() {
		const todo = ref('');
    const todos = ref([]);
    const hasError = ref(false);
    const todoStyle = {
      textDecoration: 'line-through',
      color: 'gray',
    }

    const onSubmit = () => {
      if(todo.value===''){
        hasError.value = true;
      } else{
        todos.value.push({
        id: Date.now(), 
        subject: todo.value,
        completed: false,
      });
        hasError.value = false;
        todo.value='';
      }
    }

    const deleteTodo = (i) =>{
      todos.value.splice(i, 1);
    }
  
		return {
      todoStyle,
      hasError,
      todos,
			todo,
      onSubmit,
      deleteTodo,
		};
	},
}
</script>

<style>
.todo {
	color: gray;
  text-decoration: line-through;
}
</style>
