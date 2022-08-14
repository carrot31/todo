<template>
  <Modal>
    <template #title>
        Delete Todo!!!
      </template>
      <template #body>
        R u sure to delete this?
      </template>
      <template #footer>
        <button 
          type="button" 
          class="btn btn-secondary" 
          data-dismiss="modal"
          @click="onClose"
        >Close</button>
        <button 
          type="button" 
          class="btn btn-danger"
          @click="onDelete"
        >Delete</button>     
      </template>
  </Modal>
</template>


<script>
import Modal from '@/components/Modal.vue'

export default{
  components:{
    Modal,
  },
  setup(porps, {emit}){
    const onClose = () =>{
      emit('close')
    }

    const onDelete = () =>{
      emit('delete')
    }


    return{
      onClose,
      onDelete
    }
  }
}

</script>


<style>
</style>