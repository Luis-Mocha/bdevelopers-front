<script>
import axios from 'axios';
export default {
    name: 'Developers',
    components: {

    },
    data() {
        return {
            profiles: [],
            baseUrlApi: 'http://127.0.0.1:8000/api/',
            baseUrlStorage: 'http://127.0.0.1:8000/storage/'
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
        <!-- Card -->
        <div class="card" style="width: 18rem;">
            <img :src="`${baseUrlStorage}${element.profile_image}`" alt="" class="card-img-top">
            <div class="card-body">
                <div>{{ element.name }}</div>
                <div>{{ element.surname }}</div>
                <div>{{ element.birth_date }}</div>
                <div>{{ element.address }}</div>
                <div>{{ element.phone_number }}</div>
                <div>{{ element.email }}</div>
                <a>{{ element.github_url }}</a><br>
                <a>{{ element.linkedin_url }}</a><br>
                <a :href="`${baseUrlStorage}${element.curriculum}`" download target="_blank" >Scarica il tuo curriculum</a>
                <div v-for="(elem, index) in element.technology_names" :key="index">{{ elem }}</div>
            </div>
        </div>
      </div>
    </div>

</template>

<style lang="scss"></style>
