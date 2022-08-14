<template>
  <div 
    class="card mt-2" 
    v-for="(item,index) in items" 
    :key="item+index"
  >
    <slot :item="item" :index="index"></slot>
  </div>

</template>

<script>


export default{
  components:{

  },
  props:{
    items:{
      type: Array,
      required: true,
    }
  },
  setup(props, {emit}){

    return{

    }
  }
}
</script>

<style>

</style>