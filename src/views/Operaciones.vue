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

                  <v-card
                    class="mx-auto"
                    max-width="500"
                    v-for="post in postsEntrada"
                    :key="post._id"
                    >
                    <v-list subheader v-if="listado">
                        <v-subheader>Lista</v-subheader>

                        <v-list-item>
                          

                          <v-list-item-content>
                            <v-list-item-title v-text="post.cedula"></v-list-item-title>
                            <v-list-item-title v-text="post.created.substr(0,10)"></v-list-item-title>
                          </v-list-item-content>
                          <v-btn @click="actualizarPo(post._id)">Actualizar</v-btn>
                          
                        </v-list-item>
                    </v-list>
                  </v-card>

                    <v-form ref="form" @submit.prevent="updateForm" v-model="valid" lazy-validation class="bg-forms" enctype="multipart/form-data">

                    <v-text-field v-model="cedula" :counter="8" :rules="cedulaRules" label="Cedula" required></v-text-field>
          
                    <v-btn type="submit" :disabled="!valid" color="info" class="mr-2">
                        Actualizar
                    </v-btn>
          
                    <v-btn color="error" class="mr-4" @click="resetear()">
                        Resetear
                    </v-btn>
                </v-form>



                    
                </v-card-text>
                
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
               Su actualizacion fue exitosa. {{ dismissCountDown }}
              </div>
              <div v-else>
               Hubo error en su actualizacion. {{ dismissCountDown }}
              </div>
            </b-alert>

          </div>







          <div v-if="eliminar">
            
            <v-card class="mx-auto" max-width="344">
                <v-card-text>
                    <div align="center">Eliminar</div>

                    <v-card
                      class="mx-auto"
                      max-width="344"
                      outlined
                      v-for="post in postsEntrada"
                      :key="post._id"
                    >
                      <v-list-item three-line>
                        <v-list-item-content>
                          <div class="overline mb-4">
                            {{post.cedula}}
                          </div>
                          <v-list-item-title class="headline mb-1">
                            {{post.created.substr(0,10)}}
                          </v-list-item-title>
                        </v-list-item-content>

                        
                      </v-list-item>

                      <v-card-actions>
                        <v-btn
                          outlined
                          rounded
                          text
                          @click="removePost(post._id)"
                        >
                          Eliminar
                        </v-btn>
                      </v-card-actions>
                    </v-card>

                    


                      


                    
                </v-card-text>


            </v-card>

            <b-alert
              :show="dismissCountDown"
              dismissible
              fade
              :variant="variante"
              @dismiss-count-down="countDownChanged"
              class="arriba"
            >
              <div v-if="adv">
               Eliminado con exito. {{ dismissCountDown }}
              </div>
              <div v-else>
               Error al eliminar. {{ dismissCountDown }}
              </div>
            </b-alert>

          </div>

            
        </v-col>
    </v-row>

  </div>
</template>

<script>
import ApiEntrada from '../apiEntrada';

export default {
    name:'Operaciones',
    components:{},
    data: () => ({
      items: ['Fecha exacta','Entre fechas'],
      opcion:'',
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      adv:false,
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
                ],
                postsEntrada:[],
                listado:true,
                idd:'',
                advActualizar:false,
                cedula:'',
                valid: true,
                cedulaRules: [
                    v => !!v || 'La cedula es requerida',
                    v => (v && v.length >= 7 && v.length <= 8) || 'El documento debe tener 7-8 caracteres',
                ],
                variante:'',
    }),
    async created(){
        this.postsEntrada = await ApiEntrada.getAllPost();
        // this.postsSalida = await ApiSalida.getAllPost();
    },
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

         if(this.advActualizar){
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
      },
      async removePost(id){
            const response = await ApiEntrada.deletePost(id);
            if(response == 'Entrada eliminada'){
              this.adv = true
              nuevo()
            }
            
      },
      async updateForm(){
            var id = this.idd
            const formData = new FormData();
            formData.append('cedula', this.cedula);
            if(this.$refs.form.validate()){
                const response = await ApiEntrada.updatePost(id, formData);
                if(response == 'Entrada actualizada'){
                  this.advActualizar = true
                  console.log('entro en actualizacion')
                  nuevo()
                }
            }
        },
        actualizarPo(id){
          this.listado = false 
          this.idd = id
        },
        resetear(){
          this.cedula = '',
          this.listado = true

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