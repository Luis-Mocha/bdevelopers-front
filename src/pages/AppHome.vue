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
            prova: [],
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
        },
        normalizeFieldName(fieldName) {
            return fieldName.replace(/\s+/g, '_').toLowerCase();
        },
        getClass(param) {
            const classMap = {
                sviluppo_web: 'sviluppo-web',
                gaming: 'gaming',
                cyber_security: 'cyber-security',
                app_mobile: 'app-mobile',
                blockchain: 'blockchain',
                machine_learning: 'machine-learning',
                crm: 'CRM',
            };
            return classMap[param];
        },
        toggleFilter(param) {
            const index = this.prova.indexOf(param);
            if (index !== -1) {
                // L'elemento è presente nell'array, quindi lo togliamo
                this.selectedFields.splice(index, 1);
            } else {
                // L'elemento non è presente nell'array, quindi lo aggiungiamo
                this.selectedFields.push(param);
            }
        }
    },
}


</script>

<template>
    <PrimoComp/>

    <div id="section-filters" class="my-4">
    
        <h2 class="text-center text-success my-2">Cerca uno sviluppatore in base al campo di sviluppo</h2>

        <div class="flex-filters container d-flex flex-wrap" >
            <div v-for="(elem, index) in this.fields" :key="index" :class="getClass(normalizeFieldName(elem.name))" class="filter-box mx-4 mb-2 col-4" @click="toggleFilter(elem.id)">
                {{ elem.name }}
            </div>
            <div class="filter-box mx-4 mb-2">
                <button @click="goSelectedFields()" type="submit" class="btn btn-success text-uppercase">trova</button>
            </div>
        </div>

        

        <!-- <button @click="goSelectedFields()" type="submit" class="btn btn-success text-uppercase">trova</button> -->
    </div>
    
    <SecondoComp/>
    <TerzoComp/>
    <QuartoComp/>
    <QuintoComp/>


</template>

<style lang="scss">
    #section-filters{


        
        .filter-box {
            cursor: pointer;
            background-color:antiquewhite;
            // width: 200px;
            border: 1px solid darkblue;
            border-radius: 10px;
            padding: 10px 15px;

        }
    }
</style>
