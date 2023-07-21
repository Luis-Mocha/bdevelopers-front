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
                this.profiles = res.data.profilesData
            })
        }
    },
}

</script>

<template>
    <h1 class="text-center text-success">Sono la pagina Developers</h1>

    <div class="container">
      <div v-for="(element,index) in this.profiles" :key="index">
        <div>{{ element.name }}</div>
      </div>
    </div>

</template>

<style lang="scss"></style>
