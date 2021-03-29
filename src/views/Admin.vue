 <template>
  <div>
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
      posts:[]
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
</style>