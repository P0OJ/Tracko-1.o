<template>
  <div class="flex h-screen">
    <Sidebar />
    <div class="flex flex-col flex-grow bg-primaryBg">
      <Header />
      <Board />
    </div>
  </div>
</template>

<script setup>
import Board from "./components/Board.vue";
import Sidebar from "./components/Sidebar.vue";
import Header from "./components/Header.vue";
</script>
