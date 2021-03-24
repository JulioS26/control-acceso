<template>
  <div>

    <v-row>
      <v-col>
            <v-card class="mx-auto" max-width="344">
                <v-card-text>
                    <div align="center">Solicitud de Historial</div>

                    <v-text-field v-model="DireccionPartida" :rules="DireccionReglas" label="Ingrese la cedulad el trabajador" prepend-icon="mdi-account-key"></v-text-field>

                    <v-select :items="items" label="Opciones" v-model="opcion"></v-select>

                    <div v-if="opcion == 'Fecha exacta'">
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

                    <div v-if="opcion == 'Entre fechas'">
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


            
                </v-card-text>
                <v-card-actions>
                    <v-btn text color="deep-purple accent-4">
                        Enviar Solicitud
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>




        <v-col>
            <v-card class="mx-auto" max-width="344">
                <v-card-text>
                    <div align="center">Historial</div>

                    
                    
                </v-card-text>
                <v-card-actions>
                    <v-btn text color="deep-purple accent-4">
                        Terminar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>

  </div>
</template>

<script>
export default {
    name:'Historial',
    components:{},
    data: () => ({
      items: ['Fecha exacta','Entre fechas'],
      opcion:'',
    }),
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
}
</style>