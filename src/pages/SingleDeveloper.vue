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

        <!-- Recensioni -->
        <div>
            <div>voto medio: {{ parseFloat(singleProfile.average_vote).toFixed(1) }}</div>

            <h2 class="mt-4 mb-2">RECENSIONI</h2>
            <div v-if="singleProfile.reviews == null">
                Non ci sono recensioni
            </div>
            
            <div v-for="(elem, index) in singleProfile.reviews" :key="index" class="border mb-2">
                <!-- nome e cognome -->
                <div>
                    <span class="me-1">{{ elem.name }}</span>
                    <span>{{ elem.surname }}</span>
                </div>

                <!-- data -->
                <div>
                    <span>Data:</span>
                    <div>{{ elem.date.split('-').reverse().join('-') }}</div>  
                </div>

                <!-- voto -->
                <div>Voto: {{ elem.vote }}</div>
                <span v-for="i in 5" :key="i">
                        <i :class=" i <= elem.vote ? 'fa-solid' : 'fa-regular' " class="fa-star text-warning"></i>
                </span>
                <!-- descrizione -->
                <div>
                    <i class="fa-solid fa-quote-left"></i> 
                    {{ elem.description }} 
                    <i class="fa-solid fa-quote-right"></i>
                </div>
            </div>
        </div>
        

    </div>
</template>

<style lang="scss" scoped>
    // .fa-star {
    //     color: rgba(206, 154, 12, 0.815);
    // }
</style>
