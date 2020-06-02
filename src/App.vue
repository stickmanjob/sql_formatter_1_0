<template>
  <div id="app">
    <!-- <div v-on:click="copySqlOutputData" draggable="true">
      <button>コピー</button>
    </div>
    <div class="container">
      <button id="button" v-on:click="copySqlOutputData" ></button>
    </div> -->
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
  },
  methods: {  
    copySqlOutputData: function(){

      document.getElementById("button").classList.add("validate")      // アニメーション開始

      let textBox = document.createElement("textarea")
      textBox.setAttribute("id", "target")
      textBox.setAttribute("type", "hidden")
      textBox.textContent = this.$store.state.sqlOutputData
      document.body.appendChild(textBox)

      textBox.select()
      document.execCommand('copy')
      document.body.removeChild(textBox);

      //document.getElementById("button").classList.remove("validate")      // アニメーション終了
    }
  }
}
</script>

<style lang="scss">
$green: #1ECD97;
$gray: #bbbbbb;
* {
  font-family: 'Roboto', sans-serif;
}
.container {
  position: absolute;
  top:50%;
  left:50%;
  margin-left: -65px;
  margin-top: -20px;
  width: 130px;
  height: 40px;
  text-align: center;
}
button {
  outline:none;
  height: 40px;
  text-align: center;
  width: 130px;
  border-radius:40px;
  background: #fff;
  border: 2px solid $green;
  color:$green;
  letter-spacing:1px;
  text-shadow:0;
  font: {
    size:12px;
    weight:bold;
  }
  cursor: pointer;
  transition: all 0.25s ease;
  &:hover {
    color:white;
    background: $green;
  }
  &:active {
    //letter-spacing: 2px;
    letter-spacing: 2px ;
  }
  &:after {
    content:"SUBMIT";
  }
}
.onclic {
  width: 40px;
  border-color:$gray;
  border-width:3px;
  font-size:0;
  border-left-color:$green;
  animation: rotating 2s 0.25s linear infinite;

  &:after {
    content:"";
  }
  &:hover {
    color:$green;
    background: white;
  }
}
.validate {
  font-size:13px;
  color: white;
  background: $green;
  &:after {
    font-family: 'Roboto', sans-serif;
    content:"OK";
  }
}

@keyframes rotating {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
