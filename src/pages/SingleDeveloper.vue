<script>
import axios from 'axios';

export default {
    name: 'SingleDeveloper',
    data() {
        return {
            baseUrlApi: 'http://127.0.0.1:8000/api/',
            baseUrlStorage: 'http://127.0.0.1:8000/storage/',
            singleProfile: null,
        }
    },
    beforeMount() {
        this.getSingleProfile();
    },
    // mounted() {
    //     this.getSingleProfile();
    // },
    methods: {
        
        getSingleProfile() {

            axios.get(`${this.baseUrlApi}profiles/${this.$route.params.slug}`)
            .then((response) => {
                console.log(response.data.profile);

                this.singleProfile = response.data.profile;
                
                
            } // sintassi try and catch
            , error => {
                if (error.response.status === 404) {
                    // console.log(error.reponse.status);
                    this.$router.push({ name: 'notFound' })
                } else {
                    // qualunque altro errore
                }
            })
        },
    },
}

</script>

<template>

    <h1 class="text-center text-success">Show Developer</h1>
    
    <div class="container">
        <img :src="`${baseUrlStorage}${singleProfile.profile_image}`" alt="">

        <div> {{ singleProfile.name }} </div>
        <div> {{ singleProfile.surname }} </div>
        <div> {{ singleProfile.birth_date }} </div>
        <div> {{ singleProfile.address }} </div>
        <div> {{ singleProfile.email }} </div>
        <div> {{ singleProfile.github_url }} </div>
        <div> {{ singleProfile.linkedin_url }} </div>
        <div> {{ singleProfile.performance }} </div>
        <a :href="`${baseUrlStorage}${singleProfile.curriculum}`" target="_blank" rel="noopener noreferrer">Scarica il curriculum</a>


    </div>

</template>

<style lang="scss" scoped>


</style>
