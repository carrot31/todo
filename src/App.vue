<template>

  <div class="container">
    <h1>To-Do List</h1>
    <!-- search 입력창 -->
    <input 
      class="form-control" 
      type="text" 
      v-model="searchText" 
      placeholder="Search"
    />
    <hr/>
    <!-- todo 입력창 -->
    <TodoSimpleForm @add-todo="addTodo" />
    <div style="color:red">{{error}}</div>
      <div v-if="!filteredTodos.length">
        There is nothing to display
      </div>
    <!-- todo 리스트 -->
    <TodoList 
      :todos="filteredTodos" 
      @toggle-todo="toggleTodo" 
      @delete-todo="deleteTodo"/>  

    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" v-if="currentPage !== 1">
          <a style="cursor: pointer" class="page-link" @click="getTodos(currentPage-1)" >Previous</a>
        </li>
        <li class="page-item" :class="currentPage === page ? 'active': ''"
          v-for="(page, index) in numberOfPages" :key="page+index">
          <a style="cursor: pointer" class="page-link" @click="getTodos(page)">{{page}}</a>
        </li>
        <li class="page-item" v-if="numberOfPages !== currentPage">
          <a style="cursor: pointer" class="page-link" @click="getTodos(currentPage+1)">Next</a>
        </li>
      </ul>
    </nav>
  </div>
  
</template>

<script>
import {ref, computed} from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';
import axios from 'axios';

export default {
    setup() {
        const todos = ref([]);
        const todoStyle = {
            textDecoration: "line-through",
            color: "gray",
        };
        const error = ref('');
        const numberOfTodos = ref(0);
        const limit = 5;
        const currentPage = ref(1);

        const numberOfPages = computed(()=>{
          return Math.ceil(numberOfTodos.value/limit);
        })

        //DB에서 데이터 가져오기
        const getTodos = async (page = currentPage.value) =>{
          currentPage.value = page;
          error.value='';
          try{
            const res = await axios.get(
              `http://localhost:3000/todos?_page=${page}&_limit=${limit}`,{
                
              }
            );
            numberOfTodos.value = res.headers['x-total-count'];
            todos.value = res.data
          } catch(err){
            console.log(err)
            error.value='Sth went wrong'
          }
          
        }
        getTodos();

        //DB에 데이터 추가
        const addTodo = async (todo) => {
            //데이터베이스 todo 저장
            error.value='';
            try{
              const res = await axios.post('http://localhost:3000/todos', {
                subject: todo.subject,
                completed: todo.completed,
            })
            todos.value.push(res.data)
            } catch (err){
              console.log(err)
              error.value='Sth went wrong'
            }
        };
        
        //DB에 completed 반영
        const toggleTodo = async (index) => {
          error.value='';
          const id = todos.value[index].id
            try{
              await axios.patch('http://localhost:3000/todos/' + id, {
                completed: !todos.value[index].completed
              })
              todos.value[index].completed = !todos.value[index].completed
            } catch (err){
              console.log(err)
              error.value='Sth went wrong'
            }
            
        };

        //DB에 데이터 삭제
        const deleteTodo = async (index) => {
          error.value='';
          const id = todos.value[index].id
          try{
            await axios.delete('http://localhost:3000/todos/' +id)
            todos.value.splice(index, 1); 
          } catch(err){
            console.log(err)
            error.value='Sth went wrong'
          }
        };

        //데이터 검색
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
            getTodos,
            numberOfPages,
            currentPage,
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
