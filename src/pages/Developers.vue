<script>
import axios from 'axios';
export default {
    name: 'Developers',
    components: {

    },
    data() {
        return {
            profiles: [],
            baseUrlApi: 'http://127.0.0.1:8000/api/'
        }
    },
    mounted() {
        this.getProfiles();
    },
    methods: {
        getProfiles(){
            axios.get(`${this.baseUrlApi}profiles`).then(res=>{
                this.profiles = res.data.profiles
            })
        }
    },
}

</script>

<template>
    <h1 class="text-center text-success">Sono la pagina Developers</h1>

    <div class="card_container mb-5">
    <div class="row gy-5">
      <div v-for="(element,index) in this.profiles" :key="index" class="col-sm-12 col-md-6 col-lg-3 col-xl-3">
        <div>{{ element.name }}</div>
      </div>

    </div>
  </div>

</template>

<style lang="scss"></style>
