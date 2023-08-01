<script>
import axios from 'axios';

export default {
    name: 'SingleDeveloper',
    data() {
        return {
            baseUrlApi: 'http://127.0.0.1:8000/api/',
            baseUrlStorage: 'http://127.0.0.1:8000/storage/',
            singleProfile: null,
            review: {
                profile_id: '',
                name: '',
                surname: '',
                date: '',
                vote: '',
                description: ''
            },
            lead: {
                profile_id: '',
                name: '',
                surname: '',
                email: '',
                message: ''
            }
        }
    },
    beforeMount() {
        this.getSingleProfile();
    },
    mounted() {
        this.review.profile_id = this.singleProfile.profile_id;
        this.review.date = this.getDate();
        this.lead.profile_id = this.singleProfile.profile_id;
    },
    methods: {

        getSingleProfile() {

            axios.get(`${this.baseUrlApi}profiles/${this.$route.params.dev_id}`)
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

        getDate() {
            let date = new Date();

            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            if (month < 10) month = "0" + month;
            if (day < 10) day = "0" + day;

            let today = year + "-" + month + "-" + day;
            document.getElementById("input-date").value = today;
            return today;
        },

        submitReview() {
            // Effettua una chiamata API POST al backend Laravel
            axios.post(`${this.baseUrlApi}reviews/store`, this.review)
                .then(response => {
                    console.log('Recensione salvata con successo!');
                    // Effettua eventuali azioni aggiuntive dopo aver salvato la recensione
                    window.location.reload();
                })
                .catch(error => {
                    console.error('Errore durante il salvataggio della recensione:', error);
                });

        },

        submitLead() {
            // Effettua una chiamata API POST al backend Laravel
            axios.post(`${this.baseUrlApi}leads/store`, this.lead)
                .then(response => {
                    console.log('Recensione salvata con successo!');
                    // Effettua eventuali azioni aggiuntive dopo aver salvato la recensione
                    window.location.reload();
                })
                .catch(error => {
                    console.error('Errore durante il salvataggio della recensione:', error);
                });

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

    },
}

</script>

<template>
    <section id="single-developer" class="overflow-x-hidden">
        <div class="container mt-5">
            <div class="row">
                <div class="col-lg-4">
                    <div class="card m-auto text-center mb-4 rounded-4  border-0" data-aos="slide-right"
                        data-aos-duration="1500">
                        <img class=" w-50 m-auto mb-3 mt-4 profile-img"
                            :src="`${baseUrlStorage}${singleProfile.profile_image}`" alt="">
                        <div class="d-flex justify-content-center mb-3">
                            <h2> {{ singleProfile.name }} </h2>
                            <h2 class="ms-3"> {{ singleProfile.surname }} </h2>
                        </div>
                        <div class="d-flex flex-wrap mb-2 justify-content-center">
                            <span v-for="(elem, index) in singleProfile.field_names" :key="index"
                                :class="getClass(normalizeFieldName(elem))" class="info-field text-capitalize">
                                {{ elem }}
                            </span>
                        </div>

                        <div class="mb-2 text-capitalize"> {{ singleProfile.address }} </div>

                        <div class="d-flex justify-content-center mb-4 border-0">
                            <!-- offcanvas recensioni -->
                            <button class="btn button me-3" type="button" data-bs-toggle="modal"
                                data-bs-target="#reviewModal" data-bs-whatever="@getbootstrap">Scrivi una
                                recensione</button>
                            <!-- MODALE -->
                            <button type="button" class="btn button" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                data-bs-whatever="@getbootstrap">Scrivi un messaggio</button>
                        </div>
                    </div>
                    <div class="card mb-4 border-0 rounded-3" data-aos="slide-right" data-aos-duration="1500">
                        <ul class="list-group list-group-flush rounded-3">
                            <li class="list-group-item d-flex justify-content-between align-items-center p-3 border-bot">
                                <i class="fa-brands fa-linkedin fa-lg text-primary"></i>
                                <p class="mb-0">{{ singleProfile.linkedin_url }}</p>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                                <i class="fab fa-github fa-lg" style="color: #333333;"></i>
                                <p class="mb-0">{{ singleProfile.github_url }}</p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="col-lg-8">
                    <div class="card mb-4 rounded-4 border-custom" data-aos="slide-left" data-aos-duration="1500">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-sm-3">
                                    <p class="mb-0 text-uppercase fw-semibold">Nome</p>
                                </div>
                                <div class="col-sm-9">
                                    <p class="mb-0 text-capitalize">{{ singleProfile.name }}</p>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <p class="mb-0 text-uppercase fw-semibold">Cognome</p>
                                </div>
                                <div class="col-sm-9">
                                    <p class="mb-0 text-capitalize">{{ singleProfile.surname }}</p>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <p class="mb-0 text-uppercase fw-semibold">Email</p>
                                </div>
                                <div class="col-sm-9">
                                    <p class="mb-0">{{ singleProfile.email }}</p>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <p class="mb-0 text-uppercase fw-semibold">Indirizzo</p>
                                </div>
                                <div class="col-sm-9">
                                    <p class="mb-0 text-capitalize">{{ singleProfile.address }}</p>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <p class="mb-0 text-uppercase fw-semibold">Data di nascita</p>
                                </div>
                                <div class="col-sm-9">
                                    <p class="mb-0" v-if="singleProfile.birth_date">{{ singleProfile.birth_date }}</p>
                                    <p v-else class="fst-italic text-secondary">non disponibile</p>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <p class="mb-0 text-uppercase fw-semibold">Numero di telefono</p>
                                </div>
                                <div class="col-sm-9">
                                    <p class="mb-0" v-if="singleProfile.phone_number">{{ singleProfile.phone_number }}</p>
                                    <p v-else class="fst-italic text-secondary">non disponibile</p>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <p class="mb-0 text-uppercase fw-semibold">Tecnologie di sviluppo</p>
                                </div>
                                <div class="col-sm-9 d-flex">
                                    <div v-for="(elem, index) in singleProfile.technology_names"
                                        v-if="singleProfile.technology_names">
                                        <span :key="index" class="mb-0">{{ elem }}</span>
                                        <span v-if="index !== singleProfile.technology_names.length - 1"
                                            class="me-2">,</span>
                                    </div>

                                    <p v-else class="fst-italic text-secondary">non disponibile</p>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <p class="mb-0 text-uppercase fw-semibold">Curriculum</p>
                                </div>
                                <div class="col-sm-9">

                                    <button class="btn-cv" v-if="singleProfile.curriculum">
                                        <a class="mb-0" :href="`${baseUrlStorage}${singleProfile.curriculum}`"
                                            target="_blank" rel="noopener noreferrer"><i
                                                class="fa-solid fa-file-pdf"></i><span class="ms-1">Scarica</span></a>
                                    </button>

                                    <p v-else class="fst-italic text-secondary">non disponibile</p>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <!-- Recensioni -->
                            <div class="card mb-4 card-recensioni border-custom" data-aos="slide-left"
                                data-aos-duration="1500">
                                <div class="p-3">
                                    <div class="card-title">
                                        <h2 class="mb-0">RECENSIONI</h2>
                                        <div class="mb-3 text-capitalize" v-if="singleProfile.reviews.length > 0">
                                            voto medio: {{ parseFloat(singleProfile.average_vote).toFixed(1) }}
                                        </div>
                                    </div>
                                    <div v-if="singleProfile.reviews.length == 0">
                                        Questo profilo non ha ancora recensioni. Sii il primo a lasciarne una!
                                    </div>

                                    <div v-for="(elem, index) in singleProfile.reviews" :key="index"
                                        class="border-review mb-4 p-3 rounded-4" data-aos="slide-left"
                                        data-aos-duration="1500">
                                        <div class="row">
                                            <div class="col-sm-3 d-flex mb-3">
                                                <h3 class="mb-2 text-uppercase fw-semibold fs-5">{{ elem.name }}</h3>
                                                <h3 class="mb-2 ms-1 text-uppercase fw-semibold fs-5">{{ elem.surname }}
                                                </h3>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <p class="mb-2 text-uppercase fw-medium">Data</p>
                                            </div>
                                            <div class="col-sm-9">
                                                <p class="text-muted mb-2">{{ elem.date.split('-').reverse().join('/') }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <p class="mb-2 text-uppercase fw-medium">Voto: {{ elem.vote }}</p>
                                            </div>
                                            <div class="col-sm-9">
                                                <span v-for="i in 5" :key="i">
                                                    <i :class="i <= elem.vote ? 'fa-solid' : 'fa-regular'"
                                                        class="fa-star text-warning"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <p class="mb-2 text-uppercase fw-medium">Descrizione</p>
                                            </div>
                                            <div class="col-sm-9">
                                                <i class="fa-solid fa-quote-left"></i>
                                                {{ elem.description }}
                                                <i class="fa-solid fa-quote-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- MODALE RECENSIONI -->
            <div class="modal fade" id="reviewModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Scrivi una recensione a
                                {{ singleProfile.name }} {{ singleProfile.surname }}</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="submitReview">
                                <div class="mb-3">
                                    <label for="input-name" class="col-form-label">Nome</label>
                                    <input id="input-name" class="form-control" type="text" v-model="this.review.name"
                                        required>
                                </div>
                                <div class="mb-3">
                                    <label for="input-surname" class="col-form-label">Cognome</label>
                                    <input id="input-surname" class="form-control" type="text" v-model="this.review.surname"
                                        required>
                                </div>
                                <div class="mb-3">
                                    <input id="input-date" class="form-control" type="date" hidden disabled required>
                                </div>
                                <div class="mb-3">
                                    <label for="select-vote" class="col-form-label">Voto</label>
                                    <select name="vote" id="select-vote" class="form-select text-warning form-control"
                                        v-model="this.review.vote" required>
                                        <option class="text-warning" value="5">&#9733;&#9733;&#9733;&#9733;&#9733;</option>
                                        <option class="text-warning" value="4">&#9733;&#9733;&#9733;&#9733;&#9734;</option>
                                        <option class="text-warning" value="3">&#9733;&#9733;&#9733;&#9734;&#9734;</option>
                                        <option class="text-warning" value="2">&#9733;&#9733;&#9734;&#9734;&#9734;</option>
                                        <option class="text-warning" value="1">&#9733;&#9734;&#9734;&#9734;&#9734;</option>
                                    </select>
                                </div>
                                <div>
                                    <label for="input-desc">Recensione</label>
                                    <textarea id="input-desc" class="form-control" rows="4" cols="50"
                                        v-model="this.review.description" required></textarea>
                                </div>
                                <div class="modal-footer border-0">
                                    <button type="submit" class="btn button mt-3 mb-2">Invia recensione</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!-- MODALE MESSAGGIO -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Scrivi un messaggio a
                                {{ singleProfile.name }} {{ singleProfile.surname }}</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="submitLead">
                                <div class="mb-3">
                                    <label for="recipient-name" class="col-form-label">Nome:</label>
                                    <input type="text" class="form-control" id="recipient-name" required
                                        v-model="this.lead.name">
                                </div>
                                <div class="mb-3">
                                    <label for="recipient-surname" class="col-form-label">Cognome:</label>
                                    <input type="text" class="form-control" id="recipient-surname" required
                                        v-model="this.lead.surname">
                                </div>
                                <div class="mb-3">
                                    <label for="recipient-email" class="col-form-label">Email:</label>
                                    <input type="email" class="form-control" id="recipient-email" required
                                        v-model="this.lead.email">
                                </div>
                                <div class="mb-3">
                                    <label for="recipient-message" class="col-form-label">Messaggio:</label>
                                    <textarea class="form-control" id="recipient-message" required
                                        v-model="this.lead.message"></textarea>
                                </div>
                                <div class="modal-footer border-0">
                                    <button type="button" class="btn button-close" data-bs-dismiss="modal">Chiudi</button>
                                    <button type="submit" class="btn button">Invia messaggio</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
#single-developer {
    background-color: #F6EEE0;
    font-family: 'Space Grotesk', sans-serif;

    .profile-img {
        border-radius: 20px 10px 20px 10px;
        max-width: 70%;
        max-height: 70%;
        object-fit: cover;
        box-shadow: 15px 15px 7px -5px rgba(0, 0, 0, 0.75);
    }

    .card {
        background-color: #F6EEE0;

        li {
            background-color: #F6EEE0;
        }

        .border-bot {
            border-bottom: 1px solid #1d1b2c;
        }

        hr {
            color: #1d1b2c;
        }

        .border-review {
            border: 1px solid #1d1b2c;
        }

    }

    .border-custom {
        --b: .5em;
        /* border width */
        --c: 3em;
        /* corner size */
        --r: 2em;
        /* corner rounding */
        position: relative;
        // margin: 1em auto;
        border: solid var(--b) transparent;
        // padding: 1em;
        // max-width: 23em;
        // font: 1.25em ubuntu, sans-serif;

        &::before {
            position: absolute;
            z-index: -1;
            inset: calc(-1*var(--b));
            border: inherit;
            border-radius: var(--r);
            background: linear-gradient(#E7A117, rgb(255, 181, 20), #1d1b2c) border-box;
            --corner:
                conic-gradient(from -90deg at var(--c) var(--c), red 25%, #0000 0) 0 0/ calc(100% - var(--c)) calc(100% - var(--c)) border-box;
            --inner: conic-gradient(red 0 0) padding-box;
            -webkit-mask: var(--corner), var(--inner);
            -webkit-mask-composite: source-out;
            mask: var(--corner) subtract, var(--inner);
            content: ''
        }
    }

    .button {
        border: 2px solid #1d1b2c;
        color: #1d1b2c;
        background-color: #E7A117;
        border-radius: 10px;
        transition: 1s;
    }

    .button:hover,
    .button:focus {
        box-shadow: 0 0.5em 0.5em -0.4em #1d1b2c;
        transform: translateY(-0.25em);
    }

    .button-close {
        border: 2px solid #E7A117;
        color: #E7A117;
        background-color: #1d1b2c;
        border-radius: 10px;
        transition: 1s;
    }

    .button-close:hover,
    .button-close:focus {
        box-shadow: 0 0.5em 0.5em -0.4em #E7A117;
        transform: translateY(-0.25em);
    }

    .btn-cv {
        background-color: #1d1b2c;
        border: 2px solid #E7A117;
        padding: 5px 8px;
        border-radius: 10px;
        transition: 1s;

        a {
            text-decoration: none;

            span {
                color: white;
            }

            i {
                color: white;
            }
        }

    }

    .btn-cv:hover,
    .btn-cv:focus {
        box-shadow: 0 0.5em 0.5em -0.4em #E7A117;
        transform: translateY(-0.25em);
    }


    // badge fields
    .info-field {
        color: white;
        font-weight: 600;
        border-radius: 20px 8px 20px 8px;
        padding: 2px 5px;
        margin-bottom: 5px;
        margin-right: 5px;
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
}


.form-control {
    &:focus { 
        outline: none !important;
        border-color: #E7A117;
        box-shadow: 0 0 10px #E7A117;
    }
}
</style>
