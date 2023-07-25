<script>

import axios from 'axios';

export default {
    name: 'AppHome',
    components: {

    },
    data() {
        return {
            profiles: [],
            baseUrlApi: 'http://127.0.0.1:8000/api/',
            baseUrlStorage: 'http://127.0.0.1:8000/storage/',
            fields: [],
            selectedFields: [],
        }
    },
    mounted() {
        // this.getProfiles();
        this.getFields();
    },
  
    methods: {
        // getProfiles() {

        //     const params = {
                
        //     }

        //     if (this.selectedFields.length > 0) {
        //         params.field_ids = this.selectedFields.join(',')
        //     }

        //     axios.get(`${this.baseUrlApi}profiles`, { params }).then(res => {
        //         this.profiles = res.data.profilesData

        //     })
        // },

        getFields() {
            axios.get(`${this.baseUrlApi}fields`).then(res => {
                this.fields = res.data.fields
            })
        },
        goSelectedFields() {
            this.$router.push ({ path: '/developers', query: { id:this.selectedFields } })
        }
    },
}


</script>

<template>

    <h1 class="text-center text-success my-3">Trova lo sviluppatore di cui hai bisogno 🤓</h1>

    <h2 class="text-center text-success my-2">Scegli un campo di sviluppo</h2>
  
    <div v-for="(elem, index) in this.fields" :key="index" class="container d-flex justify-content-center">
        <div class="form-check">
            <input class="form-check-input" :name="elem.id" type="checkbox" :value="elem.id" :id="`field-${elem.id}`"
                v-model="selectedFields">
            <label class="form-check-label" :for="`field-${elem.id}`">
                {{ elem.name }}
            </label>
        </div>
    </div>

    <button @click="goSelectedFields()" type="submit" class="btn btn-success text-uppercase">trova</button>

</template>

<style lang="scss"></style>
