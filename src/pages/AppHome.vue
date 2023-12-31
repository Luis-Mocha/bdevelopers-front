<script>

import axios from 'axios';
import PrimoComp from '../components/PrimoComp.vue';
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
            angle: 0,
        }
    },
    mounted() {
        this.getProfiles();
        this.getFields();
    },
    methods: {

        galleryspin(sign) {
            const spinner = document.getElementById("spinner");
            if (!sign) { this.angle = this.angle + 45; } else { this.angle = this.angle - 45; };
            spinner.setAttribute("style", "-webkit-transform: rotateY(" + this.angle + "deg); -moz-transform: rotateY(" + this.angle + "deg); transform: rotateY(" + this.angle + "deg);");
        },

        getProfiles() {

            axios.get(`${this.baseUrlApi}home`).then(res => {
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
            this.$router.push({ name: 'developers', query: { fields: paramsFields } })
        },
        normalizeFieldName(fieldName) {
            return fieldName.replace(/\s+/g, '_').toLowerCase();
        },
        getClass(param) {
            const classMap = {
                sviluppo_web: 'fa-solid fa-globe fa-2xl',
                gaming: 'fa-solid fa-gamepad fa-2xl',
                cyber_security: 'fa-solid fa-shield-halved fa-2xl',
                app_mobile: 'fa-solid fa-mobile-screen fa-2xl',
                blockchain: 'fa-solid fa-link fa-2xl',
                machine_learning: 'fa-solid fa-brain fa-2xl',
                crm: 'fa-solid fa-computer fa-2xl',
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
        },
        scrollHorizontal(e, elemHtml) {

            const slider = document.getElementById(elemHtml)

            if (e.deltaY > 0) {
                slider.scrollLeft += 100
            } else {
                slider.scrollLeft -= 100
            }
        },
    },
}


</script>

<template>
    <PrimoComp />

    <div id="section-filters" class="py-5">

        <div class="container">
            <h2 class="mt-3 mb-4">Seleziona i campi di sviluppo</h2>

            <div class="flex-filters d-flex flex-wrap">
                <div v-for="(elem, index) in this.fields" :key="index" :id="`filter-${elem.id}`"
                    class="filter-box mx-4 mb-2 col-10 col-md-5 col-lg-3" @click="toggleFilter(elem.id)">
                    <i :class="getClass(normalizeFieldName(elem.name))" class="me-3"></i>
                    <span>{{ elem.name }}</span>
                </div>
                <div class="filter-box search-btn mx-4 mb-2 col-10 col-md-5 col-lg-3" @click="goSelectedFields()">
                    <i class="fa-solid fa-magnifying-glass fa-xl me-2" style="color: #ffffff;"></i>
                    <span>Cerca</span>
                </div>
            </div>
        </div>
        
    </div>

    <div id="section-vetrina">
        <div class="container">
            <h2 id="title-section-carousel">
                Scegli tra centinaia di sviluppatori
            </h2>

            <div id="slider-evidenza" @wheel.prevent="scrollHorizontal($event, 'slider-evidenza')" class="slider row flex-nowrap overflow-x-hidden"> 
                
                <router-link v-for="(elem, index) in this.profiles" class="card-vetrina"  :to="{ name: 'singleDeveloper', params: { dev_id: elem.profile_id } }">
                    <img :src="`${baseUrlStorage}/${elem.profile_image}`" alt="" >
                    <div class="card-info">
                        <span>{{ elem.name }}</span>
                        <span class="ms-2">{{ elem.surname }}</span>
                    </div>
                    <div class="card-vote" :class="elem.average_vote == 0 ? 'green': ''">
                        <div v-if="elem.average_vote > 0">
                            {{ elem.average_vote }}<i class="fa-solid fa-star"></i>
                        </div>
                        <div v-else>
                            New!
                        </div>
                    </div>
                </router-link>
            
                
            </div>

        </div>

    </div>
    
    <QuartoComp/>
    <SecondoComp/>
    <TerzoComp/>
    <QuintoComp/>


</template>

<style lang="scss">



#section-vetrina{
    background-color: #F6EEE0;
    padding-bottom: 70px;

    #title-section-carousel {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 48px;
        color: #1d1b2c;
        text-align: end;
        padding-bottom: 2rem;
    }

    #slider-evidenza {
        width: 100%;

        .card-vetrina {
            position: relative;
            margin: 0 20px;
            width: 400px;
            height: 300px;
            border-radius: 20px 10px 20px 10px;

            img {
                border-radius: 20px 10px 20px 10px;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            .card-info {
                position: absolute;
                bottom: 10px;
                left: 5px;

                border-radius: 20px 10px 20px 10px;
                background-color:#E7A117;
                color: white;
                padding: 5px 10px;
                font-weight: 900;
            }
            .card-vote {
                position: absolute;
                top: 10px;
                right: 10px;

                border-radius: 20px 10px 20px 10px;
                background-color:#E7A117;
                color: white;
                padding: 4px 8px;
                font-weight: 900;
                font-size: 20px;               

                .fa-star {
                    // color: #E7A117; 
                    color: white;

                }
            }
            .card-vote.green {
                background-color: green;
            }
        }
    }
}    

//dark-blue #1d1b2c
//gold #E7A117
#section-filters {
    background-color: #F6EEE0;
    h2 {
        color: #1d1b2c;
        font-size: 48px;
        font-family: 'Space Grotesk', sans-serif;
        text-align: start;
        padding-bottom: 1rem;
    }

    .filter-box {
        cursor: pointer;
        background-color: #302e42;
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

            &:hover {
                background-color: #E7A117;
                color: #1d1b2c;
                border: 1px solid #1d1b2c;
            }
        }
        .filter-box.selected {
            background-color: rgb(67, 167, 67);
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
            font-weight: 600;
            text-align: center;
            text-transform: uppercase;
        }
    }

   
</style>
