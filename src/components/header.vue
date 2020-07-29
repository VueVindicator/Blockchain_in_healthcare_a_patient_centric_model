<template>
    <div class="Header">
        <nav class="navbar navbar-expand-lg navbar-light navbar-stick-dark" data-navbar="sticky">
            <div class="container">
                <div class="row">
      
                    <section class="col-lg-5 navbar-mobile">
                        <nav class="nav nav-navbar mr-auto">
                            <a class="nav-link" href="#">Docs</a>
                            <!-- <a class="nav-link active" href="#">Patient</a>
                            <a class="nav-link" href="#">Doctor</a> -->
                            <router-link class="nav-link" to="/blockchain-route">Block Explorer</router-link>
                        </nav>
                    </section>
      
                    <div class="col-auto col-lg-auto1 mr-auto mx-lg-auto d-flex align-items-center">
                        <button class="navbar-toggler" type="button"><span class="navbar-toggler-icon"></span></button>
                        <a class="navbar-brand" href="#">
                            <p>MedBlocks</p>
                            <!-- <img class="logo-dark" src="../assets/img/logo-dark.png" alt="logo">
                            <img class="logo-light" src="../assets/img/logo-light.png" alt="logo"> -->
                        </a>
                    </div>
      
                    <div class="col-auto col-lg-5 text-right">
                        <router-link to="/login" class="btn btn-sm btn-round btn-outline-success d-none d-lg-inline-block mr-2">Sign in</router-link>
                        <router-link to="/register" class="btn btn-sm btn-round btn-success">Sign up</router-link>
                    </div>
      
                </div>
            </div>
        </nav>
      
        <header class="header text-white h-fullscreen pb-0 overflow-hidden" style="background-image: url(/src/assets/img/vector/16.png); background-color: #262a37;">
            <div class="overlay opacity-95" style="background-image: linear-gradient(to bottom, #09203f 0%, #537895 100%);"></div>
                <div class="container text-center">
                    <div class="row align-items-center h-100">
      
                    <div class="col-md-8 mx-auto">
                        <h1>Medblocks: Blockchain in Healthcare</h1>
                        <p class="lead mt-4 mb-7">The secure solution to health records management using blockchain</p>
                        <a class="btn btn-xl btn-round btn-primary px-8" href="#">Try For Free</a>
                    </div>
      
                    <div class="col-md-8 mx-auto align-self-end">
                        <img class="mt-7" src="/src/assets/img/preview/laptop-2.png" alt="img" data-aos="fade-up">
                    </div>
      
                </div>
            </div>
        </header>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Header',
    data () {
      return {
      }
    }
  }
  </script>
  
  <style>
  
  </style>
  