<template>
  <h1 v-bind:class='nameClass'>
    {{ name }}
  </h1>
  <input :type="type" :value="name"/>
	<button class="btn btn-primary" @click="updateName">Click</button>
</template>

<script>
import {ref} from 'vue';

export default {
  setup() {
		const name = ref('Kossie');
    const type = ref('number');
    const nameClass = ref('name')

    const updateName = () => {
      name.value = 'Mandu'
      type.value = 'text'
      nameClass.value = 'name'
    }

		return {
      nameClass,
      type,
			name,
      updateName,
			// greet,
		};
	},
}
</script>

<style>
.name {
	color: red;
}
</style>
