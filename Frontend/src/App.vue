<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar color="teal-lighten-5">
      <v-app-bar-nav-icon
        variant="text"
        class="text-teal-darken-4"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title class="text-teal-darken-4"><b>Multiples vistas</b></v-toolbar-title>
      
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" rail style="width: 250px" color="teal-lighten-5">
      <v-list density="compact" nav>
        <v-list-item
          class="text-purple-darken-4"
          prepend-icon="mdi-home"
          title="Principal"
          link
          to="/" />

        <v-list-item
          class="text-light-blue-darken-4"
          prepend-icon="mdi-archive"
          title="Activos"
          link
          to="/activos" />
        
        <v-list-item
          class="text-light-green-darken-4"
          prepend-icon="mdi-account"
          title="Responsables"
          link
          to="/responsables" />
        
        <v-list-item
          class="text-red-darken-4"
          prepend-icon="mdi-map-marker"
          title="Ubicaciones"
          link
          to="/ubicaciones" />
        
        <v-list-item
          class="text-amber-darken-4"
          prepend-icon="mdi-tag"
          title="Etiquetas"
          link
          to="/etiquetas" />

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
