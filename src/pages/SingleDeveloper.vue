<script>
import axios from 'axios';
export default {
    name: 'SingleDeveloper',
    components: {

    },
    data() {
        return {
            singleProfile: null,
            baseUrlApi: 'http://127.0.0.1:8000/api/',
            baseUrlStorage: 'http://127.0.0.1:8000/storage/',
        }
    },
    beforeMount() {
        this.getSingleProfile();
    },
    methods: {
        
        getSingleProfile() {

            axios.get(`${this.baseUrlApi}profiles/${this.$route.params.slug}`)
            .then((response) => {
                console.log(response.data.profile);

                this.singleProfile = response.data.profile;
                
                // sintassi try and catch
            }
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
        <div> {{ singleProfile.name }} </div>
        <div> {{ singleProfile.surname }} </div>

    </div>

</template>

<style lang="scss" scoped>


</style>
