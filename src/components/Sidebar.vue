<template>
  <v-navigation-drawer v-model="drawer" app v-if="$route.name != 'login'">
    <v-img height="140" class="pa-4" src="https://i.pinimg.com/originals/b8/f2/76/b8f276405f1dd323bfef01abf7232268.jpg">
      <div class="text-center">
        <v-avatar class="mb-4" color="grey darken-1" size="64">
          <v-img aspect-ratio="30" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
        </v-avatar>
        <h2 class="white--text">Don Zapato</h2>
      </div>
    </v-img>
    <v-divider></v-divider>
    <v-list>
      <v-list-item v-for="(idex, i) in links" :key="i" link :to="idex.route">
        <v-list-item-icon>
          <v-icon>{{ idex.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ idex.text }}</v-list-item-title>
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
        { icon: "mdi-microsoft-windows", text: "Dashboard", route: "/" },
        { icon: "mdi-account", text: "Perfil", route: "/user" },
      ],
    };
  },
  methods: {
    prubea(url) {
      console.log("holaaa", url);
    },
  },
};
</script>

<style scoped></style>
