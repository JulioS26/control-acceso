<template>
  <div>
      <v-row class="centrado">
      <v-col cols="12" lg="3" class="texto-hover" v-for="opcion of opciones" :key="opcion.id">
        
        <v-card class=" mx-auto v-card-w" @click="ir(opcion.url)">
          <v-img class="v-card-img img v-card-w" :src="opcion.img">
            <v-card-title class="white--text mt-8 float-right" >
              <h1 class="mr-md-2">
                {{opcion.opcion}}
              </h1>
            </v-card-title>
          </v-img>
        </v-card>
        
      </v-col>
    </v-row>

  </div>
</template>

<script>
export default {
    name:'DashboardAdmin',
    components:{},
    data: () => ({
      opciones:[
        {
          id:1,
          opcion:'Historial',
          url: '/historial',
          img: require("../assets/img/fondoIngreso.svg")
        },
        {
          id:2,
          opcion:'Operaciones',
          url: '/operaciones',
          img: require("../assets/img/fondoSalida.svg")
        },
        {
          id:3,
          opcion:'Registrar',
          url: '/registro',
          img: require("../assets/img/fondoSalida.svg")
        }
      ]
    }),
    methods: {
      ir(e){
        this.$router.push(e)
      }
    },
}
</script>

<style scoped>

.v-card-w{
  width: 455px !important;
}

.img{
  height: 180px !important;
  cursor: pointer;
  box-shadow: -5px 25px 25px 3px  rgba(0, 0, 0, 0.774);
  transition: width .5s ease-in !important;
}

.img:hover{
  box-shadow: 0px 5px 5px 3px  rgba(0, 0, 0, 0.712) !important;
}

h1{
  transition: all .4s ease;
}

.texto-hover:hover h1{
  padding-right: 1.5rem;
}

.centrado{
  justify-content: center;
}

@media (max-width:600px) {
  .v-card-w{
    width: 80px!important;
  }

  .v-card-img{
    height: 150px!important;
    box-shadow: 2px -7px 17px 6px rgba(0,0,0,0.75)!important;
    transition: width .5s ease-in !important;
  }
}
</style>