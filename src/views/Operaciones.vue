<template>
  <div>

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

                    <v-text-field v-model="DireccionPartida" :rules="DireccionReglas" label="Ingrese la cedulad el trabajador" prepend-icon="mdi-account-key"></v-text-field>

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

                            <v-select :items="items" label="Opciones" v-model="opcion"></v-select>

                            <v-menu ref="startMenu" v-model="timetMenu" :close-on-content-click="false" :nudge-right="40" :return-value.sync="start" transition="fab-transition" min-width="290px" offset-y>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="time" class="mt-3" label="Hora" prepend-icon="mdi-clock" dense readonly outlined hide-details v-bind="attrs" v-on="on"></v-text-field>
                                </template>
                                <v-time-picker v-model="time" no-title scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="startMenu = false">
                                        Cancel
                                    </v-btn>
                                    <v-btn text color="primary" @click="$refs.startMenu.save(start)">
                                        OK
                                    </v-btn>
                                </v-time-picker>
                            </v-menu>



                    
                </v-card-text>
                <v-card-actions>
                    <v-btn text color="deep-purple accent-4" @click="nuevo">
                        Actualizar
                    </v-btn>
                </v-card-actions>
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
               Registro {{ cedula }} de la {{opcion}} fue exitoso. {{ dismissCountDown }}
              </div>
              <div v-else>
               {{ cedula }} hubo falla en su registro {{opcion}}. {{ dismissCountDown }}
              </div>
            </b-alert>

          </div>







          <div v-if="eliminar">
            
            <v-card class="mx-auto" max-width="344">
                <v-card-text>
                    <div align="center">Actualizar</div>

                    <v-text-field v-model="DireccionPartida" :rules="DireccionReglas" label="Ingrese la cedulad el trabajador" prepend-icon="mdi-account-key"></v-text-field>

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

                            <v-select :items="items" label="Opciones" v-model="opcion"></v-select>

                            



                    
                </v-card-text>
                <v-card-actions>
                    <v-btn text color="deep-purple accent-4">
                        Eliminar
                    </v-btn>
                </v-card-actions>


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
               Registro {{ cedula }} de la {{opcion}} fue exitoso. {{ dismissCountDown }}
              </div>
              <div v-else>
               {{ cedula }} hubo falla en su registro {{opcion}}. {{ dismissCountDown }}
              </div>
            </b-alert>

          </div>

            
        </v-col>
    </v-row>

  </div>
</template>

<script>
export default {
    name:'Operaciones',
    components:{},
    data: () => ({
      items: ['Fecha exacta','Entre fechas'],
      opcion:'',
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      advActualizar:false,
      actualizar:false,
      eliminar:false
    }),
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
</style>