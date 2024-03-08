<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import Swal from 'sweetalert2'


let correo = ref("");
let nombre_usuario = ref("");
let password = ref("");




function fethching() {
   const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo: correo.value, password: password.value,nombre_usuario:nombre_usuario.value })
   };

   fetch('http://localhost:8080/api/usuario', options)
      .then(response => response.json())
      .then(response => {


         
         if (response.success) {

            Swal.fire({
               title: response.message,
               timer: 2000,
               icon: "success",
               timerProgressBar: true,
            

            }).then((result) => {
               window.location.href = '/login';
            });
            return;
         }
         Swal.fire({
            title: "Error al crear usuario",
            text: response.message,
            icon: "warning"
         });
      })
      .catch(err => {
         console.log(err);
         localStorage.removeItem('token');
         window.location.href = '/login';
      });
}
</script>

<template>
   <main class="container-login">
      <div class="contenedor-lf">
         <header>

            <img src="../assets/tareas.png" alt="">
         </header>
         <form @submit.prevent="fethching">
            <div class="grupo">
               <label for="correo">Correo:</label>
               <input type="text" placeholder="usuario@correo.com" id="correo" v-model.trim="correo">
            </div>

            <div class="grupo">
               <label for="password">Password:</label>
               <input type="password" placeholder="***********" id="password" v-model.trim="password">
            </div>
            <div class="grupo">
               <label for="nombre_usuario">Nombre usuario (opcional):</label>
               <input type="text" placeholder="juan" id="nombre_usuario" v-model.trim="nombre_usuario">
            </div>
            <div class="grupo enviar">
               <button type="submit" id="submit">Guardar</button>
            </div>


         </form>

         <footer>
            <article>Recuperar contraseña
               <span>
                  <RouterLink to="/recuperar_contrasena">Aquí</RouterLink>
               </span>
            </article>
            <article>Iniciar sesión
               <span>
                  <RouterLink to="/login">Aquí</RouterLink>
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
   height: 17%;
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
   margin: 10px 10px;

}

.contenedor-lf .grupo.enviar {
   margin-top: 10%;
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

      width: 95vw;
      height: 85vh;

   }

   .contenedor-lf .grupo.enviar button {
      width: 70%;

   }

}

@media only screen and (max-width: 1366px) {
   .contenedor-lf .grupo.enviar button {

      width: 90%;

   }

   .contenedor-lf {

      width: 45vw;


   }

}
</style>