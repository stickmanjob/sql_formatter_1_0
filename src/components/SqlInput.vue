<template>
  <div>
    <div>変換前</div>
    <textarea v-model="sqlInputData"></textarea>
  </div>
</template>

<script>
export default {
  name: 'SqlInput',
  computed: {
    sqlInputData: {
      get () {
        return this.$store.state.sqlInputData
      },
      set (value) {
        this.$store.commit('updateSqlInputData', value)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
