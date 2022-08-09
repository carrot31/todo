<template>
  <div class="name">{{ name }}</div>
	<button class="btn btn-primary">Click</button>
</template>

<script>

export default {
  setup() {
		const name = 'Kossie Coder';

		// const greeting = name => {
		// 	return 'Hello, ' + name;
		// };

		// const greet = greeting(name);

		return {
			name,
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
