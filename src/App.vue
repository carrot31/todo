<template>

  <div class="container">
    <h1>To-Do List</h1>
      <form 
        @submit.prevent="onSubmit"
        class="d-flex">
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
      </form>
      <div class="card mt-2" v-for="(todo,j) in todos" :key="todo+j">
        <div class="card-body p-2">
          {{todos[j].subject}}
        </div>
      </div>
  </div>
  
</template>

<script>
import {ref} from 'vue';

export default {
  setup() {
		const todo = ref('');
    const todos = ref([{id:1, subject: '휴대폰사기'},{id:2, subject: '장보기'}]);

    const onSubmit = () => {
      todos.value.push(
        {
        id: Date.now(), 
        subject: todo.value
      })
    }

		return {
      todos,
			todo,
      onSubmit,
		};
	},
}
</script>

<style>
.todo {
	color: red;
}
</style>
