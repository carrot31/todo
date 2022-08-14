<template>
  <div class="card mt-2" v-for="(todo,index) in todos" :key="todo+index">
    <div 
    class="card-body p-2 d-flex align-items-center" 
    style="cursor: pointer"
    @click="moveToPage(todo.id)"
    >
      <div class="flex-grow-1">
        <input 
          class="ml-2 mr-2"
          type="checkbox"
          :checked="todo.completed"
          @change="toggleTodo(index, $event)"
          @click.stop
        />
        <span class="form-check-label" :class="{todo: todo.completed}">
          {{todo.subject}}
        </span>   
      </div>
      <div>
        <button 
          class="btn btn-danger btn-sm"
          @click.stop="deleteTodo(index)"
        >
        Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default{
  props: {
      todos: {
        type: Array,
        required: true,
      }
  },
  emits:['toggle-todo','delete-todo'],
  setup(props, {emit}){
    const router = useRouter();

    //완료-미완료 토글
    const toggleTodo = (index, event) =>{
        emit('toggle-todo', index, event.target.checked)
    };

    //삭제 버튼
    const deleteTodo = (index) => {
        emit('delete-todo',index)
    };

    //상세페이지 이동
    const moveToPage = (todoId) =>{
       //router.push('/todos/' + todoId)
       router.push({
        name: 'Todo',
        params: {
          id: todoId
        }
       })
    }
    return{
      toggleTodo,
      deleteTodo,
      moveToPage,
    }
  }
}
</script>

<style>

</style>