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
                    <div align="center">Solicitud de Historial</div>

                    <v-text-field v-model="cedula" :rules="cedulaReglas" label="Ingrese la cedulad el trabajador" prepend-icon="mdi-account-key"></v-text-field>

                    <!-- <v-select :items="items" label="Opciones" v-model="opcion"></v-select> -->

                    <div>
                      <v-row>
                        <v-col cols="12" class="controls">
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
                        </v-col>
                      </v-row>
                    </div>

                    

                    <!-- <div v-if="opcion == 'Entre fechas'">
                      <v-row>
                        <v-col cols="6" class="controls">
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
                        </v-col>
                        <v-col cols="6" class="controls">
                            <v-menu ref="startMenu2" v-model="startMenu2" :close-on-content-click="false" :nudge-right="40" :return-value.sync="start" transition="fab-transition" min-width="290px" offset-y>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="start2" class="mt-3" label="Fecha" prepend-icon="mdi-calendar" dense readonly outlined hide-details v-bind="attrs" v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-model="start2" no-title scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="startMenu2 = false">
                                        Cancel
                                    </v-btn>
                                    <v-btn text color="primary" @click="$refs.startMenu2.save(start2)">
                                        OK
                                    </v-btn>
                                </v-date-picker>
                            </v-menu>
                        </v-col>
                      </v-row>
                    </div> -->


            
                </v-card-text>
                <v-card-actions>
                    <v-btn text color="deep-purple accent-4" @click="solicitud()">
                        Enviar Solicitud
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>




        <v-col>
            <v-card class="mx-auto" max-width="344">
                <v-card-text>
                    <div align="center">Historial</div>
                    <div v-if="message == 'Asistio'">
                      {{message}}  {{horas}} horas de trabajo
                    </div>
                    <div v-if="message == 'Ausente'">
                      {{message}} 
                    </div>

                    
                    
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>

    <v-row justify="space-around">
      <v-col cols="auto">
      <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            v-bind="attrs"
            v-on="on"
          >Nomina</v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-card-text>

              <v-text-field v-model="monto" label="Monto" prepend-icon="mdi-cash"></v-text-field>

              {{montoTotal}}
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn @click="montoT()">
                Cuenta
              </v-btn>
              <v-btn
                text
                @click="dialog.value = false"
              >Cerrar</v-btn>
              <v-btn @click="limpiar()">
                Limpiar
              </v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
    </v-row>

  </div>
</template>

<script>
import ApiEntrada from '../apiEntrada'
import ApiSalida from '../apiSalida'

export default {
    name:'Historial',
    components:{},
    data: () => ({
      items: ['Fecha exacta','Entre fechas'],
      cedula:'',
      cedulaReglas: [
                    v => !!v || 'La cedula es requerida',
                    v => (v && v.length >= 7 && v.length <= 8) || 'El documento debe tener 7-8 caracteres',
      ],
      startMenu:false,
      start:'',
      start2:'',
      opcion:'',
      postsEntrada:[],
      postsSalida:[],
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
                ],
                message:'',
                entrada:'',
                salida:'',
                horas:'',
                messageT:false,
                messageF:false,
                monto:'',
                montoTotal:''
    }),
    async created(){
        this.postsEntrada = await ApiEntrada.getAllPost();
        this.postsSalida = await ApiSalida.getAllPost();
    },
    methods:{
      irMenu(e){
          this.$router.push(e), this.menu = false
      },
      solicitud(){
      
        var hora1;

        for (var i = 0; i <= this.postsEntrada.length; i++) {
          // console.log('entrooo')
          var c = this.cedula;
          var cc = this.postsEntrada[i].cedula;
          var en;
          
      
          if(c == cc && this.start == this.postsEntrada[i].created.substr(0,10)){
            
            this.message = 'Asistio';
            this.messageT = true;
            hora1 = this.postsEntrada[i].created.substr(11,2);
            hora1 = 24-hora1;
            console.log(hora1)
            this.entrada = hora1
            this.salidas()
            // console.log('Asistio')
          } else {
            this.message = 'Ausente'
            this.messageF = true;
            // console.log('No asistio')
          }
        }
        

      },
      salidas(){
        var hora2;

        for (var k = 0; k <= this.postsSalida.length; k++) {
          // console.log('entrooo')
          var ce = this.cedula
          var cce = this.postsSalida[k].cedula
   
          if(ce == cce && this.start == this.postsSalida[k].created.substr(0,10)){
            
            hora2 = this.postsSalida[k].created.substr(11,2);
            hora2 = 24-hora2;
            console.log(hora2)
            this.salida = hora2;
            this.horas = this.entrada - this.salida;

          } else {
            // console.log('No asistio')
          }
        }
      },
      montoT(){
        this.montoTotal = this.horas * this.monto;
      },
      limpiar(){
        this.montoTotal = '',
        this.horas = '',
        this.monto = '',
        this.cedula = '',
        this.start = ''
      }
      
    }
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