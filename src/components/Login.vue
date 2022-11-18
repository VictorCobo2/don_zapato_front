<template>
  <div id="app">
    <v-app id="inspire">
      <v-container class="grey lighten-3" fluid fill-height>
        <v-card class="mt-4 mx-auto text-center hidden-sm-only" min-width="320">
          <v-card-text>
            <v-card class="v-card--offset mx-auto" color="primary" elevation="4" dark>
              <v-card-text class="headline white--text">Don Zapato</v-card-text>
              <v-card-text>
                <v-icon size="96">mdi-shoe-formal</v-icon>
              </v-card-text>
            </v-card>
          </v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-card-text>
              <v-text-field v-model="email" type="email" :rules="emailRules" label="Email" required></v-text-field>
              <v-text-field v-model="contrasena" type="password" :rules="contrasenaRules" label="Contraseña" required></v-text-field>
              <div class="caption grey--text text--darken-1 text-left">*Campos requeridos</div>
            </v-card-text>
            <v-card-actions>
              <v-row align="center" no-gutters>
                <v-col class="text-center">
                  <div class="my-2">
                    <v-btn color="primary" block @click="login">Acceder</v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      valid: false,
      contrasena: "",
      email: "",
      contrasenaRules: [
        (v) => !!v || "La contraseña es requerida!",
        (v) => (v && v.length <= 100) || "La contraseña no puede contener mas de 100 caracteres",
      ],
      emailRules: [
        (v) => !!v || "El correo es requerido!",
        (v) => (v && v.length <= 100) || "La contraseña no puede contener mas de 100 caracteres",
        (v) => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "Correo invalido",
      ],
    };
  },
  created() {
    if (localStorage.user) this.$router.push("/");
  },
  methods: {
    ...mapActions({
      _login: "_login",
    }),
    async login() {
      this.valid = this.$refs.form.validate();
      if (this.valid) {
        const data = {
          password: this.contrasena,
          email: this.email,
        };
        const respuesta = await this._login(data);
        this.$router.push("/");

        console.log(respuesta);
      }
    },
  },
};
</script>

<style>
.v-card--offset {
  top: -32px;
  position: relative;
}
</style>
