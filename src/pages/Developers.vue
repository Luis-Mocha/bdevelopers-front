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
            selectedFields: []
        }
    },
    mounted() {
        this.getProfiles();
        this.getFields();
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
        }
    },
}

</script>

<template>
    <h1 class="text-center text-success">Sono la pagina Developers</h1>
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
        <div v-for="(element, index) in this.profiles" :key="index">
            <!-- Card -->
            <div class="card" style="width: 18rem;">
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
                    <div class="my-2">Technologies:</div>
                    <div v-for="(elem, index) in element.technology_names" :key="index">{{ elem }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss"></style>
