<template>
  <div v-if="loading">Loading...</div>
  <form v-else @submit.prevent="onSave">
    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label>Todo Subject</label>
          <input 
            v-model="todo.subject" 
            type="text" 
            class="form-control"
           />
           <div v-if="subjectError" style="color:red">
            {{subjectError}}
           </div>
        </div>
      </div>
      <div class="col-6" v-if="editing">
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
      <div class="col-12">
        <div class="form-group">
          <label>Body</label>
          <textarea 
            v-model="todo.body" 
            class="form-control" 
            cols="30" rows="10"
          ></textarea>
        </div>  
      </div>

    </div>
    
    <button 
      type="submit" 
      class="btn btn-primary mt-3"
      :disabled="!todoUpdated"
    >
    {{editing? 'Update':'Create'}}
    </button>
    <button 
      type="submit" 
      class="btn btn-outline-dark mt-3 ml-3"
      @click="moveToTodoListPage"
      >
      Cancel
    </button>
  </form>
  <Toast v-if="showToast" :message="toastMessage" :type="toastAlertType"/>
  <div id="mandu">mandu</div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { ref, computed } from 'vue';
import _ from 'lodash';
import Toast from '@/components/Toast.vue';
import {useToast} from '@/composables/toast';


  export default{
    props:{
      editing:{
        type: Boolean,
        default: false,
      },

    },
    components: {
        Toast,
    },
    setup(props) {
        const route = useRoute();
        const todoId = route.params.id;
        const router = useRouter();
        const todo = ref({subject:'', completed: false, body:''});
        const originalTodo = ref(null);
        const loading = ref(false);
        const subjectError = ref('');

        const {
          showToast,
          toastMessage,
          toastAlertType,
          triggerToast,
        } = useToast();


        //상세정보 가져오기
        const getTodo = async () => {
          try{
            const res = await axios.get(`http://localhost:3000/todos/${todoId}`);
            todo.value = { ...res.data };
            originalTodo.value = { ...res.data };
            loading.value = false;
          } catch (err) {
            loading.value = false;
            console.log(err);
            triggerToast('Sth went wrong!', 'danger')
          }
        };

        if(props.editing){
          getTodo();
        }
        
        //내용 변경 없을 시 Save버튼 막기
        const todoUpdated = computed(() => {
            return !_.isEqual(todo.value, originalTodo.value);
        });

        //완료-미완료 토글
        const toggleTodoStatus = () => {
            todo.value.completed = !todo.value.completed;
        };

        //Cancel 뒤로가기
        const moveToTodoListPage = () => {
            router.push({
                name: "Todos"
            });
        };

        //데이터 수정
        const onSave = async () => {
          if(!todo.value.subject){
            subjectError.value='Subject is required!'
            return
          }
          try{
            let res;
            const data = {
              subject: todo.value.subject,
              completed: todo.value.completed,
              body: todo.value.body,
            }
              if(props.editing){
                res = await axios.put(`http://localhost:3000/todos/${todoId}`, data);
                originalTodo.value = { ...res.data };
              }else{
                res = await axios.post('http://localhost:3000/todos', data);
                todo.value.subject ='';
                todo.value.body='';
              }
            const message = 'Successfully ' + (props.editing? 'Updated!':'Created!')
            triggerToast(message);

          } catch (err) {
            console.log(err);
            triggerToast('Sth went wrong!', 'danger');
          }
            
        };

        return {
            todo,
            originalTodo,
            loading,
            toggleTodoStatus,
            moveToTodoListPage,
            onSave,
            todoUpdated,
            showToast,
            toastMessage,
            toastAlertType,
            subjectError,
        };
    },
}

</script>

<style>

</style>
