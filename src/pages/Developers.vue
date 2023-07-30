<script>
import axios from 'axios';
export default {
    name: 'Developers',
    components: {

    },
    data() {
        return {
            profiles: [],
            profilesTotal: null,
            profilesFiltered: null,
            baseUrlApi: 'http://127.0.0.1:8000/api/',
            baseUrlStorage: 'http://127.0.0.1:8000/storage/',
            // filtri
            fields: [],
            selectedFields: [],
            selectNumbReviews: 0,
            average_vote: 0,
            
            mobileView : false,
        }
    },
    created() {
        this.controlFields();
        this.checkWidth()
    },
    mounted() {
        window.addEventListener('resize', this.checkWidth);
        this.getFields();
        this.getProfiles();
    },
    watch: {
        selectedFields: {
            handler: 'getProfiles',
            deep: true
        },
        selectNumbReviews: {
            handler: 'getProfiles',
            deep: true
        },
        average_vote: {
            handler: 'getProfiles',
            deep: true
        },
    },
    methods: {
        checkWidth() {

            if (window.innerWidth < 700) {
                this.mobileView = true
            } else {
                this.mobileView = false
            }
        },

        toggleSidebar() {
            let sidebar = document.getElementById('page-filters');

            if (sidebar.classList.contains('mobile')) {
                sidebar.classList.remove('mobile');
            } else {
                sidebar.classList.add('mobile');
            }
            
        },

        // funzione per controllare se ci sono filtri preselezionati al caricamento della pagina
        controlFields() {
            const preselectedFields = this.$route.query.fields;
            this.selectedFields = preselectedFields ? preselectedFields.split(',').map(num => parseInt(num)) : [];

            this.selectNumbReviews = this.$route.query.numReviews;

            this.average_vote = this.$route.query.avgVote;

            console.log(preselectedFields, this.selectedFields);
        },

        updateUrlParams() {
            const queryParams = {};
            if (this.selectedFields.length > 0) {
            queryParams.fields = this.selectedFields.join(',');
            }
            if (this.selectNumbReviews > 0) {
            queryParams.numReviews = this.selectNumbReviews;
            }
            if (this.average_vote > 0) {
            queryParams.avgVote = this.average_vote;
            }

            this.$router.push({ query: queryParams });
        },

        getProfiles() {
            const params = {
                total_reviews: this.selectNumbReviews,
            }

            if (this.average_vote) {
                params.average_vote = this.average_vote
            }

            if (this.selectedFields.length > 0) {
                params.field_ids = this.selectedFields.join(',')
            }

            axios.get(`${this.baseUrlApi}profiles`, { params }).then(res => {
                console.log(res.data);
                this.profiles = res.data.profilesData;
                this.profilesTotal = res.data.profilesTotal;
                this.profilesFiltered = res.data.profilesFiltered;

                this.updateUrlParams();
            })
        },

        getFields() {
            axios.get(`${this.baseUrlApi}fields`).then(res => {
                this.fields = res.data.fields
            })
        },

        selezionaVotoMedio(parVote) {
            console.log('helooooo');
            this.average_vote = parVote;
        },
    }
}

</script>

<template>

    <div class="container-flex">

        <!-- sezione filtri -->
        <div id="page-filters" class="page-filters" :class=" this.mobileView == true ? 'mobile' : '' ">

            <!-- filtro fields -->
            <div>
                <div>Filtro specializzazione</div>

                <div v-for="(elem, index) in this.fields" :key="index" class="container">
                    <div class="form-check">
                        <input class="form-check-input" :name="elem.id" type="checkbox" :value="elem.id" :id="`field-${elem.id}`"
                            v-model="selectedFields">
                        <label class="form-check-label text-capitalize" :for="`field-${elem.id}`">
                            {{ elem.name }}
                        </label>
                    </div>
                </div>
            </div>

            <!-- filtro Numero recensioni -->
            <div>
                <label for="n-reviews">Filtro per numero di recensioni</label><br />
                <input type="range" id="n-reviews" name="n-reviews" list="n-options" step="5" min="0" max="20" v-model.number="selectNumbReviews" />

                <datalist id="n-options">
                    <option value="0" label="0+"></option>
                    <option value="5" label="5+"></option>
                    <option value="10" label="10+"></option>
                    <option value="15" label="15+"></option>
                    <option value="20" label="20+"></option>
                </datalist>
            </div>
            <!-- filtro Voti recensioni -->
            <div>
                <div>
                    <span>Filtro per voto medio:</span>
                    <span v-if="this.average_vote > 0" @click="selezionaVotoMedio(null)" class="text-secondary ms-3 fst-italic">cancella</span>
                </div>
                <span v-for="voto in 5" :key="key">
                        <i :class="voto <= this.average_vote ? 'fa-solid' : 'fa-regular'" class="fa-star text-warning me-2" @click="selezionaVotoMedio(voto)"></i>
                </span>
            </div>

            <button @click="toggleSidebar()" v-if="this.mobileView == true">X</button>

        </div>

        <!-- sezione pagina titolo/cards -->
        <div class="page-content">

            <div class="top-page">
                <h1 class="text-center text-success">Trova lo sviluppatore che cerchi!</h1>

                <div class="text-end pe-5">Trovalo tra i nostri {{ this.profilesTotal }} talenti!</div>


                <!-- numero risultati filtrati -->
                <div v-if="this.average_vote > 0 || this.selectedFields.length > 0 || this.selectNumbReviews > 0" class="text-center">
                        La tua ricerca ha portato {{ this.profilesFiltered }} risultati
                </div>
            </div>

            <button @click="toggleSidebar()" v-if="this.mobileView == true">Apri Filtri</button>

            <!-- Index profili -->
            <div class="cards-section w-100">

                <!-- SE non ci sono risultati -->
                <div v-if="this.profiles.length === 0" class="text-center"> 
                    <h2>Non ci sono profili che corrispondo alla tua ricerca</h2>
                </div>

                <div class="card-row">
                    <!-- ProfileCard -->
                    <div v-for="(element, index) in this.profiles" :key="index" class="profile-card d-flex flex-nowrap">

                        <router-link :to="{ name: 'singleDeveloper', params: { dev_id: element.profile_id } }" :class="( index % 2 === 0) ? 'order-1' : 'order-2'">
                            <img v-if="element.profile_image" :src="`${baseUrlStorage}${element.profile_image}`" alt="Immagine Profilo" class="card-img" >
                            <img v-else src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" alt="Immagine Profilo" class="card-img">
                        </router-link>

                        <div :class="( index % 2 === 0) ? 'order-2' : 'order-1'">
                            <div>{{ element.name }}</div>
                            <div>{{ element.surname }}</div>
                            <div>{{ element.birth_date }}</div>
                            <div v-if="element.average_vote > 0">Voto medio: {{ element.average_vote }}</div>
                            <div class="d-flex">
                                <span class="me-2">Fields:</span>
                                <span v-for="(elem, index) in element.field_names" :key="index" class="text-capitalize">{{ elem }}</span>
                            </div>
                        </div>                    

                    </div>
                </div>
            </div>

        </div>

    </div>

</template>

<style lang="scss" scoped>
//dark-blue #1d1b2c
//gold #E7A117
.container-flex {
    position: relative;
    width: 100%;
    display: flex;
    font-family: 'Montserrat', sans-serif;

    .page-filters {
        min-width: 320px;
        border-right: 2px solid green;
    }

    .page-content {
        width: 100%;

        .top-page {
            // lo header è di 60px
            height: 130px;
            h1 {
                margin: 0;
            }
        }
        .cards-section {
            width: 100%;
            height: calc(100vh - 190px);
            overflow: auto;

            .profile-card {
                border: 2px solid #1d1b2c;
                margin: auto;
                margin-bottom: 20px;
                width: 80%;
                height: 200px;

                .card-img {
                    cursor: pointer;
                    margin: 0;
                    display: block;
                    box-sizing: border-box;
                    width: 200px;
                    height: 200px;
                    object-fit: cover;
                }
                .float-left {
                    float: left;
                }
                .float-right {
                    float: right;
                }
            }

        }
    }
}


.page-filters.mobile {
    background-color: antiquewhite;
    display: none;
    transition: 2s;
}

@media screen and (max-width: 700px) {
    .page-filters {
    position: absolute;
    top: 0;
    left:0;
    right: 0;
    // width: 100vw;
    height: 100%;
    z-index: 999;
    background-color: white;
}
}

    datalist {
        display: flex;
        // flex-direction: column;
        justify-content: space-between;
        // writing-mode: vertical-lr;
        width: 150px;
    }

    option {
        padding: 0;
    }

    input[type="range"] {
        width: 150px;
        margin: 0;
    }

</style>
