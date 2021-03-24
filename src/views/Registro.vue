<template>
    <div>

        <v-row>
            <v-col cols="12" sm="4"  md="6" class="c-form offset-sm-4  offset-md-3">

                <v-card class="pa-5">
                      <v-card-title>Agregar nuevo post</v-card-title>

                      <v-divider></v-divider>

                      <v-form ref="form" @submit.prevent="submitForm" class="pa-5" enctype="multipart/form-data">
                      
                        <v-text-field label="Titulo" v-model="post.title" prepend-icon="mdi-note" :rules="rules"></v-text-field>
                        <v-text-field label="Categoria" v-model="post.category" prepend-icon="mdi-view-list" :rules="rules"></v-text-field>

                        <v-textarea label="Contenido" v-model="post.content" prepend-icon="mdi-note-plus" :rules="rules"></v-textarea>

                        <v-file-input @change="selectFile" :rules="rules" show-size counter multiple label="Seleccionar imagen"></v-file-input>

                        <v-btn type="submit" class="mt-3" color="primary">Agg Post</v-btn>

                      </v-form>
                  </v-card>

            </v-col>
        </v-row>

        <!-- <div>
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
        </div> -->

    </div>
</template>

<script>
import API from '../apiUser'
export default {
    name:'Registro',
    data(){
        return {
            rules: [
                (v) => !!v || 'Este campo es requerido'
            ],
            post:{
                title:'',
                category:'',
                content:'',
                image:''
            },
            image:'',
        };
    },
    methods:{
        selectFile(file){

            this.image = file[0];
        },
        async submitForm(){
            const formData = new FormData();
            formData.append('image', this.image);
            formData.append('title', this.post.title);
            formData.append('category', this.post.category);
            formData.append('content', this.post.content);
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