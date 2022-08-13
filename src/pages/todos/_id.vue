<template>
  <h1>To-do Page</h1>
  <div v-if="loading">Loading...</div>
  <form v-else @submit.prevent="onSave">
    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label>Todo Subject</label>
          <input v-model="todo.subject" type="text" class="form-control" />
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label>Status</label>
          <div>
            <button 
             type="button"
             class="btn"
             :class="todo.completed? 'btn-success': 'btn-danger'"
             @click="toggleTodoStatus"
             >
             {{ todo.completed? 'Completed': 'InCompleted' }}
             </button>
          </div>
        </div>  
      </div>

    </div>
    
    <button 
      type="submit" 
      class="btn btn-primary"
      :disabled="!todoUpdated"
    >
    Save
    </button>
    <button 
      type="submit" 
      class="btn btn-outline-dark ml-2"
      @click="moveToTodoListPage"
      >
      Cancel
    </button>
  </form>
</template>


<script>
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { ref, computed } from 'vue';
import _ from 'lodash';

  export default{
    setup(){
      const route = useRoute();
      const todoId = route.params.id
      const router = useRouter();
      const todo = ref(null);
      const originalTodo = ref(null);
      const loading = ref(true);

      //상세정보 가져오기
      const getTodo = async() =>{
        const res = await axios.get(`http://localhost:3000/todos/${todoId}`)
        todo.value = {...res.data};
        originalTodo.value = {...res.data};
        loading.value = false;
      };
      
      getTodo();

      //내용 변경 없을 시 Save버튼 막기
      const todoUpdated = computed(() => {
        return !_.isEqual(todo.value, originalTodo.value)
      })
      
      //완료-미완료 토글
      const toggleTodoStatus = () =>{
        todo.value.completed = !todo.value.completed
      }

      //Cancel 뒤로가기
      const moveToTodoListPage = () =>{
        router.push({
          name:'Todos'
        })
      }

      //데이터 수정
      const onSave = async() =>{
        const res = await axios.put(`http://localhost:3000/todos/${todoId}`, {
          subject: todo.value.subject,
          completed: todo.value.completed
        });

        originalTodo.value = {...res.data}
      }

      return{
        todo,
        originalTodo,
        loading,
        toggleTodoStatus,
        moveToTodoListPage,
        onSave,
        todoUpdated
      }
    }
  }
</script>


<style></style>