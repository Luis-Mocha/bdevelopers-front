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
    <h1 class="text-center text-success">Show Developer</h1>

    <div class="container">
        <img :src="`${baseUrlStorage}${singleProfile.profile_image}`" alt="">

        <div> {{ singleProfile.name }} </div>
        <div> {{ singleProfile.surname }} </div>
        <div> {{ singleProfile.birth_date }} </div>
        <div> {{ singleProfile.address }} </div>
        <div> {{ singleProfile.email }} </div>
        <div> {{ singleProfile.github_url }} </div>
        <div> {{ singleProfile.linkedin_url }} </div>
        <div> {{ singleProfile.performance }} </div>
        <a :href="`${baseUrlStorage}${singleProfile.curriculum}`" target="_blank" rel="noopener noreferrer">Scarica il
            curriculum</a>

        <!-- Recensioni -->
        <div>
            <div>voto medio: {{ parseFloat(singleProfile.average_vote).toFixed(1) }}</div>
            <!-- offcanvas recensioni -->
            <button class="btn btn-primary me-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight">Scrivi un recensione</button>
            <!-- MODALE -->
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
                data-bs-whatever="@getbootstrap">Scrivi un messaggio</button>



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

            <h2 class="mt-4 mb-2">RECENSIONI</h2>
            <div v-if="singleProfile.reviews == null">
                Non ci sono recensioni
            </div>

            <div v-for="(elem, index) in singleProfile.reviews" :key="index" class="border mb-2">
                <!-- nome e cognome -->
                <div>
                    <span class="me-1">{{ elem.name }}</span>
                    <span>{{ elem.surname }}</span>
                </div>

                <!-- data -->
                <div>
                    <span>Data:</span>
                    <div>{{ elem.date.split('-').reverse().join('/') }}</div>
                </div>

                <!-- voto -->
                <div>Voto: {{ elem.vote }}</div>
                <span v-for="i in 5" :key="i">
                    <i :class="i <= elem.vote ? 'fa-solid' : 'fa-regular'" class="fa-star text-warning"></i>
                </span>
                <!-- descrizione -->
                <div>
                    <i class="fa-solid fa-quote-left"></i>
                    {{ elem.description }}
                    <i class="fa-solid fa-quote-right"></i>
                </div>
            </div>
        </div>


    </div>
</template>

<style lang="scss" scoped>
// .fa-star {
//     color: rgba(206, 154, 12, 0.815);
// }
</style>
