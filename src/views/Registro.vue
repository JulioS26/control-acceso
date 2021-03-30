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

                <v-form ref="form" @submit.prevent="submitForm" v-model="valid" lazy-validation class="bg-forms" enctype="multipart/form-data">
                    <h1 class="titulo-form">Nuevo usuario</h1>

                    <v-text-field v-model="usuario" :counter="10" :rules="usuarioRules" label="Usuario" required></v-text-field>

                    <v-text-field type="password" v-model="clave" :counter="20" :rules="claveRules" label="Contraseña" required></v-text-field>

                    <v-text-field type="password" v-model="clave2" :counter="20" :rules="claveRules2" label="Repita contraseña" required></v-text-field>
          
                    <v-btn type="submit" :disabled="!valid" color="info" class="mr-2">
                        Registrar
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
                    El usuario fue creado exitosamente. {{ dismissCountDown }}
                </div>
                <div v-else>
                    Hubo una falla en el registro de ususario. {{ dismissCountDown }}
                </div>
            </b-alert>
        </div>

    </div>
</template>

<script>
import API from '../apiUsuario'

export default {
    name:'Registro',
    data(){
        return {
            valid:true,
            usuario:'',
            usuarioRules:[
                    v => !!v || 'El usuario es requerido',
                    v => (v && v.length >= 3 && v.length <= 10) || 'El documento debe tener 3-8 caracteres',
            ],
            clave:'',
            claveRules:[
                    v => !!v || 'La contraseña es requerida',
                    v => (v && v.length >= 5 && v.length <= 20) || 'El documento debe tener 5-20 caracteres',
            ],
            clave2:'',
            claveRules2:[
                v => !!v || 'Debe repetir su contraseña',
                v => (v == this.clave) || 'Las contraseña deben coincidir'
            ],
            variante:'',
            adv: true,
            dismissSecs: 5,
            dismissCountDown: 0,
            showDismissibleAlert: false,
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
        };
    },
    methods:{
        reset() {
            this.$refs.form.reset()
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
        async submitForm(){
            const formData = new FormData();
            formData.append('usuario', this.usuario);
            formData.append('clave', this.clave);
            if(this.$refs.form.validate()){
                const response = await API.addPost(formData);
                if(response.message == 'Usuario creado'){
                    this.adv = true;
                    this.nuevo();
                    this.reset();
                } else {
                    this.adv = false;
                    this.nuevo()
                    this.reset();
                }
            }
        },
        irMenu(e){
          this.$router.push(e), this.menu = false
        }
    }

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