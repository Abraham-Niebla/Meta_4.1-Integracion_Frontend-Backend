<template>
  <v-data-table
    :headers="headers"
    :items="filteredCreadores"
    class="elevation-1"
    height = "530px">
    <!--Barra superior-->
    <template v-slot:top>
      <!--Dentro de la barra superior-->
      <v-toolbar flat color="indigo-lighten-5">
        <v-toolbar-title class="text-purple-darken-3"
          ><h4>Autores y sus Publicaciones</h4></v-toolbar-title
        >

        <v-spacer />
        <v-divider
          :thickness="3"
          color="teal-darken-3"
          class="mx-4"
          inset
          vertical
        />

        <!--ESPACIO DIVISOR PARA BUSQUEDA-->
        <v-dialog v-model="dialogSearch" width="700px">
          <template v-slot:activator="{ props }">
            <v-btn color="purple-darken-4" dark v-bind="props">
              <h4>
                <v-icon class="me-2"> mdi-magnify </v-icon>
                Buscar Elemento
              </h4>
            </v-btn>
          </template>

          <!--Edicion de elemento existente o nuevo-->
          <v-card>
            <v-card-title>
              <span class="text-h5">Buscar Elemento</span>
            </v-card-title>

            <!--Editor de elemento-->
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col class="text-purple-darken-3">
                    <v-text-field v-model="searchQuery" label="Buscar" dense />
                  </v-col>
                </v-row>

                <v-radio-group v-model="inline" inline>
                  <v-row>
                    <v-col class="text-indigo-darken-4">
                      <v-radio label="Autor" value="radioAutor" />
                    </v-col>

                    <v-col class="text-blue-darken-4">
                      <v-radio label="Título" value="radioTitulo" />
                    </v-col>

                    <v-col class="text-light-blue-darken-4">
                      <v-radio label="Post" value="radioPost" />
                    </v-col>

                    <v-col class="text-purple-darken-4">
                      <v-radio label="Todos" value="radioTodos" />
                    </v-col>
                  </v-row>
                </v-radio-group>
              </v-container>
            </v-card-text>

            <!--Buscar elemento-->
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="cyan-darken-4"
                variant="text"
                @click="clearSearch">
                <v-icon class="me-2"> mdi-broom </v-icon>
                Limpiar
              </v-btn>

              <v-btn
                color="purple-darken-1"
                variant="text"
                @click="closeSearch">
                <v-icon class="me-2"> mdi-magnify </v-icon>
                Buscar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!--ESPACIO DIVISOR PARA BUSQUEDA-->

        <v-divider
          :thickness="3"
          color="teal-darken-3"
          class="mx-4"
          inset
          vertical/>

        <!--Boton Reinicio-->
        <v-btn color="light-blue-darken-4" @click="initialize">
          <h4>
            <v-icon class="me-2"> mdi-restart </v-icon>
            Reiniciar
          </h4>
        </v-btn>

        <v-divider
          :thickness="3"
          color="teal-darken-3"
          class="mx-4"
          inset
          vertical
        />

        <!--Boton Nuevo Elemento-->
        <v-dialog v-model="dialog" width="1200px">
          <template v-slot:activator="{ props }">
            <v-btn color="light-green-darken-4" dark v-bind="props">
              <h4>
                <v-icon class="me-2"> mdi-pen-plus </v-icon>
                Nuevo Elemento
              </h4>
            </v-btn>
          </template>

          <!--Edicion de elemento existente o nuevo-->
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formtitleElement }}</span>
            </v-card-title>

            <!--Editor de elemento-->
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4" class="text-indigo-darken-4">
                    <v-text-field
                      v-model="editedItem.autorName"
                      label="Autor"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="4" class="text-blue-darken-4">
                    <v-text-field v-model="editedItem.title" label="Título" />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                    class="text-light-blue-darken-4"
                  >
                    <v-text-field v-model="editedItem.post" label="Post" />
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
              <v-btn color="purple-darken-1" variant="text" @click="save">
                <v-icon class="me-2"> mdi-content-save </v-icon>
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-divider
          :thickness="3"
          color="teal-darken-3"
          class="mx-4"
          inset
          vertical
        />

        <!--Confirmacion de eliminacion de elemento-->
        <v-dialog
          v-model="dialogDeleteItem"
          width="400px"
          class="text-center"
        >
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
        @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" color="red-darken-2" @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>

    <!--Sin datos en la tabla-->
    <template v-slot:no-data>
      <b style="color: #9d19529c">¡Sin datos!</b>
    </template>
  </v-data-table>
</template>

<script setup>
import { ref, computed } from "vue";

const urlPosts = "https://jsonplaceholder.typicode.com/posts";
const urlAutores = "https://jsonplaceholder.typicode.com/users";

const headers = [
  { title: "Autor", key: "autorName", align: "justify", class: "text-amber", width: '10%' },
  { title: "Titulo", key: "title", align: "justify", width: '20%' },
  { title: "Post", key: "post", align: "justify", width: '65%' },
  //{ title: "Autor ID", key: "autorID", align: "justify" }, //TEMPORAL
  { title: "Acciones", key: "actions", sortable: false, align: "center", width: '5%' },
];

const defaultItem = {
  autorName: "",
  autorID: "",
  title: "",
  post: "",
};

const dialog = ref(false);
const dialogDeleteItem = ref(false);
const dialogSearch = ref(false); // Cuadro de dialogo para busqueda
const searchQuery = ref("");
const creadores = ref([]);
const filteredCreadores = ref([]);
let editedIndex = ref(-1);
const editedItem = ref({ ...defaultItem }); //Copia del modelo de item
const autoresMap = ref({}); // Un mapeo de userId a nombres de autores
let column = null;
let inline = ref("radioTodos");

//Crea el título del cuadro de diálogo para crear o editar un elemento
const formtitleElement = computed(() => {
  return editedIndex.value === -1 ? "Nuevo Elemento" : "Editar Elemento";
});

//Inicializa la tabla con los datos originales
const initialize = async () => {
  await fetch(urlAutores)
    .then((response) => response.json())
    .then((data) => {
      // Crear un mapeo de userId a nombres de autores
      data.forEach((autor) => {
        autoresMap.value[autor.id] = autor.name;
      });
    });

  await fetch(urlPosts)
    .then((response) => response.json())
    .then((data) => {
      creadores.value = data.map((post) => ({
        autorName: autoresMap.value[post.userId], // Usar el mapeo para obtener el nombre del autor
        autorID: post.userId,
        title: post.title,
        post: post.body,
      }));
      filteredCreadores.value = creadores.value;
    });
  console.log("Datos Obtenidos");
};

//Abre cuadro de dialogo para añadir/editar elemento
const editItem = (item) => {
  editedIndex.value = filteredCreadores.value.indexOf(item);
  editedItem.value = { ...item };
  dialog.value = true;
};

//Abre cuadro de diálogo para borrar elemento
const deleteItem = (item) => {
  editedIndex.value = filteredCreadores.value.indexOf(item);
  editedItem.value = { ...item };
  dialogDeleteItem.value = true;
};

//Elimina el elemento seleccionado
const deleteItemConfirm = () => {
  const url = 'https://jsonplaceholder.typicode.com/posts/' + (editedIndex.value + 1);
  fetch(url, {
    method: 'DELETE',
  });
  filteredCreadores.value.splice(editedIndex.value, 1);
  closeDeleteItem();
};

//Cierra el cuadro de diálogo de añadir/editar elemento
const close = () => {
  dialog.value = false;
  editedItem.value = { ...defaultItem };//Copia del modelo de item
  editedIndex.value = -1;
};

//Cierra el cuadro de diálogo de borrado de elemento
const closeDeleteItem = () => {
  dialogDeleteItem.value = false;
  editedItem.value = { ...defaultItem };
  editedIndex.value = -1;
};

const clearSearch = () => {
  searchQuery.value = "";
  inline.value = "radioTodos";
  closeSearch();
}

//Cierra el cuadro de diálogo de búsqueda
const closeSearch = () => {
  dialogSearch.value = false;
  search();
};

//Busca elementos que coincidan con los criterios
const search = () => {
  const query = searchQuery.value.toLowerCase().trim();
  
  filteredCreadores.value = creadores.value.filter((creador) => {
    // Filtra los elementos que contienen la consulta en el autor, título o post.
    if (query) {
      if (inline.value === "radioAutor")
        return creador.autorName.toLowerCase().includes(query);
      else if (inline.value === "radioTitulo")
        return creador.title.toLowerCase().includes(query);
      else if (inline.value === "radioPost")
        return creador.post.toLowerCase().includes(query);
      else if (inline.value === "radioTodos")
        return (
          creador.autorName.toLowerCase().includes(query) ||
          creador.title.toLowerCase().includes(query) ||
          creador.post.toLowerCase().includes(query)
        );
    } else {
      return true; // Si no hay consulta, mostrar todos los elementos
    }
  });
};

//Guarda un elemento editado o nuevo
const save = () => {
  //Guarda un elemento editado
  if (editedIndex.value > -1)
  {
    const url = 'https://jsonplaceholder.typicode.com/posts/' + (editedIndex.value + 1);
    console.log(url)
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify({
        id: 1,
        title: editedItem.value.title,
        body: editedItem.value.post,
        userId: editedItem.value.autorID,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        editedItem.value.autorID = json.userId;
        editedItem.value.post = json.body;
        editedItem.value.title = json.title;
        Object.assign(filteredCreadores.value[editedIndex.value], editedItem.value);

        close();
      });
  }
  //Guarda un elemento nuevo
  else
  {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: editedItem.value.title,
        body: editedItem.value.post,
        userId: Math.round(Math. random()*100),
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        editedItem.value.autorID = json.userId;
        editedItem.value.post = json.body;
        editedItem.value.title = json.title;
        filteredCreadores.value.push({ ...editedItem.value });

        close();
      });
  }
};
console.log("innerWidth ", window.innerWidth);
console.log("innerHeight ", window.innerHeight);
initialize();
</script>
