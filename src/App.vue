<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <!-- router-link/to: 리로딩 없이 페이지이동 -->
    <router-link class="navbar-brand" :to="{name:'Home'}">Mandu</router-link>

    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link class="nav-link" :to="{name:'Todos'}">Todos</router-link>
      </li>
    </ul>
  </nav>

  <div class="container">
    <router-view/>
  </div>
  
  
</template>

<script>
export default {
}
</script>

<style>
</style>
