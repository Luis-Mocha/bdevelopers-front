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

            mobileView: false,
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
        this.rangeInput();
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
            this.average_vote = parVote;
        },
        deleteFilters() {
            this.average_vote = null;
            this.selectNumbReviews = null;
            this.selectedFields = [];
        },

        rangeInput() {
            if (this.selectNumbReviews == undefined) {
                document.getElementById('n-reviews').innerHTML = 0
            } else {
                document.getElementById('n-reviews').innerHTML = this.selectNumbReviews;
            }
        }
    }
}

</script>

<template>
    <div class="container-flex">

        <!-- sezione filtri -->
        <div id="page-filters" class="page-filters" :class="this.mobileView == true ? 'mobile' : ''">

            <!-- filtro fields -->
            <div class="filter-div">
                <div class="filter-label">Filtra per specializzazione</div>

                <div v-for="(elem, index) in this.fields" :key="index" class="ms-5">
                    <div class="form-check">
                        <input class="form-check-input" :name="elem.id" type="checkbox" :value="elem.id"
                            :id="`field-${elem.id}`" v-model="selectedFields">
                        <label class="form-check-label text-capitalize" :for="`field-${elem.id}`">
                            {{ elem.name }}
                        </label>
                    </div>
                </div>
            </div>

            <!-- filtro Voti recensioni -->
            <div class="filter-div">
                <div>
                    <span class="filter-label">Filtra per voto medio</span>

                </div>
                <div class="ms-5">
                    <span v-for="voto in 5" :key="key">
                        <i :class="voto <= this.average_vote ? 'fa-solid' : 'fa-regular'" class="fa-star text-warning me-2"
                            @click="selezionaVotoMedio(voto)"></i>
                    </span>
                    <span v-if="this.average_vote > 0" @click="selezionaVotoMedio(null)"
                        class="text-secondary ms-3 fst-italic">cancella</span>
                </div>

            </div>

            <!-- filtro Numero recensioni -->
            <div class="filter-div">
                <div for="n-reviews" class="filter-label">Filtra per il numero di recensioni</div>

                <div class="ms-5">
                    <div class="d-flex align-items-center">
                        <div class="me-2">
                            <input type="range" id="input-n" name="n-reviews" list="n-options" step="5" min="0" max="20"
                                v-model.number="selectNumbReviews" class="range" @change="rangeInput" />
                        </div>

                        <div class="d-flex justify-content-center">
                            <span class="mb-1" id="n-reviews">0</span>
                            <span class="span-plus mb-1">+</span>
                        </div>
                    </div>
                    <datalist id="n-options">
                        <option value="0"></option>
                        <option value="5"></option>
                        <option value="10"></option>
                        <option value="15"></option>
                        <option value="20"></option>
                    </datalist>
                </div>

            </div>

            <!-- cancella filtri -->
            <div v-if="this.average_vote > 0 || this.selectedFields.length > 0 || this.selectNumbReviews > 0"
                @click="deleteFilters()" id="deleteFilters" class="m-auto">
                Elimina i filtri
            </div>


            <button id="closeSideBtn" @click="toggleSidebar()" v-if="this.mobileView == true">
                <i class="fa-solid fa-forward"></i>
            </button>

        </div>

        <!-- sezione pagina titolo/cards -->
        <div class="page-content">

            <div class="top-page">
                <h1 class="text-center">Trova lo sviluppatore per te!</h1>

                <div class="text-end pe-5">Cerca ciò di cui hai bisogno. La nostra vetrina propone <i>più di
                        {{ this.profilesTotal - 1 }}</i> professionisti!</div>

                <div class="d-flex justify-content-between align-items-center px-5">
                    <!-- numero risultati filtrati -->
                    <div v-if="this.average_vote > 0 || this.selectedFields.length > 0 || this.selectNumbReviews > 0"
                        class="text-center">
                        La tua ricerca ha portato <strong>{{ this.profilesFiltered }}</strong> risultati
                    </div>
                    <button id="opensideBtn" @click="toggleSidebar()" v-if="this.mobileView == true">
                        <i class="fa-solid fa-sliders"></i>
                    </button>
                </div>

            </div>



            <!-- Index profili -->
            <div class="cards-section w-100">

                <!-- SE non ci sono risultati -->
                <div v-if="this.profiles.length === 0" class="text-center mt-5">
                    <h2>Non ci sono profili che corrispondo alla tua ricerca</h2>
                </div>

                <div class="card-row">
                    <!-- ProfileCard -->
                    <router-link v-for="(element, index) in this.profiles" :key="index"
                        :to="{ name: 'singleDeveloper', params: { dev_id: element.profile_id } }"
                        class="profile-card d-flex flex-column flex-lg-row">
                        <!-- IMMAGINE CARD -->

                        <img v-if="element.profile_image" :src="`${baseUrlStorage}${element.profile_image}`"
                            alt="Immagine Profilo" class="card-img" :class="(index % 2 === 0) ? 'order-1' : 'order-2'">
                        <img v-else src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                            alt="Immagine Profilo" class="card-img" :class="(index % 2 === 0) ? 'order-1' : 'order-2'">

                        <!-- INFORMAZIONI CARD -->
                        <div class="card-info" :class="(index % 2 === 0) ? 'order-2' : 'order-1'">
                            <!-- in evidenza -->
                            <div v-if="element.active_sponsorship" class="text-end">
                                In Evidenza <i class="fa-solid fa-gem"></i>
                            </div>
                            <!-- voto medio -->
                            <div class="text-end" v-if="element.average_vote > 0">
                                <i class="fa-solid fa-star"></i> <strong>{{ element.average_vote }}/5</strong>
                            </div>
                            <!-- nome cognome -->
                            <div>
                                <span class="info-nome">{{ element.name }}</span>
                                <span class="info-cognome ms-3">{{ element.surname }}</span>
                            </div>
                            <!-- fields -->
                            <div class="mb-2">
                                <div class="card-label mb-1">Campi di sviluppo:</div>
                                <div class="d-flex flex-wrap">
                                    <span v-for="(elem, index) in element.field_names" :key="index"
                                        :class="getClass(normalizeFieldName(elem))"
                                        class=" info-field me-2 text-capitalize">{{ elem }}</span>
                                </div>
                            </div>
                            <!-- performance -->
                            <div class="info-performance" v-if="element.performance">
                                &ldquo;
                                {{ element.performance }}
                                &rdquo;
                            </div>
                        </div>
                    </router-link>
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

    // sidebar filtri
    .page-filters {
        min-width: 320px;
        border-right: 4px groove #1d1b2c;
        // border-style: ;
        display: flex;
        flex-direction: column;
        // align-items: start;
        padding: 20px 20px;

        .filter-div {
            margin: 15px 0;

            .filter-label {
                font-family: 'Space Grotesk', sans-serif;
                font-weight: 600;
                font-size: 19px;

            }

            #n-reviews {
                position: relative;
                display: block;
                text-align: center;
                font-size: 1.5em;
                color: #1d1b2c;
                font-weight: 400;
            }

            .range {
                width: 100%;
                -webkit-appearance: none;
                background: #111;
                outline: none;
                border-radius: 15px;
                overflow: hidden;
                box-shadow: inset 0 0 5px #1d1b2c;
            }

            .range::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 15px;
                height: 15px;
                border-radius: 50%;
                background: #E7A117;
                cursor: pointer;
                border: 4px solid #333;
                box-shadow: -407px 0 0 400px #E7A117;
            }

            .span-plus {
                font-size: 23px;
            }
        }

        #deleteFilters {
            cursor: pointer;
            font-weight: 600;
            color: red;

            &:hover {
                text-decoration: underline;
            }
        }

        #closeSideBtn {
            background: #1d1b2c;
            color: #E7A117;
            width: 20%;
            margin: auto;
        }
    }

    // contenuto titolo/cards
    .page-content {
        width: 100%;

        .top-page {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            // lo header è di 60px
            height: 150px;
            margin-top: 5px;

            h1 {
                margin: 0;
                font-weight: 600;
                color: #1d1b2c;
            }

            #opensideBtn {
                background-color: #1d1b2c;
                color: #E7A117;
                padding: 0px 13px;
            }
        }

        .cards-section {
            width: 100%;
            height: calc(100vh - 215px);
            overflow: auto;

            .profile-card {
                overflow: hidden;
                border-radius: 20px 10px 20px 10px;
                border: 2px solid #1d1b2c;
                margin: auto;
                margin-bottom: 25px;
                width: 80%;
                min-height: 250px;
                text-decoration: none;
                color: #1d1b2c;

                .card-img {
                    cursor: pointer;
                    margin: 0;
                    display: block;
                    box-sizing: border-box;
                    width: 250px;
                    height: 250px;
                    object-fit: cover;
                    border-radius: 10px;
                }

                @media screen and (max-width: 992px) {
                    .card-img {
                        width: 100%;
                        // height: 100%;
                        // aspect-ratio: 1;
                    }
                }


                .card-info {
                    padding: 5px 30px;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;

                    .fa-gem {
                        color: #19b347;
                        font-size: 19px;
                    }

                    .fa-star {
                        color: #E7A117;
                    }

                    .info-nome,
                    .info-cognome {
                        font-size: 25px;
                        font-weight: 800;
                    }

                    .card-label {
                        font-family: 'Space Grotesk', sans-serif;
                        font-weight: 600;
                        letter-spacing: 2px;
                        text-transform: uppercase;
                    }

                    .info-performance {
                        max-height: 70px;
                    }
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

// Sidebar MOBILE
.page-filters.mobile {
    background-color: antiquewhite;
    display: none;
    transition: 2s;
}

@media screen and (max-width: 700px) {
    .page-filters {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 100%;
        z-index: 99;
        background-color: white;
        transition: 3s;
    }
}

// input range
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

.info-field {
    color: white;
    font-weight: 600;
    border-radius: 20px 8px 20px 8px;
    padding: 2px 5px;
    margin-bottom: 2px;
}

.sviluppo-web {
    color: white;
    // border: 1px solid black;
    background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi-838ObC7aOQ2ox_5mcjA1QCTf7Ml5LT3LQ&usqp=CAU');
    // background-color: gray;
    // background-blend-mode: multiply;
    background-size: cover;
    background-position: center;
}

.gaming {
    background-image: url("https://i0.wp.com/www.imaginestemacademy.com/wp-content/uploads/2022/09/pacman.jpg?resize=816%2C675&ssl=1");
    background-size: cover;
    // background-color: red;
}

.cyber-security {
    background-color: darkgreen;
    background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYLBLmx5P2Miw3HJLp3L5SiSM2L1a0HYhktw&usqp=CAU");
}

.app-mobile {
    background-color: #E7A117;
    background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS887lSA-xfspq-v0SBqecMoQHqNexrm4MViQ&usqp=CAU');
    background-size: cover;
    background-position: center;
    // filter: brightness(70%);
    background-color: lightgrey;
    background-blend-mode: multiply;
}

.blockchain {
    background-color: #19b347;
    background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd_zlUC5QcMuHWG97OqDMZa9m_ZPFWDOQkRA&usqp=CAU');
    background-color: gray;
    background-blend-mode: multiply;
    background-size: cover;
    background-position: center;
}

.machine-learning {
    background-color: purple;
    background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXvX0QKnyzhcifLPnH0rUo-6t_zNUFxfx8BA&usqp=CAU');
    background-size: cover;
    background-position: center;
    background-color: lightgray;
    background-blend-mode: multiply;
}

.CRM {
    background-color: black;
}
</style>
