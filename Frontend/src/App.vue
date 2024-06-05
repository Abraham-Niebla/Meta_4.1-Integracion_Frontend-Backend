<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar color="blue-lighten-5">
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>Multiples vistas</v-toolbar-title>
      
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" rail style="width: 250px" color="blue-lighten-5">
      <v-list density="compact" nav>
        <v-list-item
          class="text-cyan-darken-4"
          prepend-icon="mdi-home"
          title="Principal"
          link
          to="/"
        ></v-list-item>

        <v-list-item
          class="text-pink-darken-3"
          prepend-icon="mdi-puzzle"
          title="Activos"
          link
          to="/activos"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main
      class="d-flex align-center justify-center"
      style="min-height: 300px"
    >
      <router-view />
    </v-main>
  </v-layout>
</template>

<script setup>
  import { ref } from 'vue';
  const drawer = ref(false);
</script>
