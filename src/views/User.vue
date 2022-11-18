<template>
  <v-container>
    <v-row justify="space-around">
      <v-card width="400">
        <v-img
          height="200px"
          src="https://i.pinimg.com/originals/b8/f2/76/b8f276405f1dd323bfef01abf7232268.jpg"
        >
          <v-app-bar flat color="rgba(0, 0, 0, 0)">
            <v-spacer></v-spacer>
          </v-app-bar>
          <v-card-title class="white--text mt-8">
            <v-avatar size="56">
              <img
                alt="user"
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              />
            </v-avatar>
            <p class="ml-3">Don Zapato</p>
          </v-card-title>
        </v-img>
        <v-card-text>
          <div class="font-weight-bold ml-8 mb-2"></div>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="nombre"
              :rules="nombreRules"
              :counter="25"
              :maxlength="25"
              label="Nombre"
              required
            ></v-text-field>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              :counter="50"
              label="Email"
              required
            ></v-text-field>
            <v-text-field
              v-model="tienda"
              :rules="tiendaRules"
              :counter="50"
              label="Nombre de la tienda"
              required
            ></v-text-field>
          </v-form>
          <v-btn class="mr-4" color="success" @click="guardar"> guardar </v-btn>
          <v-btn> limpiar </v-btn>
        </v-card-text>
      </v-card>
    </v-row>
    <v-snackbar
      v-model="snackbar.estado"
      :color="snackbar.color"
      prominent
      :timeout="1500"
      bottom
      left
    >
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn icon dark text @click="snackbar.estado = false" v-bind="attrs">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
  <script>
import { mapActions } from 'vuex';
export default {
  data: () => ({
    messages: [
      {
        from: "You",
        message: `Sure, I'll see you later.`,
        time: "10:42am",
        color: "deep-purple lighten-1",
      },
      {
        from: "John Doe",
        message: "Yeah, sure. Does 1:00pm work?",
        time: "10:37am",
        color: "green",
      },
      {
        from: "You",
        message: "Did you still want to grab lunch today?",
        time: "9:47am",
        color: "deep-purple lighten-1",
      },
    ],
    snackbar: {
      estado: false,
    },
    
    nombre:"",
    nombreRules: [
        v => !!v || 'El nombre es requerida!',
        v => (v && v.length <= 15) || 'El nombre no puede contener mas de 15 caracteres',
      ],
    email:"",
    emailRules: [
        v => !!v || 'El email es requerida!',
        v => (v && v.length <= 50) || 'El email no puede contener mas de 50 caracteres',
      ],
    tienda:"",
    tiendaRules: [
        v => !!v || 'El nombre de la tienda es requerida!',
        v => (v && v.length <= 50) || 'El nombre de la tienda no puede contener mas de 50 caracteres',
      ],
    valid:false
  }),
  methods:{
    ...mapActions({
      _editUser:"_editUser"
    }),
    async guardar(){
      this.valid = this.$refs.form.validate()
      if(this.valid){
        const data = {
          _id:"63754f103595e03a52621dc9",
          nombre:this.nombre,
          email:this.email,
          storeName:this.tienda
        }
        const respuesta = await this._editUser(data)
        if(respuesta.data.modifiedCount == 1) {
          this.msj("Usuario editado correctamente", "green");
        }
        if(respuesta.data.modifiedCount == 0) {
          this.msj("Los datos son iguales", "red");
        }
      }
    },
    msj(text, color) {
      this.snackbar.estado = true;
      this.snackbar.text = text;
      this.snackbar.color = color ? `${color} darken-2` : "red darken-3";
    },
  }
};
</script>