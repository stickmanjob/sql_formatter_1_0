<template>
  <div id="app">
    <sql-input/>
    <sql-output/>
  </div>
</template>

<script>
import SqlInput from './components/SqlInput.vue'
import SqlOutput from './components/SqlOutput.vue'

export default {
  name: 'app',
  components: {
    'sql-input' : SqlInput,
    'sql-output' : SqlOutput
  }
}
</script>

<style>
</style>
