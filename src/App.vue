<script>
import { RouterView } from 'vue-router'

import HeaderComp from './components/HeaderComp.vue';

export default {
  name: 'app',
  components: {
    HeaderComp,
  },
}

</script>

<template>
  <HeaderComp />
  <router-view />
</template>

<style lang="scss">
@use './style/main.scss';
</style>
