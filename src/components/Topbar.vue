<template>
  <v-app-bar app elevate-on-scroll elevation="3" color="white" v-if="$route.name != 'login'">
    <v-app-bar-nav-icon @click="$emit('drawerEvent')"></v-app-bar-nav-icon>
    <v-spacer />
    <v-col lg="6" cols="12">
      <h2 class="black--text">Don Zapato</h2>
    </v-col>
    <v-spacer />
    <v-menu offset-y>
      <template v-slot:activator="{ attrs, on }">
        <span class="mx-5 mr-10" style="cursor: pointer" v-bind="attrs" v-on="on"> </span>
      </template>
      <v-list three-line width="250">
        <template v-for="(item, index) in items">
          <v-subheader v-if="item.header" :key="item.header" v-text="item.header"></v-subheader>

          <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>

          <v-list-item v-else :key="item.title">
            <v-list-item-avatar>
              <v-img :src="item.avatar"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="item.title"></v-list-item-title>
              <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-menu>
    <v-menu offset-y>
      <template v-slot:activator="{ attrs, on }">
        <span style="cursor: pointer" v-bind="attrs" v-on="on">
          <v-chip link>
            <v-badge dot bottom color="green" offset-y="10" offset-x="10">
              <v-avatar size="40">
                <v-img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
              </v-avatar>
            </v-badge>
            <span class="ml-3">Administrador</span>
          </v-chip>
        </span>
      </template>
      <v-list width="250" class="py-0">
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Administrador</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item link v-for="(menu, i) in menus" :key="i" @click="desicion(menu.title)" :to="menu.route">
          <v-list-item-icon>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ menu.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card-title>
            <span class="text-h5">Cambio de contrseña</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="contrasena"
                    :counter="100"
                    type="password"
                    :rules="contrasenaRules"
                    label="Contraseña actual"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="newContrasena"
                    :counter="100"
                    type="password"
                    :rules="newContrasenaRules"
                    label="Nueva Contraseña"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="cerrar()"> Cerrar </v-btn>
            <v-btn color="blue darken-1" text @click="confirmar()"> Guardar </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar.estado" :color="snackbar.color" prominent :timeout="1500" bottom left>
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn icon dark text @click="snackbar.estado = false" v-bind="attrs">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-app-bar>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
export default {
  name: "Topbar",
  data() {
    return {
      menus: [
        { title: "Perfil", icon: "mdi-account", route: "/user" },
        { title: "Cambiar contraseña", icon: "mdi-key" },
        { title: "Salir", icon: "mdi-logout", route: "/login" },
      ],
      items: [],
      dialog: false,
      valid: false,
      contrasena: "",
      newContrasena: "",
      contrasenaRules: [
        (v) => !!v || "La contraseña es requerida!",
        (v) => (v && v.length <= 100) || "La contraseña no puede contener mas de 100 caracteres",
      ],
      newContrasenaRules: [
        (v) => !!v || "La contraseña es requerida!",
        (v) => (v && v.length <= 100) || "La contraseña no puede contener mas de 100 caracteres",
      ],
      snackbar: {
        estado: false,
      },
    };
  },
  methods: {
    ...mapActions({
      _changePass: "_changePass",
    }),
    desicion(title) {
      console.log(title);
      if (title == "Salir") {
        localStorage.removeItem("user");
        setTimeout(() => {
          this.$router.push("/login");
        }, 100);
      }

      if (title === "Cambiar contraseña") this.changePassword();
    },
    async changePassword() {
      this.dialog = true;
    },
    async confirmar() {
      this.valid = this.$refs.form.validate();
      if (this.valid) {
        const data = {
          password: this.contrasena,
          newPassword: this.newContrasena,
          id: "6375ac3034ae2c8408282cd2",
        };
        const respuesta = await this._changePass(data);

        if (respuesta.status === 405) {
          this.msj("La contraseña ingresada es incorrecta");
          this.cerrar();
        }
        if (respuesta.status === 200) {
          this.msj("Contraseña cambiada correctamente", "green");
          this.cerrar();
        }
      }
    },
    msj(text, color) {
      this.snackbar.estado = true;
      this.snackbar.text = text;
      this.snackbar.color = color ? `${color} darken-2` : "red darken-3";
    },
    cerrar() {
      this.$refs.form.reset();
      (this.contrasena = ""), (this.newContrasena = "");
      this.dialog = false;
    },
  },
};
</script>

<style scoped></style>
