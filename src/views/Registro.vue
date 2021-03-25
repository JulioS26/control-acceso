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
import API from '../apiEntrada'
export default {
    name:'Registro',
    data(){
        return {
            rules: [
                (v) => !!v || 'Este campo es requerido'
            ],
            post:{
                // title:'',
                cedula:'',
                // category:'',
                // content:'',
                // image:''
            },
            image:'',
        };
    },
    methods:{
        // selectFile(file){
        //     this.image = file[0];
        // },
        async submitForm(){
            const formData = new FormData();
            // formData.append('image', this.image);
            // formData.append('title', this.post.title);
            formData.append('cedula', this.post.cedula);
            // formData.append('category', this.post.category);
            // formData.append('content', this.post.content);
            if(this.$refs.form.validate()){
                const response = await API.addPost(formData);
                this.$router.push({name: 'Home', params: {message: response.message}});
            }
        }
    }

}
</script>

<style>

</style>