<template>
  <div id="app">
    <Teacher></Teacher>
  </div>
</template>

<script>
import Teacher from '@/pages/teacher'
export default {
  name: 'app',
  components: {
    Teacher
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
  margin-top: 60px;
}
</style>
