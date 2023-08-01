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
            angle : 0,
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
        spinner.setAttribute("style","-webkit-transform: rotateY("+ this.angle +"deg); -moz-transform: rotateY("+ this.angle +"deg); transform: rotateY("+ this.angle +"deg);");
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
            this.$router.push({name: 'developers', query: { fields: paramsFields } })
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
        }
    },
}


</script>

<template>
    <PrimoComp/>

    <div id="section-filters" class="container my-5">
    
        <h2 class="mt-3 mb-4">Cerca uno sviluppatore in base al campo di sviluppo</h2>

        <div class="flex-filters d-flex flex-wrap" >
            <div v-for="(elem, index) in this.fields" :key="index" :id="`filter-${elem.id}`" class="filter-box mx-4 mb-2 col-10 col-md-5 col-lg-3" @click="toggleFilter(elem.id)">
                <i :class="getClass(normalizeFieldName(elem.name))" class="me-3"></i>
                <span>{{ elem.name }}</span>
            </div>
            <div class="filter-box search-btn mx-4 mb-2 col-10 col-md-5 col-lg-3" @click="goSelectedFields()">
                <i class="fa-solid fa-magnifying-glass fa-xl me-2" style="color: #ffffff;"></i>
                <span>Cerca</span>
            </div>
        </div>

    </div>

    <div id="section">
        <div class="container">
            <h2 id="title-section-carousel">Qui troverai centinaia di sviluppatori</h2>
           
            <section class="section-carousell pb-5">
                <div class="container-carousel">
                    <div id="carousel">
                        <figure class="box-img" v-for="(elem, index) in this.profiles">
                            <router-link :to="{ name: 'singleDeveloper', params: { dev_id: elem.profile_id } }">
                                <img :src="`${baseUrlStorage}/${elem.profile_image}`" alt="">
                                <div class="label-imgCarousel">
                                    <span class="text-white"><em>{{ elem.name }}</em></span>
                                    <span class="text-white ms-1"> <em>{{ elem.surname }}</em></span>
                                </div>    
                            </router-link>
                        </figure>
                    </div>
                </div>
            </section>
        </div>

    </div>
    
    <SecondoComp/>
    <TerzoComp/>
    <QuartoComp/>
    <QuintoComp/>


</template>

<style lang="scss">
#section{
    height: 50vh;
    color: #F6EEE0;
    .fondatori {
        display: table;
        margin: 5% auto 0;
        //text-transform: uppercase;
        font-family: 'Anaheim', sans-serif;
        font-size: 4em;
        font-weight: 400;
        text-shadow: 0 1px white, 0 2px black;
    }

    .container-carousel {
        margin: 4% auto;
        width: 210px;
        height: 160px;
        position: relative;
        perspective: 1000px;
    }

    #carousel {
        width: 100%;
        height: 100%;
        position: absolute;
        transform-style: preserve-3d;
        animation: rotation 20s infinite linear;
    }

    #carousel:hover {
        animation-play-state: paused;
    }

    #carousel figure {
        display: block;
        position: absolute;
        width: 186px;
        height: 116px;
        left: 10px;
        top: 10px;
        background: #333333;
        overflow: hidden;
        border: solid 5px #fff;
    }

    #carousel figure:nth-child(1) {
        transform: rotateY(0deg) translateZ(288px);
        height: 210px;
    }

    #carousel figure:nth-child(2) {
        transform: rotateY(40deg) translateZ(288px);
        height: 210px;
    }

    #carousel figure:nth-child(3) {
        transform: rotateY(80deg) translateZ(288px);
        height: 210px;
    }

    #carousel figure:nth-child(4) {
        transform: rotateY(120deg) translateZ(288px);
        height: 210px;
    }

    #carousel figure:nth-child(5) {
        transform: rotateY(160deg) translateZ(288px);
        height: 210px;
    }

    #carousel figure:nth-child(6) {
        transform: rotateY(200deg) translateZ(288px);
        height: 210px;
    }

    #carousel figure:nth-child(7) {
        transform: rotateY(240deg) translateZ(288px);
        height: 210px;
    }

    #carousel figure:nth-child(8) {
        transform: rotateY(280deg) translateZ(288px);
        height: 210px;
    }

    #carousel figure:nth-child(9) {
        transform: rotateY(320deg) translateZ(288px);
        height: 210px;
    }

    .box-img{
        border-radius: 20px 10px 20px 10px;
    }

    img {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .label-imgCarousel{
        position: absolute;
        bottom: 5px;
        left: 5px;
        padding: 2px;
        background-color: #333333bf;
        color: white;
        font-size: 14px;
        border-radius: 20px 10px 20px 10px;
    }

    #title-section-carousel{
        font-size: 60px;
        color: #E7A117;
        font-family: 'Anton', sans-serif;
        text-align: end;
    }

    @keyframes rotation {
        from {
            transform: rotateY(0deg);
        }

        to {
            transform: rotateY(360deg);
        }
    }

}    

//dark-blue #1d1b2c
//gold #E7A117
#section-filters{
        h2 {
            // color: #1d1b2c;
            // margin-bottom: 30px;
            font-size: 50px;
            color: #E7A117;
            font-family: 'Anton', sans-serif;
            text-align: start;
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
