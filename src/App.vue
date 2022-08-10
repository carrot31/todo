<template>
  <!-- v-if는 토글 시 비용 多 => 런타임동안 조건이 거의 바뀌지 않을 때 , 
  v-show 초기 렌더 시 비용 多 => 토글 자주할 때, -->
  <div v-if="toggle">true</div>
  <div v-else>false</div>
  <button @click="onToggle" class="btn btn-primary" >Toggle</button>

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
    const toggle =ref(false);
		const todo = ref('');
    const todos = ref([{id:1, subject: '휴대폰사기'},{id:2, subject: '장보기'}]);
    const hasError = ref(false);


    const onSubmit = () => {
      if(todo.value===''){
        hasError.value = true;
      } else{
        todos.value.push({
        id: Date.now(), 
        subject: todo.value
      });
        hasError.value = false;
      }
    }

    const onToggle = () => {
      toggle.value = !toggle.value;
    }

  
		return {
      hasError,
      toggle,
      todos,
			todo,
      onSubmit,
      onToggle,
		};
	},
}
</script>

<style>
.todo {
	color: red;
}
</style>
