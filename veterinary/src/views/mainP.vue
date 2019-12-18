<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <h1 class="display-5 text-white">Bienvenido Propietario
                {{ $store.state.user.nombre1 }} {{ $store.state.user.apellido1 }}
            </h1>
            <div class="col-md-12">
            <div class="row mx-lg-n5">
                <div class="col py-3 px-lg-5 border bg-white">
                    <button type="button" class="btn btn-primary" @click="displayA = !displayA">
                        {{ !displayA ? 'Crear Mascota' : 'cerrar' }}
                    </button>                 
                </div>
                <div class="col py-3 px-lg-5 border bg-white">
                    <button type="button" class="btn btn-primary" @click="displayB = !displayB">
                        {{ !displayB ? 'Agendar Cita' : 'cerrar' }} 
                    </button> 
                </div>
            </div>
            </div>
            <div class="col-md-12" >
                <div class="row mx-lg-n5">
                <div class="col py-3 px-lg-5 border bg-white">
                    <div class="card-body" v-if="displayA">
                        <form>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Nombre</label>
                                <input v-model="nombre" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Edad</label>
                                <input v-model="edad" type="text" class="form-control" id="exampleInputPassword1">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Raza</label>
                                <input v-model="raza" type="text" class="form-control" id="exampleInputPassword1">
                            </div>
                            <button type="button" @click="createPet" class="btn btn-primary">Enviar</button>
                        </form>
                    </div> 
                    <div v-if="pets.length !== 0">
                            <div class="card" style="width: 18rem;" v-for="(pet, key) in pets" :key="key">
                                <div class="card-body">
                                    <h5 class="card-title">{{ pet.nombre }}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">{{ pet.raza }}</h6>
                                </div>
                            </div>
                    </div>
                    <div v-else>
                        <div class="alert alert-info" role="alert">
                            No tienes mascotas
                        </div>
                    </div>              
                    </div>
                <div class="col py-3 px-lg-5 border bg-white">
                    <div class="card-body" v-if="displayB">
                        <form>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Fecha</label>
                                <input v-model="fecha" type="date" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Veterinario</label>
                                <select v-model="veterinario" class="form-control" id="exampleFormControlSelect1">
                                    <option></option>
                                    <template v-if="veterinario.length !== 0" >
                                    <option
                                        v-for="(v, key) in veterinario"
                                        :key="key"
                                        :value="v._id"
                                    >{{ v.nombre1 }} {{ v.nombre2 }}
                                    </option>
                                    </template>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Mascota</label>
                                <select v-model="pet" class="form-control" id="exampleFormControlSelect1">
                                    <option></option>
                                    <template v-if="pets.length !== 0" >
                                    <option
                                        v-for="(p, key) in pets"
                                        :key="key"
                                        :value="p._id"
                                    >{{ p.nombre }}
                                    </option>
                                    </template>
                                </select>
                            </div>
                            <button type="button" @click="createDate" class="btn btn-primary">Enviar</button>
                        </form>
                    </div> 
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

        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    name: 'mainP',
    data: () => ({
        displayA: false,
        displayB: false,
        dates: [],
        pets: [],
        veterinarios: [],
        pet: '',
        veterinario: '',
        fecha: '',
        nombre: '',
        edad: '',
        raza: ''
    }),
    mounted(){
        this.listDates()
        this.listPets()
    },
    methods: {
        createPet(){
            axios.post('/mascota', {
                nombre: this.nombre,
                edad: this.edad,
                raza: this.raza,
                id_propietario: this.$store.state.user._id
            })
            .then(response => {
                this.nombre = '';
                this.edad = '';
                this.raza = '';
                this.displayA = !this.displayA
                this.listPets()
            })
            .catch(e => console.log(e.message))
        },
        createDate(){
            axios.post('/setCita', {
                fecha: this.fecha,
                pet: this.pet,
                veterinario: this.veterinario,
                id_propietario: this.$store.state.user._id
            })
            .then(response => {
                this.fecha = '';
                this.pet = '';
                this.veterinario = '';
                this.displayB = !this.displayB;
                this.listDates()
            })
            .catch(e => console.log(e.message))
        },
        listPets(){
            axios.get(`/mascota/${this.$store.state.user._id}`)
            .then(response => {
                this.pets = response.data
            })
            .catch(e => console.log(e.message))
        },
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