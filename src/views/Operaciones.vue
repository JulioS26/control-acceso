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

    <v-row>
      <v-col>
            <v-card class="mx-auto" max-width="344">
                <v-card-text>
                    <div align="center">Operaciones</div>

                    <div class="text-center">
                      
                        <v-btn class="ma-2" outlined color="indigo" @click="mostrarActualizar">
                          Actualziar
                        </v-btn>
                      
                        <v-btn class="ma-2" outlined color="indigo" @click="mostrarEliminar">
                          Eliminar
                        </v-btn>
                      
                    </div>

                </v-card-text>
                
            </v-card>
        </v-col>




        <v-col>

          <div v-if="actualizar">
            <v-card class="mx-auto" max-width="344">
                <v-card-text>
                    <div align="center">Actualizar</div>

                    <v-text-field v-model="DireccionPartida" :rules="DireccionReglas" label="Ingrese la cedulad el trabajador" prepend-icon="mdi-account-key"></v-text-field>

                    <v-menu ref="startMenu" v-model="startMenu" :close-on-content-click="false" :nudge-right="40" :return-value.sync="start" transition="fab-transition" min-width="290px" offset-y>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="start" class="mt-3" label="Fecha" prepend-icon="mdi-calendar" dense readonly outlined hide-details v-bind="attrs" v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-model="start" no-title scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="startMenu = false">
                                        Cancel
                                    </v-btn>
                                    <v-btn text color="primary" @click="$refs.startMenu.save(start)">
                                        OK
                                    </v-btn>
                                </v-date-picker>
                            </v-menu>

                            <v-select :items="items" label="Opciones" v-model="opcion"></v-select>

                            <v-menu ref="startMenu" v-model="timetMenu" :close-on-content-click="false" :nudge-right="40" :return-value.sync="start" transition="fab-transition" min-width="290px" offset-y>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="time" class="mt-3" label="Hora" prepend-icon="mdi-clock" dense readonly outlined hide-details v-bind="attrs" v-on="on"></v-text-field>
                                </template>
                                <v-time-picker v-model="time" no-title scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="startMenu = false">
                                        Cancel
                                    </v-btn>
                                    <v-btn text color="primary" @click="$refs.startMenu.save(start)">
                                        OK
                                    </v-btn>
                                </v-time-picker>
                            </v-menu>



                    
                </v-card-text>
                <v-card-actions>
                    <v-btn text color="deep-purple accent-4" @click="nuevo">
                        Actualizar
                    </v-btn>
                </v-card-actions>
            </v-card>

            <b-alert
              :show="dismissCountDown"
              dismissible
              fade
              :variant="variante"
              @dismiss-count-down="countDownChanged"
              class="arriba"
            >
              <div v-if="advActualizar">
               Registro {{ cedula }} de la {{opcion}} fue exitoso. {{ dismissCountDown }}
              </div>
              <div v-else>
               {{ cedula }} hubo falla en su registro {{opcion}}. {{ dismissCountDown }}
              </div>
            </b-alert>

          </div>







          <div v-if="eliminar">
            
            <v-card class="mx-auto" max-width="344">
                <v-card-text>
                    <div align="center">Actualizar</div>

                    <v-text-field v-model="DireccionPartida" :rules="DireccionReglas" label="Ingrese la cedulad el trabajador" prepend-icon="mdi-account-key"></v-text-field>

                    <v-menu ref="startMenu" v-model="startMenu" :close-on-content-click="false" :nudge-right="40" :return-value.sync="start" transition="fab-transition" min-width="290px" offset-y>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="start" class="mt-3" label="Fecha" prepend-icon="mdi-calendar" dense readonly outlined hide-details v-bind="attrs" v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-model="start" no-title scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="startMenu = false">
                                        Cancel
                                    </v-btn>
                                    <v-btn text color="primary" @click="$refs.startMenu.save(start)">
                                        OK
                                    </v-btn>
                                </v-date-picker>
                            </v-menu>

                            <v-select :items="items" label="Opciones" v-model="opcion"></v-select>

                            



                    
                </v-card-text>
                <v-card-actions>
                    <v-btn text color="deep-purple accent-4">
                        Eliminar
                    </v-btn>
                </v-card-actions>


            </v-card>

            <b-alert
              :show="dismissCountDown"
              dismissible
              fade
              :variant="variante"
              @dismiss-count-down="countDownChanged"
              class="arriba"
            >
              <div v-if="advActualizar">
               Registro {{ cedula }} de la {{opcion}} fue exitoso. {{ dismissCountDown }}
              </div>
              <div v-else>
               {{ cedula }} hubo falla en su registro {{opcion}}. {{ dismissCountDown }}
              </div>
            </b-alert>

          </div>

            
        </v-col>
    </v-row>

  </div>
</template>

<script>
export default {
    name:'Operaciones',
    components:{},
    data: () => ({
      items: ['Fecha exacta','Entre fechas'],
      opcion:'',
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      advActualizar:false,
      actualizar:false,
      eliminar:false,
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
                    opcion:'Logout',
                    url: '/',
                    icon: 'mdi-account',
                    img: require("../assets/img/fondoMenuLogin.svg")
                    }
                ]
    }),
    methods:{
      countDownChanged(dismissCountDown) {
          this.dismissCountDown = dismissCountDown
      },
      showAlert() {
          this.dismissCountDown = this.dismissSecs
      },
      nuevo(){
         this.showAlert()
         if(this.adv){
         this.variante = 'success'
         } else {
         this.variante = 'danger'
         }
      },
      mostrarActualizar(){
        this.actualizar = true
        if(this.eliminar == true){
          this.eliminar = !this.eliminar
        }
      },
      mostrarEliminar(){
        this.eliminar = true
        if(this.actualizar == true){
          this.actualizar = !this.actualizar
        }
      },
      irMenu(e){
          this.$router.push(e), this.menu = false
      }
    }
    
}
</script>

<style scoped>
.arriba{
  position: fixed !important;
  right: 40px !important;
  top: 40px !important;
  z-index:1050 !important;
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

@media (max-width:600px) {
  

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
</style>