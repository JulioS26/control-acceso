<template>
    <div>

        <v-row>
            <v-col cols="12" sm="4"  md="6" class="c-form offset-sm-4  offset-md-3">

                <v-form ref="form" @submit.prevent="submitForm" v-model="valid" lazy-validation class="bg-forms" enctype="multipart/form-data">
                    <h1 class="titulo-form">Entrada</h1>

                    <v-text-field v-model="cedula" :counter="8" :rules="cedulaRules" label="Cedula" required></v-text-field>
                    <!-- <v-text-field type="password" v-model="clave" :counter="30" :rules="claveRules" label="Contraseña" required></v-text-field> -->
                    <!-- <v-select :items="items" label="Opciones" v-model="opcion"></v-select> -->
          
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
                    {{ cedula }} Su registro fue exitoso. {{ dismissCountDown }}
                </div>
                <div v-else>
                    {{ cedula }} hubo falla en su registro. {{ dismissCountDown }}
                </div>
            </b-alert>
        </div>

  </div>
</template>

<script>
import API from '../api';

    export default {
        name: 'Registro',
        data(){
            return {
                valid: true,
                cedula: '',
                cedulaRules: [
                    v => !!v || 'La cedula es requerida',
                    v => (v && v.length >= 7 && v.length <= 8) || 'El documento debe tener 7-8 caracteres',
                ],
                opcion:'',
                variante:'',
                // select: null,
                // advertencia: false,
                adv: true,
                items: ['1ra entrada','2da entrada'],
                dismissSecs: 5,
                dismissCountDown: 0,
                showDismissibleAlert: false
            };
        },
        // data: () => ({
            
        // }),
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
            async submitForm(){
                const formData = new FormData();
                formData.append('cedula', this.cedula);
                if(this.$refs.form.validate()){
                    const response = await API.addPost(formData);
                    if(response.message == 'Entrada creada'){
                        this.adv = true;
                        this.nuevo();
                    } else {
                        this.adv = false;
                        this.nuevo()
                    }
                    // this.$router.push({name: 'Entrada', params: {message: response.message}});
                }
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
</style>