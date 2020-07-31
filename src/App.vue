<template>
    <div id="app">
      <router-view></router-view>
    </div>
</template>

<script>

import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;

export default {
  name: 'app',
  data(){
    return {
        msg: 'MedBlocks'
    }
  }
}

</script>

<style>
  @import '/src/assets/css/page.min.css';
  @import '/src/assets/css/style.css';
  .card-1{
    color: #fff;
    background-color: #ff4954;
  }
  .card-1 .fa, .card-2 .fa{
    color: #fff
  }
  .card-2{
    color: #fff;
    background-color: #ffba00;
  }
</style>
