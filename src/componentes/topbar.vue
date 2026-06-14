<template>
  <header class="topbar">
    <router-link :to="{ name: 'home' }">NUBE NUEVE VOL 1</router-link>
    <slot name="center"></slot>
    <slot name="right"></slot>
  </header>
</template>