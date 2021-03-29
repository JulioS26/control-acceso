<template>
    <div>

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
            showDismissibleAlert: false
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
</style>