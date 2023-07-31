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

        }
    },
}

</script>

<template>
    <section id="single-developer">
        <h1 class="text-center text-success">Show Developer</h1>

        <div class="container">
            <div class="row">
                <div class="col-lg-4">
                    <div class="card m-auto text-center mb-4 rounded-4" data-aos="slide-right" data-aos-duration="1500">
                        <img class=" w-50 m-auto mb-3 mt-4 profile-img"
                            :src="`${baseUrlStorage}${singleProfile.profile_image}`" alt="">
                        <div class="d-flex justify-content-center mb-3">
                            <h2> {{ singleProfile.name }} </h2>
                            <h2 class="ms-3"> {{ singleProfile.surname }} </h2>
                        </div>
                        <div class="flex-wrap mb-2">
                            <span v-for="(elem, index) in singleProfile.field_names" :key="index"
                                class="me-2 text-capitalize ">{{ elem }}</span>
                        </div>

                        <div class="mb-2"> {{ singleProfile.address }} </div>

                        <div class="d-flex justify-content-center mb-4">
                            <!-- offcanvas recensioni -->
                            <button class=" btn button me-3" type="button" data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Scrivi una
                                recensione</button>
                            <!-- MODALE -->
                            <button type="button" class="btn button" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                data-bs-whatever="@getbootstrap">Scrivi un messaggio</button>
                        </div>
                    </div>
                    <div class="card mb-4  rounded-3" data-aos="slide-right" data-aos-duration="1500">
                        <ul class="list-group list-group-flush rounded-3">
                            <li class="list-group-item d-flex justify-content-between align-items-center p-3">
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
                    <div class="card mb-4 rounded-4" data-aos="slide-left" data-aos-duration="1500">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-sm-3">
                                    <p class="mb-0 text-uppercase fw-semibold">Nome</p>
                                </div>
                                <div class="col-sm-9">
                                    <p class="text-muted mb-0 text-capitalize">{{ singleProfile.name }}</p>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <p class="mb-0 text-uppercase fw-semibold">Cognome</p>
                                </div>
                                <div class="col-sm-9">
                                    <p class="text-muted mb-0 text-capitalize">{{ singleProfile.surname }}</p>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <p class="mb-0 text-uppercase fw-semibold">Email</p>
                                </div>
                                <div class="col-sm-9">
                                    <p class="text-muted mb-0">{{ singleProfile.email }}</p>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <p class="mb-0 text-uppercase fw-semibold">Indirizzo</p>
                                </div>
                                <div class="col-sm-9">
                                    <p class="text-muted mb-0 text-capitalize">{{ singleProfile.address }}</p>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <p class="mb-0 text-uppercase fw-semibold">Data di nascita</p>
                                </div>
                                <div class="col-sm-9">
                                    <p class="text-muted mb-0">{{ singleProfile.birth_date }}</p>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <p class="mb-0 text-uppercase fw-semibold">Numero di telefono</p>
                                </div>
                                <div class="col-sm-9">
                                    <p class="text-muted mb-0">{{ singleProfile.phone_number }}</p>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <p class="mb-0 text-uppercase fw-semibold">Tecnologie di sviluppo</p>
                                </div>
                                <div class="col-sm-9 d-flex">
                                    <div v-for="(elem, index) in singleProfile.technology_names">
                                        <span :key="index" class="text-muted mb-0">{{ elem }}</span>
                                        <span v-if="index !== singleProfile.technology_names.length - 1"
                                            class="me-2">,</span>
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <p class="mb-0 text-uppercase fw-semibold">Curriculum</p>
                                </div>
                                <div class="col-sm-9">
                                    <a class="text-muted mb-0" :href="`${baseUrlStorage}${singleProfile.curriculum}`"
                                        target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-file-pdf"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <!-- Recensioni -->
                            <div class="card mb-4 card-recensioni" data-aos="slide-left" data-aos-duration="1500">
                                <div class="p-3">

                                    <div class="card-title">
                                        <h2 class="mb-0">RECENSIONI</h2>
                                        <div class="mb-3">voto medio:
                                            {{ parseFloat(singleProfile.average_vote).toFixed(1) }}
                                        </div>
                                    </div>
                                    <div v-if="singleProfile.reviews == null">
                                        Non ci sono recensioni
                                    </div>

                                    <div v-for="(elem, index) in singleProfile.reviews" :key="index"
                                        class="border mb-4 p-3 rounded-4">
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

            <!-- OFFCANVAS -->
            <div class="offcanvas offcanvas-end w-50" tabindex="-1" id="offcanvasRight"
                aria-labelledby="offcanvasRightLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasRightLabel">La tua recensione</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <form @submit.prevent="submitReview">
                        <div>
                            <label for="input-name">Nome</label>
                            <input id="input-name" type="text" v-model="this.review.name" required>
                        </div>
                        <div>
                            <label for="input-surname">Cognome</label>
                            <input id="input-surname" type="text" v-model="this.review.surname" required>
                        </div>
                        <div>
                            <input id="input-date" type="date" hidden disabled required>
                        </div>
                        <div>
                            <label for="select-vote">Voto</label>
                            <select name="vote" id="select-vote" v-model="this.review.vote" required>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <div>
                            <label for="input-desc">Recensione</label>
                            <textarea id="input-desc" rows="4" cols="50" v-model="this.review.description"
                                required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary mb-3">Invia recensione</button>
                    </form>
                </div>
            </div>
            <!-- MODALE -->
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
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>
                                    <button type="submit" class="btn btn-primary">Invia messaggio</button>
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
    .profile-img {
        border-radius: 20px 10px 20px 10px;
        max-width: 70%;
        max-height: 70%;
        object-fit: cover;
        box-shadow: 15px 15px 7px -5px rgba(0, 0, 0, 0.75);
    }

    .card {
        border: 1px solid #1d1b2c;
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
}
</style>
