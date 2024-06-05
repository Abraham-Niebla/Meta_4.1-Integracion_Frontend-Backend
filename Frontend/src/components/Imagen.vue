<template>
  <v-card class="mx-auto" width="400px">
    <v-img :src="image" cover> </v-img>

    <v-card-title class="text-indigo"> Imagen y Chiste </v-card-title>

    <v-card-actions>
      <v-btn color="cyan-darken-3" @click="getChiste" variant="text">
        Chiste
        <div class="chisteLoading" v-if="chisteLoading"></div>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn color="cyan-darken-3" @click="getImagen" variant="text">
        <div class="imageLoading" v-if="imageLoading"></div>
        Imagen
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="showChiste">
        <v-divider></v-divider>

        <v-card-text>
          {{ chiste }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
const showChiste = ref(false);
const imageLoading = ref(false);
const chisteLoading = ref(false);

const imageUrl = "https://picsum.photos/500/300";
const image = ref(imageUrl);

const chisteUrl = "https://api.chucknorris.io/jokes/random";
const chiste = ref("Chiste aquí");

async function getChiste() {
  console.log("Obteniendo chiste...");
  showChiste.value = false;
  chisteLoading.value = true;
  try {
    const response = await fetch(chisteUrl);
    const data = await response.json();

    if (response.ok) {
      console.log("Broma de Chuck Norris:", data.value);
      chiste.value = data.value;
      showChiste.value = true;
    } else {
      console.error("Error al obtener la broma de Chuck Norris:", data);
      chiste.value = data.value;
      showChiste.value = false;
    }
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    chiste.value = data.value;
    showChiste.value = false;
  } finally {
    chisteLoading.value = false;
  }
}

async function getImagen() {
  imageLoading.value = true;
  console.log("Obteniendo imagen...");
  try {
    const response = await fetch(imageUrl);
    console.log(response.url); // Esto no es necesario
    image.value = response.url; // Solo necesitas actualizar con la URL base de la imagen
  } catch (error) {
    console.error("Error al obtener la imagen:", error);
  } finally {
    imageLoading.value = false;
  }
}
</script>

<style scoped>
.imageLoading,
.imageLoading:after {
  display: block;
  width: 25px;
  height: 25px;
  border-radius: 80%;
}

.imageLoading {
  background-color: transparent;
  border-top: 4px solid rgb(0, 131, 143);
  border-right: 4px solid rgb(0, 131, 143);
  border-bottom: 4px solid rgb(0, 131, 143);
  border-left: 4px solid rgba(0, 131, 143, 0.2);
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-duration: 0.8s;
  animation-name: spinner-loading;
}

.chisteLoading,
.chisteLoading:after {
  display: block;
  width: 25px;
  height: 25px;
  border-radius: 80%;
}

.chisteLoading {
  background-color: transparent;
  border-top: 4px solid rgb(0, 131, 143);
  border-right: 4px solid rgb(0, 131, 143);
  border-bottom: 4px solid rgb(0, 131, 143);
  border-left: 4px solid rgba(0, 131, 143, 0.2);
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-duration: 0.8s;
  animation-name: spinner-loading;
}

@keyframes spinner-loading {
  0% {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(1turn);
  }
}
</style>
