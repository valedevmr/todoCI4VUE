<script setup>
import { onBeforeUnmount, onBeforeUpdate, onMounted, onUpdated, ref } from 'vue';
import Swal from 'sweetalert2'


let token = ref("");
let password = ref("");
let user = ref("");

onMounted(() => {
   const url = window.location.search;
   const urlParametro = new URLSearchParams(url);
   token.value = urlParametro.get("token");
   user.value = urlParametro.get("user");

})

function fethching() {


   if (!password.value) {
      alerta("La contraseña es requerida", "warning")
      return;
   }

   if ((password.value).length < 1) {
      alerta("La contraseña es requerida", "warning")
      return;
   }

   const options = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: token.value, new_password: password.value })
   };

   fetch('http://localhost:8080/api/changepasswordo/' + user.value + '', options)
      .then(response => response.json())
      .then(response => {
         if (!response.success) {
            alerta(response.message,"warning");
            return;
         }
         Swal.fire({
            title: response.message,
            timer: 2000,
            icon: "success",
            timer: 1500

         }).then((result) => {
            window.location.href = '/login';
         });
         return;
      })
      .catch(err => console.error(err));

}



function alerta(mensaje, icono) {
   Swal.fire({
      title: mensaje,
      text: "",
      icon: icono,
      timer: 1800
   });
}</script>

<template>
   <main class="container-login">
      <div class="contenedor-lf">
         <header>

            <img src="../assets/tareas.png" alt="">
         </header>
         <form @submit.prevent="fethching">
            <div class="grupo">
               <label for="password">Nueva contraseña:</label>
               <input type="password" placeholder="**********" id="password" v-model.trim="password">
            </div>
            <div class="grupo hidden">
               <input type="input" placeholder="**********" v-model.trim="token">
            </div>
            <div class="grupo enviar">
               <button type="submit" id="submit">Iniciar sesión</button>
            </div>


         </form>

         <footer>
            <article>Registrarse
               <span>
                  <RouterLink to="/registrarte">Aquí</RouterLink>
               </span>
            </article>
            <article>Recuperar contraseña
               <span>
                  <RouterLink to="/recuperar_contrasena">Aquí</RouterLink>
               </span>
            </article>
         </footer>
      </div>
   </main>
</template>


<style scoped>
.container-login {

   widows: 100vw;
   height: 100vh;
   display: flex;
   justify-content: center;
   align-items: center;
}

.contenedor-lf {
   background-color: rgba(255, 255, 255, 0.959);
   border: 1px solid rgb(63, 62, 62);
   width: 26vw;
   height: 80vh;
   display: flex;
   justify-content: space-around;
   flex-wrap: wrap;
   border-radius: 15px;
   box-shadow: 2px 14px 79px 56px rgba(0, 0, 0, 0.446);
   -webkit-box-shadow: 2px 14px 79px 56px rgba(0, 0, 0, 0.596);
   -moz-box-shadow: 2px 14px 79px 56px rgba(0, 0, 0, 0.31);
}

.contenedor-lf header,
.contenedor-lf footer {
   height: 20%;
   display: flex;

}

.contenedor-lf header {
   justify-content: center;
   align-items: center;
}

.contenedor-lf header img {
   height: 60%;

}

.contenedor-lf form {
   height: 60%;
   width: 75%;
}



/* estilos para los inputs en grupo
 */


.contenedor-lf .grupo {
   display: flex;
   justify-content: space-around;
   flex-wrap: wrap;
   margin: 20px 10px;

}

.contenedor-lf .grupo.enviar {
   margin-top: 20%;
}

.contenedor-lf .grupo label {
   display: inline-block;
   margin: 7px 0;
   width: 100%;
   font-size: 1.4rem;
}

.contenedor-lf .grupo.enviar button {
   display: inline-block;
   background-color: rgb(63, 62, 62);
   padding: 5px 5px;
   width: 50%;
   border-radius: 5px;
   border: 1px solid rgb(63, 62, 62);
   color: white;
   font-size: 1.1rem;
}

.contenedor-lf .grupo input[type=text],
.contenedor-lf .grupo input[type=password] {
   display: inline-block;
   width: 100%;
   border: 1px solid grey;
   font-size: 1.2rem;
   height: 2rem;
   padding: 2px 4px;
   outline: none;
   border-radius: 5px;
}

.contenedor-lf .grupo input[type=text]:focus,
.contenedor-lf .grupo input[type=password]:focus {
   border: 1px solid rgb(7, 81, 230);

}


/** */


#submit {
   cursor: pointer;
}

#submit:hover {
   background-color: white;
   color: rgb(63, 62, 62);
   transition: .2s linear;
   box-shadow: 0px 23px 51px -12px rgba(0, 0, 0, 0.6);
   -webkit-box-shadow: 0px 23px 51px -12px rgba(0, 0, 0, 0.6);
   -moz-box-shadow: 0px 23px 51px -12px rgba(0, 0, 0, 0.6);

}

/* estilo para el footer login */



.contenedor-lf footer {
   display: inline-block;
   width: 65%;

}

.contenedor-lf footer article {
   width: 100%;
   margin-bottom: 5px;

}

.contenedor-lf footer article a {
   text-decoration: none;
   color: rgb(7, 81, 230);
   font-weight: bold;

}


@media only screen and (max-width: 450px) {

   .contenedor-lf {

      width: 80vw;
      height: 65vh;

   }

   .contenedor-lf .grupo.enviar button {
      width: 70%;

   }

}

@media only screen and (max-width: 1366px) {
   .contenedor-lf .grupo.enviar button {

      width: 70%;

   }

}


.hidden {
   display: none !important;
}
</style>