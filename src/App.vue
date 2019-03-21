<template>
  <div id="app">
    <About></About>
	<Student> </Student>
	<Teacher> </Teacher>
  </div>
</template>

<script>
import Teacher from '@/pages/teacher'
import Student from '@/pages/Index'
import About from '@/pages/about'

export default {
  name: 'app',
  components: {
    Teacher,
		Student,
		Teacher,
		About
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
