<template>
  <div>

    <div class="text-center float-left  menu" >
      <v-menu class="aqui" v-model="menu" :close-on-content-click="false"  offset-x transition="slide-x-transition">
        <template v-slot:activator="{ on, attrs }" >
          <v-btn color="secondary" dark v-bind="attrs" v-on="on"  class="v-btn v-btn--contained v-btn--fab v-btn--round theme--dark v-size--small ">
            <i class="mdi mdi-account"  width="32" height="32"></i>
          </v-btn>
        </template>

        <v-card v-for="lista of lista" :key="lista.id">
          <v-list color="secondary">
          
            <v-list-item @click="irMenu(lista.url)"   >
              <v-img :src="lista.img" class="elementos-lista ">
              <v-list-item-title class="text-center"><v-icon class="d-block " color="white">{{lista.icon}}</v-icon><span color="white">{{lista.opcion}}</span></v-list-item-title>
                  </v-img>
            </v-list-item>
      
          </v-list>
        </v-card>

      </v-menu>
    </div>


    <v-row class="centrado">
      <v-col cols="12" lg="3" class="texto-hover" v-for="opcion of opciones" :key="opcion.id">
        
        <v-card class=" mx-auto v-card-w" @click="ir(opcion.url)">
          <v-img class="v-card-img img v-card-w" :src="opcion.img">
            <v-card-title class="white--text mt-8 float-right" >
              <h1 class="mr-md-5 ">
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
    name: 'Home',
    components:{
    },
    data: () => ({
      opciones:[
        {
          id:1,
          opcion:'Entrada',
          url: '/entrada',
          img: require("../assets/img/fondoIngreso.svg")
        },
        {
          id:2,
          opcion:'Salida',
          url: '/salida',
          img: require("../assets/img/fondoSalida.svg")
        }
      ],
      fav: true,
      menu: false,
      message: false,
      hints: true,
      lista:[
        {
          id:0,
          opcion:'Inicio',
          url: '/',
          icon: 'mdi-home',
          img: require("../assets/img/fondoMenuInicio.svg")
        },
        {
          id:1,
          opcion:'Entrada',
          url: '/entrada',
          icon: 'mdi-login',
          img: require("../assets/img/fondoMenuEntrada.svg")
        },
        {
          id:2,
          opcion:'Salida',
          url: '/salida',
          icon: 'mdi-logout',
          img: require("../assets/img/fondoMenuSalida.svg")
        },
        {
          id:3,
          opcion:'Login',
          url: '/login',
          icon: 'mdi-account',
          img: require("../assets/img/fondoMenuLogin.svg")
        }
      ]
    }),
    methods: {
      ir(e){
        this.$router.push(e)
      },
      irMenu(e){
          this.$router.push(e), this.menu = false
      }
    },
  }
</script>
<style scoped>

.v-card-w{
  width: 450px !important;
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

  .v-card{
  display: block!important;
  }
  .v-list{
    display: block!important;
  }
  .menu{
    left: 25px !important;
    top: 15px !important;

  }
  .v-menu__content--fixed {
    left: 5rem !important;
  }
  .theme--light.v-list{
    padding: .125rem .325rem!important;
  }
  .elementos-lista{
    width: 65px;
    height: 55px;
    background: royalblue;
    border-radius: 7px 7px;
    margin: .325rem;
    cursor: pointer;
  }
  .v-menu__content--fixed {
    display: block;
  }
}

.menu{
  position: fixed !important;
  left: 40px !important;
  top: 40px !important;
  z-index:1050 !important;
}
.mdi:before, .mdi-set{
  font-size: 1.8rem!important;
}
.v-card{
  display: flex!important;
}
.v-list{
  display: flex!important;
}
.v-menu__content--fixed {
  top: 20px !important;
  left: 120px !important;
  display: flex;
}
.theme--light.v-list{
  padding: .225rem .625rem!important;
}
.elementos-lista{
  width: 90px;
  height: 70px;
  background: royalblue;
  border-radius: 10px 10px;
  margin: .325rem;
  cursor: pointer;
  align-items: center;
  transition: all .35s ease;
}
.elementos-lista:hover{
  box-shadow: 0 5px 5px 3px rgba(  0, 0, 0, .56);
}
.v-list-item{
  padding: 0!important;
}
.v-card>:last-child:not(.v-btn):not(.v-chip) {
    border-bottom-left-radius: initial !important ; 
    border-bottom-right-radius: initial !important ; 
}
.v-card>.v-card__progress+:not(.v-btn):not(.v-chip), .v-card>:first-child:not(.v-btn):not(.v-chip) {
    border-top-left-radius: initial !important ; 
     border-top-right-radius: initial !important ;
}

</style>