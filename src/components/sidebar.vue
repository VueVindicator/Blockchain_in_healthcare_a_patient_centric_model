
<template>
 <div>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container">

      <div class="navbar-left">
          <button id="panel-side__btn" type="button" @click="showMenu" class="btn btn-primary panel-side__btn">
              Menu
          </button>
      </div>

      <ul class="nav nav-navbar">
        <li class="nav-item">
          <a class="btn btn-xs btn-round btn-default nav-link" href="#" type="button">{{user.name}} <span class="fa fa-user"></span></a>
  
          <nav class="nav">
            <router-link :to="'/doctor/' + user.userID + '/profile'" v-if="user.role == 'doctor'" class="nav-link">Profile</router-link>
            <router-link :to="'/patient/' + user.userID + '/profile'" v-else class="nav-link">Profile</router-link>
            <a class="nav-link" href="#" @click="logout">Logout</a>
          </nav>
        </li>
      </ul>

    </div>
  </nav>
  <div class="sidebar">
    
    <div id="panel-side" class="panel-side">
      <h4 class="panel-head"><router-link to="/" style="color: #fff">Medblocks</router-link></h4><br>
      <ul v-if="user.role == 'doctor'">
          <li :class="[currentPage.includes('dashboard') ? activeClass : '']"><router-link :to="'/doctor/' + user.userID + '/dashboard'">Home</router-link></li>
          <li :class="[currentPage.includes('patient-list') ? activeClass : '']"><router-link :to="'/doctor/' + user.userID + '/patient-list'">Patients</router-link></li>
          <li :class="[currentPage.includes('add-patient') ? activeClass : '']"><router-link :to="'/doctor/' + user.userID + '/add-patient'">Add new Patient</router-link></li>
          <li :class="[currentPage.includes('profile') ? activeClass : '']"><router-link :to="'/doctor/' + user.userID + '/profile'">Profile</router-link></li>
          <li :class="[currentPage.includes('block-explorer') ? activeClass : '']"><router-link to="/blockchain-route">Block Explorer</router-link></li>
      </ul>
      <ul v-else>
        <li :class="[currentPage.includes('dashboard') ? activeClass : '']"><router-link :to="'/patient/' + user.userID + '/dashboard'">Home</router-link></li>
        <li :class="[currentPage.includes('providers') ? activeClass : '']"><router-link :to="'/patient/' + user.userID + '/providers'">Providers</router-link></li>
        <li :class="[currentPage.includes('records') ? activeClass : '']"><router-link :to="'/patient/' + user.userID + '/records'">Records</router-link></li>
        <li :class="[currentPage.includes('requests') ? activeClass : '']"><router-link :to="'/patient/' + user.userID + '/requests'">Requests</router-link></li>
        <li :class="[currentPage.includes('profile') ? activeClass : '']"><router-link :to="'/patient/' + user.userID + '/profile'">Profile</router-link></li>
        <li :class="[currentPage.includes('block-explorer') ? activeClass : '']"><router-link to="/blockchain-route">Block Explorer</router-link></li>
    </ul>
      <button id="close-btn" class="btn btn-primary" @click="closeMenu">Close</button>
    </div>
  </div>
 </div>
</template>
<script>
  export default {
    data(){
      return {
        activeClass: 'activeRouter',
        user: {}
      }
    },
    methods: {
      showMenu(){
        const panelSideBtn = $('#panel-side__btn');
        const panelSide = $('#panel-side');

        panelSideBtn.bind('click', function() {
            panelSide.addClass('show');
        })
      },
      closeMenu(){
        const closeBtn = $('#close-btn');
        const panelSide = $('#panel-side');

        closeBtn.bind('click', function() {
            panelSide.removeClass('show');
        })
      },
      logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        this.$router.push('/login')
      }
    },
    computed: {
        currentPage(){
            return this.$route.path;
        }
    },
    created(){
      this.user = user
    }
  }
</script>
<style scoped>
  .navbar{
    -webkit-box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
    top: 0;
  }
  .nav-navbar .nav-link {
    padding-right: 0rem;
  }
  .nav-navbar li {
    padding: 0px;
  }
  .router-link-active {
    color: #50a1ff
  }
</style>
