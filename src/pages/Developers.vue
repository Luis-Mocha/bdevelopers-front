<script>
import axios from 'axios';
export default {
    name: 'Developers',
    components: {

    },
    data() {
        return {
            profiles: [],
            baseUrlApi: 'http://127.0.0.1:8000/api/',
            baseUrlStorage: 'http://127.0.0.1:8000/storage/',
            fields: [],
            selectedFields: [],
            reviews: [],
            selectReviews: [],
            selectNumbReviews: 0
        }
    },
    mounted() {
        this.getProfiles();
        this.getFields();
        this.getReviews
    },
    watch: {
        selectedFields: {
            handler: 'getProfiles',
            deep: true
        }
    },
    methods: {
        getProfiles() {

            const params = {}

            if (this.selectedFields.length > 0) {
                params.field_ids = this.selectedFields.join(',')
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

        getReviews(){
            axios.get(`${this.baseUrlApi}reviews`).then(res => {
                this.reviews = res.data.reviews
            })
        }
    },
}

</script>

<template>
    <h1 class="text-center text-success">Sono la pagina Developers</h1>
    <div class="container">
        <h4>Filtro specializzazione</h4>
    </div>
    <div v-for="(elem, index) in this.fields" :key="index" class="container">
        <div class="form-check">
            <input class="form-check-input" :name="elem.id" type="checkbox" :value="elem.id" :id="`field-${elem.id}`"
                v-model="selectedFields">
            <label class="form-check-label" :for="`field-${elem.id}`">
                {{ elem.name }}
            </label>
        </div>
    </div>
    <div class="container">
        <h4>Filtro per numero di recensioni</h4>
        <label for="n-reviews">Filtro per numero di recensioni</label><br />
        <input type="range" id="n-reviews" name="n-reviews" list="options" step="5" min="0" max="20"  v-model="selectNumbReviews"/>

        <datalist id="options">
            <option  value="0" label="0+"></option>
            <option value="5" label="5+"></option>
            <option value="10" label="10+"></option>
            <option value="15" label="15+"></option>
            <option value="20" label="20+"></option>
        </datalist>
    </div>
    
    <div class="container">
        <div class="row">
            <!-- Card -->
            <div  v-for="(element, index) in this.profiles" :key="index" class="card my-2 col-12 col-md-6 col-lg-4">
                <img :src="`${baseUrlStorage}${element.profile_image}`" alt="" class="card-img-top">
                <div class="card-body">
                    <div>{{ element.name }}</div>
                    <div>{{ element.surname }}</div>
                    <div>{{ element.birth_date }}</div>
                    <div>{{ element.address }}</div>
                    <div>{{ element.phone_number }}</div>
                    <div>{{ element.email }}</div>
                    <a>{{ element.github_url }}</a><br>
                    <a>{{ element.linkedin_url }}</a><br>
                    <a :href="`${baseUrlStorage}${element.curriculum}`" download target="_blank">Scarica il tuo
                        curriculum</a>
                    <div>Fields:</div>
                    <div v-for="(elem, index) in element.field_names" :key="index" class="text-capitalize">{{ elem }}</div>
                    <div class="mt-2">Technologies:</div>
                    <div v-for="(elem, index) in element.technology_names" :key="index">{{ elem }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

datalist {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  writing-mode: vertical-lr;
  width: 200px;
}

option {
  padding: 0;
}

input[type="range"] {
  width: 200px;
  margin: 0;
}

</style>
