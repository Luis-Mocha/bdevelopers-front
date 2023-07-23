<script>
import axios from 'axios';
export default {
    name: 'SingleDeveloper',
    components: {

    },
    data() {
        return {
            profile: [],
            baseUrlApi: 'http://127.0.0.1:8000/api/',
            baseUrlStorage: 'http://127.0.0.1:8000/storage/',
        }
    },
    mounted() {
        // this.getProfiles();
    },
    watch: {
    },
    methods: {
        getProfiles() {

            const params = {
                total_reviews: this.selectNumbReviews,
            }

            if (this. average_vote) {
                params. average_vote = this.average_vote
            }
            
            if (this.selectedFields.length > 0) {
                params.field_ids = this.selectedFields.join(',')
            } 

            axios.get(`${this.baseUrlApi}profiles`, { params }).then(res => {
                this.profiles = res.data.profilesData

            })
        },
    },
}

</script>

<template>

    <h1 class="text-center text-success">Show Developer</h1>
    
    <div class="container">
        hello
    </div>

</template>

<style lang="scss" scoped>


</style>
