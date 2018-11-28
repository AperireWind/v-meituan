<template>
  <div class="seller">
    <app-todomvc>123</app-todomvc>
  </div>
</template>

<script>
import TodoMVC from '../todoMVC/todoMVC'
export default {
  components:{
    "app-todomvc": TodoMVC
  }
}
</script>

<style>
.seller{
  width: 100%;
  height: 100%;
}
</style>
