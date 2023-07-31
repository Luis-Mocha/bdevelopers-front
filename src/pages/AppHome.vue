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
            const index = this.selectedFields.indexOf(param);
            if (index !== -1) {
                // L'elemento è presente nell'array, quindi lo togliamo
                this.selectedFields.splice(index, 1);
            } else {
                // L'elemento non è presente nell'array, quindi lo aggiungiamo
                this.selectedFields.push(param);
            }

            // aggiungo la classe selected ai filtri selezionati
            let box = document.getElementById(`filter-${param}`)
            box.classList.toggle('selected')
        }
    },
}


</script>

<template>
    <PrimoComp/>

    <div id="section-filters" class="container my-5">
    
        <h2 class="mt-3 mb-4">Cerca uno sviluppatore in base al campo di sviluppo</h2>

        <div class="flex-filters d-flex flex-wrap" >
            <div v-for="(elem, index) in this.fields" :key="index" :class="getClass(normalizeFieldName(elem.name))" :id="`filter-${elem.id}`" class="filter-box mx-4 mb-2 col-3" @click="toggleFilter(elem.id)">
                <span>{{ elem.name }}</span>
            </div>
            <div class="filter-box search-btn mx-4 mb-2 col-2" @click="goSelectedFields()">
                <span>Cerca</span>
            </div>
        </div>

    </div>
    
    <SecondoComp/>
    <TerzoComp/>
    <QuartoComp/>
    <QuintoComp/>


</template>

<style lang="scss">
//dark-blue #1d1b2c
//gold #E7A117
    #section-filters{
        h2 {
            color: #1d1b2c;
            margin-bottom: 30px;
        }
        
        .filter-box {
            cursor: pointer;
            background-color:#302e42;
            color: white;
            // width: 200px;
            height: 60px;
            border: 1px solid #E7A117;
            border-radius: 10px;
            padding: 10px 15px;
            text-transform: capitalize;
            text-align: center;
            font-weight: 600;
            font-family: 'Space Grotesk', sans-serif;

            display: flex;
            align-items: center;
            justify-content: center;
        }
        .filter-box.selected {
            background-color: green;
            &::after {
                content: "\2713";
                color: white;
                font-size: 22px;
                font-weight: 800;
                margin-left: 10px;
            }
        }
        .filter-box.search-btn {
            background-color: #1d1b2c;
            color: #E7A117;
            text-align: center;
            text-transform: uppercase;
        }
    }
</style>
