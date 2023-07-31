<script>

import axios from 'axios';
import PrimoComp from '../components/primoComp.vue';
import SecondoComp from '../components/SecondoComp.vue';
import TerzoComp from '../components/TerzoComp.vue';
import QuartoComp from '../components/QuartoComp.vue';
import QuintoComp from '../components/QuintoComp.vue';


export default {
    name: 'AppHome',
    components: {
    PrimoComp,
    SecondoComp,
    TerzoComp,
    QuartoComp,
    QuintoComp
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
        this.getProfiles();
        this.getFields();
    },

    methods: {
        getProfiles() {

            const params = {

            }


            axios.get(`${this.baseUrlApi}profiles`, { params }).then(res => {
                this.profiles = res.data.profilesData

            })
        },

        getFields() {
            axios.get(`${this.baseUrlApi}fields`).then(res => {
                this.fields = res.data.fields
            })
        },
        goSelectedFields() {
            let paramsFields = this.selectedFields.join(',');
            this.$router.push({name: 'developers', query: { fields: paramsFields } })
        }
    },
}


</script>

<template>
    <PrimoComp/>
    <div id="section">

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
    
        <hr>
        <div class="container">
            <h2>vetrina sviluppatori in evidenza</h2>
            <div v-for="(elem, index) in this.profiles" class="border my-3">
                <div v-if="elem.active_sponsorship == 1">
                    <p>{{ elem.name }}</p>
                    <p>{{ elem.surname }}</p>
                    <div v-for="(x, y) in elem.field_names">
                        {{ x }}
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <SecondoComp/>
    <TerzoComp/>
    <QuartoComp/>
    <QuintoComp/>


</template>

<style lang="scss">
#section{
        height: 100vh;
    }
</style>
