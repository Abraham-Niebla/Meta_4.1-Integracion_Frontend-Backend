<template>
  <v-data-table
    :headers="headers"
    :items="filteredactivos"
    class="elevation-1"
    height="530px"
  >
    <!--Barra superior-->
    <template v-slot:top>
      <!--Dentro de la barra superior-->
      <v-toolbar flat color="indigo-lighten-5">
        <v-toolbar-title class="text-purple-darken-3"
          ><h4>Control de activos</h4></v-toolbar-title
        >

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
                    <v-col cols="12" sm="6" md="4" class="text-indigo-darken-4">
                      <v-select
                        v-model="editedItem.etiqueta"
                        :items="etiquetasList"
                        item-title="etiquetaName"
                        label="Activo"
                        multiple
                        clearable
                        chips
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="4" class="text-blue-darken-4">
                      <v-text-field
                        v-model="editedItem.responsable"
                        label="Responsable"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                      class="text-light-blue-darken-4"
                    >
                      <v-text-field
                        v-model="editedItem.ubicacion"
                        label="Ubicación"
                      />
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col
                      cols="12"
                      sm="12"
                      md="12"
                      class="text-light-blue-darken-4"
                    >
                      <v-text-field
                        v-model="editedItem.desc"
                        label="Descripción"
                      />
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-spacer />
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                      class="text-light-blue-darken-4"
                    >
                      <v-text-field
                        v-model="editedItem.noSerie"
                        label="No. Serie"
                      />
                    </v-col>
                    <v-spacer />
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                      class="text-light-blue-darken-4"
                    >
                      <v-text-field
                        v-model="editedItem.noInv"
                        label="No. Inventario"
                      />
                    </v-col>
                    <v-spacer />
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
      <h3><b style="color: #9d19529c">¡Sin datos!</b></h3>
      <h3><b style="color: #9d19529c">¡Añada elementos a la tabla!</b></h3>
    </template>
  </v-data-table>
</template>

<script setup>
import { ref, computed } from "vue";

const headers = [
  {
    title: "Activo",
    key: "etiquetaSTR",
    align: "justify",
    class: "text-amber",
    width: "15%",
  },
  {
    title: "Descripción",
    key: "desc",
    align: "justify",
    class: "text-amber",
    width: "30%",
  },
  {
    title: "No. Serie",
    key: "noSerie",
    align: "justify",
    class: "text-amber",
    width: "10%",
  },
  {
    title: "No. Inventario",
    key: "noInv",
    align: "justify",
    class: "text-amber",
    width: "10%",
  },
  { title: "Responsable", key: "responsable", align: "justify", width: "15%" },
  { title: "Ubicacion", key: "ubicacion", align: "justify", width: "15%" },
  {
    title: "Acciones",
    key: "actions",
    sortable: false,
    align: "center",
    width: "5%",
  },
];

const defaultActivo = {
  id: "", // No se muestra, solo para relacionar objetos
  noSerie: "",
  noInv: "",
  etiquetaID: [], // No se muestra, solo para relacionar objetos
  etiqueta: [],
  etiquetaSTR: "",
  desc: "",
  responsableID: "", // No se muestra, solo para relacionar objetos
  responsable: "",
  ubicacionID: "", // No se muestra, solo para relacionar objetos
  ubicacion: "",
};

const dialog = ref(false);
const dialogDeleteItem = ref(false);
const dialogSearch = ref(false); // Cuadro de dialogo para busqueda
const searchQuery = ref("");
const activos = ref([]);
const filteredactivos = ref([]);
let editedIndex = ref(-1);
const editedItem = ref({ ...defaultActivo }); //Copia del modelo de item

let column = null;
let inline = ref("radioTodos");

const responsablesList = [];
const ubicacionesList = [];
const etiquetasList = ref([]);
const tiposDeActivosList = [];

const urlActivos = "https://localhost:4000/activo";
const urlResponsables = "https://localhost:4000/responsable";
const urlUbicaciones = "https://localhost:4000/ubicacion";
const urlEtiquetas = "https://localhost:4000/etiqueta";
const urlTiposDeActivos = "https://localhost:4000/tipodeactivo";

//Crea el título del cuadro de diálogo para crear o editar un elemento
const formtitleElement = computed(() => {
  return editedIndex.value === -1 ? "Nuevo Elemento" : "Editar Elemento";
});

//Inicializa la tabla con los datos originales
const getData = async () => {
  console.log("Obteniendo datos de Responsables...");
  // Almacenar todas los resposnables
  await fetch(urlResponsables, { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      // Crear un mapeo de userId a nombres de autores
      data.forEach((responsable) => {
        responsablesList[responsable.id] = responsable;
      });

      console.log("Responsables otenidos!");
    });

  console.log("Obteniendo datos de Ubicaciones...");
  // Almacenar todas las ubicaciones
  await fetch(urlUbicaciones, { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      // Crear un mapeo de userId a nombres de autores
      data.forEach((ubicacion) => {
        ubicacionesList[ubicacion.id] = ubicacion;
      });

      console.log("Ubicaciones otenidos!");
    });

  console.log("Obteniendo datos de Etiquetas...");
  // Almacenar todas las ubicaciones
  await fetch(urlEtiquetas, { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      // Obtener etiquetas y mapearlas para contruir los objetos deseados
      etiquetasList.value = data.map((etiqueta) => ({
        id: etiqueta.id, // No se muestra, solo para relacionar objetos
        etiquetaName: etiqueta.etiqueta,
      }));

      console.log("Etiquetas otenidas!");
    });

  console.log("Obteniendo datos de Activos...");
  // Obtener activos y mapearlos para contruir los objetos deseados
  await fetch(urlActivos, { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      activos.value = data.map((activo) => ({
        id: activo.id, // No se muestra, solo para relacionar objetos
        noSerie: activo.noSerie,
        noInv: activo.noInv,
        etiquetaID: 0,
        etiqueta: 0,
        desc: activo.desc,
        responsableID: activo.responsableID,
        responsable: responsablesList[activo.responsableID].nombre,
        ubicacionID: activo.ubicacionID,
        ubicacion: ubicacionesList[activo.ubicacionID].desc,
      }));

      activos.value.forEach(async (activo) => {
        activo.etiqueta = [];
        let url = urlTiposDeActivos + "/activo/" + activo.id;
        let tiposID = [];

        await fetch(url, { method: "GET" })
          .then((response) => response.json())
          .then(async (data) => {
            await data.forEach(async (tipo) => {
              tiposID.push(tipo.etiqueta);
            });
          });

        let cad = "";
        tiposID.forEach((tipo, index) => {
          const etiqueta = etiquetasList.value.find(
            (etiqueta) => etiqueta.id === tipo
          );
          if (etiqueta) {
            activo.etiqueta.push(etiqueta.etiquetaName);
            if (index === 0) {
              cad = etiqueta.etiquetaName;
            } else {
              cad += ", " + etiqueta.etiquetaName;
            }
          }
        }); //Posiblemente cambiar
        activo.etiquetaSTR = cad;
        activo.etiquetaID = tiposID;
      });

      filteredactivos.value = activos.value;

      console.log("Activos otenidos!");
    });

  // console.log("Datos Obtenidos:", filteredactivos.value);
  console.log("Datos Obtenidos!!");
};

//Abre cuadro de dialogo para añadir/editar elemento
const editItem = (item) => {
  editedIndex.value = filteredactivos.value.indexOf(item);
  editedItem.value = { ...item };
  dialog.value = true;
};

//Abre cuadro de diálogo para borrar elemento
const deleteItem = (item) => {
  editedIndex.value = filteredactivos.value.indexOf(item);
  editedItem.value = { ...item };
  dialogDeleteItem.value = true;
};

//Elimina el elemento seleccionado
const deleteItemConfirm = () => {
  const url = urlActivos + "/id/" + (editedIndex.value + 1);
  fetch(url, {
    method: "DELETE",
  });
  filteredactivos.value.splice(editedIndex.value, 1);
  closeDeleteItem();
};

//Cierra el cuadro de diálogo de añadir/editar elemento
const close = () => {
  dialog.value = false;
  editedItem.value = { ...defaultActivo }; //Copia del modelo de item
  editedIndex.value = -1;
};

//Cierra el cuadro de diálogo de borrado de elemento
const closeDeleteItem = () => {
  dialogDeleteItem.value = false;
  editedItem.value = { ...defaultActivo };
  editedIndex.value = -1;
};

//Guarda un elemento editado o nuevo
const saveElement = async () => {
  // Guarda un elemento editado
  if (editedIndex.value > -1) {
    try {
      let url = `${urlActivos}/id/${editedIndex.value + 1}`;
      console.log(url);

      let response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify({
          id: editedItem.value.id,
          noSerie: editedItem.value.noSerie,
          noInv: editedItem.value.noInv,
          desc: editedItem.value.desc,
          responsable: editedItem.value.responsableID,
          ubicacion: editedItem.value.ubicacionID,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      let json = await response.json();
      editedItem.value.id = json.id;
      editedItem.value.noSerie = json.noSerie;
      editedItem.value.noInv = json.noInv;
      editedItem.value.desc = json.desc;
      editedItem.value.responsableID = json.responsableID;
      editedItem.value.responsable = responsablesList[json.responsableID].nombre;
      editedItem.value.ubicacionID = json.ubicacionID;
      editedItem.value.ubicacion = ubicacionesList[json.ubicacionID].desc;

      let auxActivo = editedItem.value.id;
      // let auxTag = editedItem.value.etiqueta;
      let auxTag = [];

      for (const tagName of editedItem.value.etiqueta) {
      const tagNo = await etiquetasList.value.find(
          (etiqueta) => etiqueta.etiquetaName === tagName
        );
      auxTag.push(tagNo.id);
      }
      
      url = `${urlTiposDeActivos}/activo/${editedIndex.value + 1}`;
      await fetch(url, { // Se eliminan todas las etiquetas del activo
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      
      // Para todas las etiquetas seleccionadas
      editedItem.value.etiquetaID = [];
      editedItem.value.etiqueta = [];
      
      for (const tagNo of auxTag) {        
        response = await fetch(urlTiposDeActivos, { // Se agregan las nuevas relaciones del activo con todas las etiquetas
          method: "POST",
          body: JSON.stringify({
            activo: editedItem.value.id,
            etiqueta: tagNo,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });

        json = await response.json();
        editedItem.value.id = json.activo;
        editedItem.value.etiquetaID.push(json.etiqueta);
        editedItem.value.etiqueta.push(etiquetasList.value[json.etiqueta - 1].etiquetaName);
      }
      
      // Convertir array de etiquetas a cadena separada por comas y espacios
      editedItem.value.etiquetaSTR = editedItem.value.etiqueta.join(", ");
      Object.assign(filteredactivos.value[editedIndex.value], editedItem.value);
      
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
      let response = await fetch(urlActivos, {
        method: "POST",
        body: JSON.stringify({
          id: editedItem.value.id,
          noSerie: editedItem.value.noSerie,
          noInv: editedItem.value.noInv,
          desc: editedItem.value.desc,
          responsable: editedItem.value.responsable,
          ubicacion: editedItem.value.ubicacion,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      let json = await response.json();
      editedItem.value.id = json.id;
      editedItem.value.noSerie = json.noSerie;
      editedItem.value.noInv = json.noInv;
      editedItem.value.desc = json.desc;
      editedItem.value.responsable = json.responsable;
      editedItem.value.ubicacion = json.ubicacion;

      console.log(urlTiposDeActivos);

      response = await fetch(urlTiposDeActivos, {
        method: "POST",
        body: JSON.stringify({
          activo: editedItem.value.id,
          etiqueta: editedItem.value.etiquetaID,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      json = await response.json();
      editedItem.value.id = json.activo;
      editedItem.value.etiquetaID = json.etiqueta;
      
      filteredactivos.value.push({ ...editedItem.value });

      close();
    } catch (error) {
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
  width: 90vw;
  height: 65vh;
  transition: width 0.3s ease, height 0.3s ease;
}
</style>
