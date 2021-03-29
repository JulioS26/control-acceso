<template>
  <v-app >
    <!-- <MenuToggle/> -->
    <router-view />
    <!-- <Footer/> -->
  </v-app>
</template>
<script>
// import MenuToggle from './components/MenuToggle.vue'
// import Footer from './components/Footer.vue'
export default {
  name: 'App',
  components: {
    // MenuToggle,
    // Footer
  },
  data: () => ({
  }),
};
</script>

<style>

  .v-application{
    background-image: url("./assets/img/fondo.svg") !important;
    background-repeat: no-repeat !important;
    background-position: center center !important;
    background-size: cover !important;  
    background-attachment: fixed !important;
  }
  .v-application--wrap{
    justify-content: center;
  }

</style>