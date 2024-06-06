<template>
  <v-data-table
    :headers="headers"
    :items="etiquetas"
    class="elevation-1"
    height="530px"
  >
    <!--Barra superior-->
    <template v-slot:top>
      <!--Dentro de la barra superior-->
      <v-toolbar flat color="amber-lighten-5">
        <v-toolbar-title class="text-amber-darken-4">
          <h4> 
            <v-icon> mdi-tag </v-icon>
            Control de Etiquetas
          </h4>
        </v-toolbar-title>

        <v-spacer />
        <v-divider
          :thickness="3"
          color="teal-darken-3"
          class="mx-4"
          inset
          vertical
        />

        <!--Boton Nuevo Elemento-->
        <v-dialog v-model="dialog">
          <template v-slot:activator="{ props }">
            <v-btn color="light-green-darken-4" dark v-bind="props">
              <h4>
                <v-icon class="me-2"> mdi-pen-plus </v-icon>
                Nuevo Elemento
              </h4>
            </v-btn>
          </template>

          <v-container class="d-flex justify-center align-center fill-height">
            <!--Edicion de elemento existente o nuevo-->
            <v-card class="editElement-Card">
              <v-card-title color="light-green-darken-4">
                <span class="text-h5"
                  ><p style="color: #33691e">{{ formtitleElement }}</p></span
                >
              </v-card-title>

              <!--Editor de elemento-->
              <v-card-text>
                <v-container>

                  <v-row>
                    <v-col
                      cols="12"
                      sm="12"
                      md="12"
                      class="text-light-blue-darken-4"
                    >
                      <v-text-field
                        v-model="editedItem.etiqueta"
                        label="Etiqueta"
                      />
                    </v-col>
                  </v-row>

                </v-container>
              </v-card-text>

              <!--Confirmacion de editor de elemento-->
              <v-card-actions>
                <v-spacer />
                <v-btn color="red-darken-4" variant="text" @click="close">
                  <v-icon class="me-2"> mdi-cancel </v-icon>
                  Cancelar
                </v-btn>
                <v-btn
                  color="purple-darken-1"
                  variant="text"
                  @click="saveElement"
                >
                  <v-icon class="me-2"> mdi-content-save </v-icon>
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-container>
        </v-dialog>

        <v-divider
          :thickness="3"
          color="teal-darken-3"
          class="mx-4"
          inset
          vertical
        />

        <!--Confirmacion de eliminacion de elemento-->
        <v-dialog v-model="dialogDeleteItem" width="400px" class="text-center">
          <v-card>
            <v-card-title class="text-h5"
              >¿Eliminar este elemento?</v-card-title
            >
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="green-darken-4"
                variant="text"
                @click="closeDeleteItem"
              >
                <v-icon class="me-2"> mdi-cancel </v-icon>
                Cancelar
              </v-btn>
              <v-btn
                color="red-darken-4"
                variant="text"
                @click="deleteItemConfirm"
              >
                <v-icon class="me-2"> mdi-delete </v-icon>
                Eliminar
              </v-btn>
              <v-spacer />
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <!--Columna de Acciones-->
    <template v-slot:item.actions="{ item }">
      <v-icon
        size="small"
        class="me-2"
        color="cyan-darken-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon size="small" color="red-darken-2" @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>

    <!--Sin datos en la tabla-->
    <template v-slot:no-data>
      <h3><b style="color: #FF6F009c">¡Sin datos!</b></h3>
      <h3><b style="color: #FF6F009c">¡Añada elementos a la tabla!</b></h3>
    </template>
  </v-data-table>
</template>

<script setup>
import { ref, computed } from "vue";

const headers = [
  {
    title: "Etiqueta",
    key: "etiqueta",
    align: "justify",
    class: "text-amber",
    width: "85%",
  },
  {
    title: "Acciones",
    key: "actions",
    sortable: false,
    align: "center",
    width: "15%",
  },
];

const defaultEtiqueta = {
  id: "", // No se muestra, solo para relacionar objetos
  etiqueta: "",
};

const dialog = ref(false);
const dialogDeleteItem = ref(false);
const editedIndex = ref(-1);
const editedItem = ref({ ...defaultEtiqueta }); //Copia del modelo de item

const etiquetas = ref([]);

const urlEtiquetas = "https://localhost:4000/etiqueta";

//Crea el título del cuadro de diálogo para crear o editar un elemento
const formtitleElement = computed(() => {
  return editedIndex.value === -1 ? "Nuevo Elemento" : "Editar Elemento";
});

//Inicializa la tabla con los datos originales
const getData = async () => {
    console.log("Obteniendo datos de Etiquetas...");
  // Almacenar todas las etiquetas
  await fetch(urlEtiquetas, { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      // Obtener etiquetas y mapearlas para contruir los objetos deseados
      etiquetas.value = data.map((etiqueta) => ({
        id: etiqueta.id, // No se muestra, solo para relacionar objetos
        etiqueta: etiqueta.etiqueta,
      }));

      console.log("Etiquetas otenidas!");
    });
  console.log("Datos Obtenidos!!");
};

//Abre cuadro de dialogo para añadir/editar elemento
const editItem = async (item) => {
  editedIndex.value = etiquetas.value.indexOf(item);
  editedItem.value = { ...item };
  dialog.value = true;
};

//Abre cuadro de diálogo para borrar elemento
const deleteItem = async (item) => {
  editedIndex.value = etiquetas.value.indexOf(item);
  editedItem.value = { ...item };
  dialogDeleteItem.value = true;
};

//Elimina el elemento seleccionado
const deleteItemConfirm = async () => {
  try {
    //Eliminar la etiqueta
    let url = `${urlEtiquetas}/id/${editedItem.value.id}`;
      await fetch(url, { // Se elimina la etiqueta
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
      },
    });

    //Eliminar el activo de la tabla
    await etiquetas.value.splice(editedIndex.value, 1);

    closeDeleteItem();
  }
  catch (error) {
    console.error("Error al eliminar: " + error);
  }
};

//Cierra el cuadro de diálogo de añadir/editar elemento
const close = () => {
  dialog.value = false;
  editedItem.value = { ...defaultEtiqueta }; //Copia del modelo de item
  editedIndex.value = -1;
};

//Cierra el cuadro de diálogo de borrado de elemento
const closeDeleteItem = () => {
  dialogDeleteItem.value = false;
  editedItem.value = { ...defaultEtiqueta };
  editedIndex.value = -1;
};

//Guarda un elemento editado o nuevo
const saveElement = async () => {
  // Guarda un elemento editado
  if (typeof(editedItem.value.id) === "number") {
    try {
      //Guardar cambios en el activo
      let url = `${urlEtiquetas}/id/${editedItem.value.id}`;

      let response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify({
          id: editedItem.value.id,
          etiqueta: editedItem.value.etiqueta,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      let json = await response.json();
      editedItem.value.id = json.id;
      editedItem.value.etiqueta = json.etiqueta;

      Object.assign(etiquetas.value[editedIndex.value], editedItem.value);
      close();
    }
    catch (error) {
      console.error("Error saving edited element:", error);
      close();
    }
  }

  // Guarda un elemento nuevo
  else {
    try {
      //Guardar Nuevo elemento etiqueta
      let response = await fetch(urlEtiquetas, {
        method: "POST",
        body: JSON.stringify({
          id: editedItem.value.id,
          etiqueta: editedItem.value.etiqueta,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      let json = await response.json();
      editedItem.value.id = json.id;
      editedItem.value.etiqueta = json.etiqueta;

      //Añadir elemento a la lista a mostrar
      etiquetas.value.push({ ...editedItem.value });
      close();
    }
    catch (error) {
      console.error("Error saving new element:", error);
    }
  }
};


// console.log("innerWidth ", window.innerWidth);
// console.log("innerHeight ", window.innerHeight);
getData();
</script>

<style scoped>
.fill-height {
  height: 100vh;
}

.editElement-Card {
  min-width: 60vw; /*Ancho minimo (Horizontal)*/
  min-height: 30vh; /*Alto minimo (Vertical)*/
  transition: width 0.3s ease, height 0.3s ease;
}
</style>
