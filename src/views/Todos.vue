<script setup>
import { ref, onBeforeUnmount, onBeforeMount, computed } from 'vue'
import Swal from 'sweetalert2'


let user = ref(0);
let titulo = ref("");
let descripcion = ref("");
let estado = ref("creada");
let tipo = ref("normal");
let bearerToken = ref("");
let todos = ref([]);
let bandera = ref(1);
let isModalVisible = ref(false);
let modalvisiblecreate = ref(false);
let token = localStorage.getItem("token");
let string = new String(token);
let bearer = "Bearer " + string.toString() + "";
let tipos = ref([
  { value: 'urgente', text: 'Urgente' },
  { value: 'normal', text: 'Normal' },
  { value: 'moderada', text: 'Moderada' },]);

let estatus = ref([{ value: 'creada', text: 'Creada' },
{ value: 'pendiente', text: 'Pendiente' },
{ value: 'en proceso', text: 'En proceso' },
{ value: 'finalizada', text: 'Finalizada' },]);


const options = {
  method: 'GET',
  headers: {
    Authorization: bearer,
  }
};


fetch('http://localhost:8080/api/task', options)
  .then(response => response.json())
  .then(response => {
    todos.value = response;
    bandera.value = 1;
  })
  .catch(err => {
    window.location.href = '/login';
  });



let logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
}



async function createTask() {
  let token = localStorage.getItem("token");

  let string = new String(token);
  let bearer = "Bearer " + string.toString() + "";
  bearerToken.value = bearer;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearer
    },
    body: JSON.stringify({ titulo: titulo.value, descripcion: descripcion.value, tipo: tipo.value })
  };

  fetch('http://localhost:8080/api/task', options)
    .then(response => response.json())
    .then(async response => {

      if (response.success) {
        let reloaDR = await reloadDataRender();
        todos.value = reloaDR;
        titulo.value = "";
        descripcion.value = ""
        tipo.value = "normal"
        modalvisiblecreate.value = false;
        Swal.fire({
          title: "Creado!",
          text: "Se ha Creado con exito la tarea",
          icon: "success",
          timer: 1800
        });
      } else {
        Swal.fire({
          title: "¡Ocurrio un problema!",
          text: response.message,
          icon: "warning",
          timer: 1800
        });
      }

    })
    .catch(err => {
      localStorage.removeItem('token');
      window.location.href = '/login';
    });
}



async function reloadDataRender() {
  const optionsDR = {
    method: 'GET',
    headers: {
      Authorization: bearer,
    }
  };

  try {
    const response = await fetch('http://localhost:8080/api/task', optionsDR);
    if (!response.ok) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    const responseData = await response.json();

    return responseData;
  } catch (error) {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

}




async function mostrarModalEditar(item) {

  isModalVisible.value = true;
  let task = await getTask(item);
  console.log(task);
  titulo.value = task.task.titulo;
  tipo.value = task.task.tipo;
  estado.value = task.task.estado;
  descripcion.value = task.task.descripcion;
  user.value = item;


}

async function getTask(id) {

  const optionsG = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearer
    },

  };


  try {
    const response = await fetch('http://localhost:8080/api/task/' + id + '', optionsG);
    if (!response.ok) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    const responseData = await response.json();

    return responseData;
  } catch (error) {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
}





//Muestra un sweel alert para la confirmacion al momento de elimina una tarea
async function modaldelete(id_task) {
  Swal.fire({
    title: "¿Seguro que desea eliminar la tarea?",

    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Aceptar",
    confirmButtonColor: "#3085d6",
    cancelButtonText: "Cancelar",
    cancelButtonColor: "#d33",

  }).then((result) => {
    if (result.isConfirmed) {

      const optionsG = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearer
        },
      };

      fetch('http://localhost:8080/api/task/' + id_task + '', optionsG)
        .then(response => response.json())
        .then(async response => {

          if (response.success) {
            const options = {
              method: 'GET',
              headers: {
                Authorization: bearer,
              }
            };


            fetch('http://localhost:8080/api/task', options)
              .then(response => response.json())
              .then(response => {
                todos.value = response;
              })
              .catch(err => {
                window.location.href = '/login';
              });
            Swal.fire({
              title: "¡Eliminado!",
              text: "Se ha eliminado con exito la tarea",
              icon: "success",
              timer: 1800
            });

          } else {
            Swal.fire({
              title: "¡No eliminada!",
              text: response.message,
              icon: "error",
              timer: 1800
            });
          }


        })
        .catch(err => {
          localStorage.removeItem('token');
          window.location.href = '/login';
        });

    }
  });
}




function cancelSendData() {
  titulo.value = "";
  descripcion.value = "";
  estado.value = "creada";
  tipo.value = "normal";
  isModalVisible.value = false;
  modalvisiblecreate.value = false;
}




async function update() {

  let string = new String(token);
  let bearer = "Bearer " + string.toString() + "";
  bearerToken.value = bearer;

  const optionsP = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearer
    },
    body: JSON.stringify({ titulo: titulo.value, descripcion: descripcion.value, tipo: tipo.value, estado: estado.value })
  };

  fetch('http://localhost:8080/api/task/' + user.value, optionsP)
    .then(response => response.json())
    .then(async response => {


      if (response.success) {
        let reloaDR = await reloadDataRender();
        todos.value = reloaDR;
        titulo.value = "";
        descripcion.value = ""
        tipo.value = "normal"
        isModalVisible.value = false;
        Swal.fire({
          title: "Actualizada!",
          text: "Se ha actualizado con exito la tarea",
          icon: "success",
          timer: 1800
        });
      } else {
        Swal.fire({
          title: "¡Ocurrio un problema!",
          text: response.message,
          icon: "warning",
          timer: 1800
        });
      }
    })
    .catch(err => {
      console.log(err);
      localStorage.removeItem('token');
      window.location.href = '/login';
    });
}



</script>

<template class="template_todo">
  <main class="conenedor-todos">
    <div class="enb">
      <header class="headertodo">
        <article>
          <img src="../assets/tareas.png" alt="">
        </article>
        <article>
          <button @click="logout">cerrar sesion</button>
        </article>
       

      </header>


      <section>

        <span @click="modalvisiblecreate = true">+</span>
      </section>
      <div class="Filtros">

      </div>


      <div v-if="bandera" class="datos_rendering">

        <table id="customers">
          <tr>
            <th>Título</th>

            <th>Editar</th>
            <!-- <th>Ver</th> -->
            <th>Eliminar</th>
            <th>status</th>
          </tr>
          <tr v-for="item in todos.datos">
            <td>{{ item.titulo }}</td>
            <td @click="mostrarModalEditar(item.id)">
              <i class="fa fa-pencil" aria-hidden="true" data-id="item.id"></i>
            </td>
            <!-- <td @click="modalShow(item.id)"><i class="fa fa-eye" aria-hidden="true"></i></td> -->
            <td @click="modaldelete(item.id)"><i class="fa fa-trash" style="color: red;" aria-hidden="true"></i></td>

            <td>
              <span class="status-blue" v-if="item.estado == 'creada'"></span>
              <span class="status-red" v-else-if="item.estado == 'pendiente'"></span>
              <span class="status-yellow" v-else-if="item.estado == 'en proceso'"></span>
              <span class="status-green" v-else-if="item.estado == 'finalizada'"></span>
            </td>
          </tr>

        </table>
      </div>
    </div>

  </main>




  <!-- Esta sección es para el modal de mostrar y -->
  <div v-if="isModalVisible" class="modal-contenedor">
    <div class="modal">
      <div class="modal-content">
        <h1>Tarea</h1>
        <section>
          <input type="text" id="titulo" v-model.trim="titulo">
          <textarea rows="10" cols="40" id="descripcion" v-model.trim="descripcion"></textarea>

        </section>
        <section>
          <select v-model="tipo">
            <option v-for="option in tipos" :key="option.value" :value="option.value">
              {{ option.text }}</option>

          </select>
          <select v-model="estado">
            <div></div>
            <option v-for="option in estatus" :key="option.value" :value="option.value">{{ option.text }}</option>
          </select>
        </section>
        <section class="buttons">
          <button @click="cancelSendData">Cancelar</button>
          <button @click="update">Guardar</button>
        </section>
      </div>
    </div>
  </div>


  <!-- Modal para la creacion de un tarea -->

  <div v-if="modalvisiblecreate" class="modal-contenedor modal-delete">
    <div class="modal">
      <div class="modal-content">
        <h1>Tarea</h1>
        <section>
          <input type="text" id="titulo" v-model.trim="titulo">
          <textarea rows="10" cols="40" id="descripcion" v-model.trim="descripcion"></textarea>

        </section>
        <section>
          <select v-model="tipo">
            <option v-for="option in tipos" :key="option.value" :value="option.value">
              {{ option.text }}</option>

          </select>

        </section>
        <section class="buttons">
          <button @click="cancelSendData">Cancelar</button>
          <button @click="createTask">Guardar</button>
        </section>
      </div>
    </div>
  </div>
</template>




<style scoped>
.datos_rendering {

  width: 100%;
  height: auto;
}

.status-blue {
  height: 13px !important;
  width: 13px !important;
  border: 1px solid rgb(73, 142, 252);
  background-color: rgb(93, 152, 246);
  box-sizing: border-box;
  border-radius: 50%;
  display: block;
  margin: auto;
}

.status-green {
  height: 13px !important;
  width: 13px !important;
  border: 1px solid rgb(5, 149, 86);
  background-color: rgb(34, 152, 101);
  box-sizing: border-box;
  border-radius: 50%;
  display: block;
  margin: auto;
}

.status-yellow {
  height: 13px !important;
  width: 13px !important;
  border: 1px solid rgba(40, 40, 39, 0.422);
  background-color: rgb(228, 232, 0);
  box-sizing: border-box;
  border-radius: 50%;
  display: block;
  margin: auto;
}

.status-red {
  height: 13px !important;
  width: 13px !important;
  border: 1px solid rgb(232, 0, 0);
  background-color: rgb(181, 0, 0);
  box-sizing: border-box;
  border-radius: 50%;
  display: block;
  margin: auto;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(217, 217, 217, 0.485);
  z-index: 100;
}


.modal-content {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  width: 35vw;
  border-radius: 10px;
  border: 1px solid rgba(198, 198, 198, 0.764);
}

.conenedor-todos {
  width: 100vw;
  height: 100vh;
  background-color: white;
}

.enb {
  display: flex;
  justify-content: space-around;
  margin: auto;
  flex-wrap: wrap;
  width: 50vw;
}

.headertodo {
  box-sizing: border-box;
  /* border: 1px solid blue; */
  margin-top: 6vh;
  height: 6vh;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
}

.headertodo article {
  height: auto;
  width: 50%
}


.headertodo article img {
  height: 6vh;
  width: auto;
}


.headertodo article:last-of-type {
  display: flex;
  justify-content: right;
  align-items: center;
}

.headertodo article:last-of-type button {
  float: right;
  background-color: rgb(63, 62, 62);
  ;
  color: whi;

  box-sizing: border-box;
  padding: 1% 5%;
  color: white;
  border: 1px solid rgb(63, 62, 62);
  border-radius: 4px;
  font-size: 1.1rem;
  font-family: Arial, Helvetica, sans-serif;



}

.enb section {
  margin-top: 3vh;
  width: 100%;
  display: flex;
  height: 5vh;
  align-items: center;
  justify-content: center;

}

.enb section span {
  background-color: rgb(4, 0, 85);
  color: white;
  height: 35px;
  width: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 2vh;
  cursor: pointer;
}

#customers {

  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td,
#customers th {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  cursor: pointer;
}

#customers tr:nth-child(even) {
  background-color: #dbdbdb;
}

#customers tr:hover {
  background-color: #ddd;
}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: rgb(4, 0, 85);
  color: white;
  border: 1px solid;
}

.modal-content section {
  width: 80%;
  transform: translateX(10%);


}

.modal-content section:first-of-type,
.modal-content section:nth-last-of-type(2) {

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

}


.modal-content section:first-of-type input {
  width: 100%;
  border: 1px solid grey;
  padding: 3px 5px;
  border-radius: 3px;
  margin-bottom: 2vh;
}

.modal-content section:first-of-type textarea {
  width: 100%;
  border: 1px solid grey;
  padding: 3px 5px;
  height: 10vh;
  border-radius: 3px;
  margin-bottom: 2vh;
}

.buttons {
  box-sizing: border-box;
  margin-top: 2vh;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
}

.buttons button {
  border: 1px solid;
  padding: 5px 12px 5px 12px;
  border-radius: 5px;
  color: white;
}

.buttons button:last-of-type {
  background-color: rgb(0, 122, 45);
}

.buttons button:first-of-type {
  background-color: rgb(181, 0, 0);

}

.modal-content h1 {
  text-align: center;
  margin-bottom: 2vh;
}
</style>