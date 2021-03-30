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
    
      <v-col cols="12" sm="4"  md="6" class="c-form offset-sm-4  offset-md-3">

        <v-form ref="form" v-model="valid" lazy-validation class="bg-forms">
          <h1 class="titulo-form">Login</h1>

          <v-text-field v-model="usuario" :counter="10" :rules="usuarioRules" label="Usuario" required></v-text-field>

          <v-text-field type="password" v-model="clave" :counter="8" :rules="claveRules" label="Contraseña" required></v-text-field>

          <!-- <v-select :items="items" label="Opciones"></v-select> -->

          <v-btn :disabled="!valid" color="info" class="mr-2" @click="login()">
            Entrar
          </v-btn>

          <v-btn color="error" class="mr-4" @click="reset">
            Borrar formulario
          </v-btn>

        </v-form>

      </v-col>


    </v-row>

    <div>

    

    <b-alert
      :show="dismissCountDown"
      dismissible
      fade
      :variant="variante"
      @dismiss-count-down="countDownChanged"
      class="arriba"
    >
      <div v-if="adv">
          Has iniciado sesión con exito.
      </div>
      <div v-else>
        Hubo un error, intente de nuevo.
      </div>
    </b-alert>
    
  </div>



  </div>
</template>

<script>
import API from '../apiUsuario'

  export default {
    name: 'Admin',
    data: () => ({
      valid: true,
      usuario: '',
      usuarioRules: [
        v => !!v || 'El ususario es requerido',
        v => (v && v.length >= 3 && v.length <= 10) || 'El documento debe tener entre 3-10 caracteres',
      ],
      clave:'',
      claveRules: [
        v => !!v || 'La contraseña es requerida',
        v => (v && v.length >= 8 && v.length <= 20) || 'El documento debe tener entre 10-20 caracteres',
      ],
      variante:'',
      adv: true,
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      posts:[],
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
                    url: '/',
                    icon: 'mdi-account',
                    img: require("../assets/img/fondoMenuLogin.svg")
                    }
                ]
    }),
    async created(){
        this.posts = await API.getAllPost();
    },
    methods: {
      reset() {
        this.$refs.form.reset()
        this.advertencia = false
      },
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
      login(){

        if(this.usuario == 'asalas' && this.clave == 'armalot123456'){
          this.adv = true;
          self = this.$router
          setTimeout(function(){
            self.push('/dashboard-admin');
          },3000);

        } else {
          this.adv = false
        }
        this.nuevo()
      },
      irMenu(e){
          this.$router.push(e), this.menu = false
      }
    },
  }
</script>

<style scoped>
.c-form{
	background-color: #FFFFFFBB;
}

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