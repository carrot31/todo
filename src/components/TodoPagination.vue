<template>
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

</template>


<script>
import { emit } from 'process';
import { ref, computed } from 'vue';
export default{ 
  props:{

  },
  emits: ['get-Todos'],
  setup(){
        const numberOfTodos = ref(0);
        const limit = 5;
        const currentPage = ref(1);

        const numberOfPages = computed(()=>{
          return Math.ceil(numberOfTodos.value/limit);
        })
    //DB에서 데이터 가져오기
        const getTodos = () =>{
          emit('get-todos', currentPage.value)
        }
    return{
      getTodos,
      numberOfPages,
      currentPage
    }
  }

}

</script>


<style>
</style>