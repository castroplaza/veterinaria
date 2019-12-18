<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <h1 class="display-5 text-white">Bienvenido Veterinario
                {{ $store.state.user.nombre1 }} {{ $store.state.user.apellido1 }}
            </h1>
            <div class="col-md-12" >
                <div v-if="dates.length !== 0">
                    <table class="table table-hover">
                        <thead class="thead-dark">
                            <tr>
                            <th scope="col">Fecha</th>
                            <th scope="col">veterinario</th>
                            <th scope="col">mascota</th>
                            <th scope="col">propietario</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(date, key) in dates" :key="key">
                            <th scope="row">{{ date.fecha }}</th>
                            <td>{{ date.mascota.nombre }}</td>
                            <td>{{ date.veterinario.nombre1 }}</td>
                            <td>{{ date.propietario.nombre1 }}</td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
                <div v-else>
                    <div class="alert alert-info" role="alert">
                        No tienes citas agendadas
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    name: 'mainV',
    data: () => ({
        dates: [],
    }),
    mounted(){
        this.listDates()
    },
    methods: {
        listDates(){
            axios.get(`/getCitas/${this.$store.state.user._id}`)
            .then(response => {
                this.date = response.data
            })
            .catch(e => console.log(e.message))
        }
    }
    
}
</script>