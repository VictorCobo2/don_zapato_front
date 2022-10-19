<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-img
      height="140"
      class="pa-4"
      src="https://i.pinimg.com/originals/b8/f2/76/b8f276405f1dd323bfef01abf7232268.jpg"
    >
      <div class="text-center">
        <v-avatar class="mb-4" color="grey darken-1" size="64">
          <v-img
            aspect-ratio="30"
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          />
        </v-avatar>
        <h2 class="white--text">Don Zapato</h2>
      </div>
    </v-img>
    <v-divider></v-divider>
    <v-list>
      <v-list-item v-for="[icon, text] in links" :key="icon" link>
        <v-list-item-icon>
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <router-link to="/" tag="button">
            <v-list-item-title>{{ text }}</v-list-item-title>
          </router-link>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Sidebar",
  props: ["drawer"],
  data() {
    return {
      links: [
        ["mdi-microsoft-windows", "Dashboard", "/"],
        ["mdi-account", "Perfil", "/"],
        ["mdi-clipboard-list-outline", "Productos", "/"],
      ],
    };
  },
};
</script>

<style scoped></style>
