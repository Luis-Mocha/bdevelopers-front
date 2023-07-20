<script>
import HeaderComp from './components/HeaderComp.vue';

export default {
  name: 'app',
  components: {
    HeaderComp,
  },
}

</script>

<template>

  <HeaderComp/>

  <h1 class="text-center text-success">Ciao Mondo!</h1>

</template>

<style lang="scss">
@use './style/main.scss';
</style>
