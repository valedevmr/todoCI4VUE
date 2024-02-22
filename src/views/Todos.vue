<script setup>


import axios from "axios";

const options = {
   method: 'GET',
   url: 'http://localhost:8080/api/task',
   headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJub21icmUiOiIiLCJ1c3VhcmlvIjoxLCJpYXQiOjE3MDY1MDI0NDgsImV4cCI6MTcwNjUwNjA0OH0.XoifJhU-qC8jz9-egj_attO8ym_NWMMAW1JPQWYN1gY'
   }
};

axios.request(options).then(function (response) {
   console.log(response.data);
}).catch(function (error) {
   console.error(error);
});

</script>

<template>
   <h1>Todos</h1>
</template>


<style scoped></style>