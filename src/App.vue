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
</style>
