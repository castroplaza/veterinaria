<template>
    <div class="container-fluid">
        <div v-if="owners">
            <div class="row justify-content-md-center">
            <div v-for="(owner, key) in owners" :key="key">
                <div class="col-md-3">
                <div class="card" style="width: 18rem;">
                    <img :src="require('@/assets/pet.jpg')" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">{{ owner.mascota }}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{{ owner.nombre1 }} - {{ owner.apellido1 }}</h6>
                        <h6 class="card-subtitle mb-2 text-muted">Dir.{{ owner.direccion }}</h6>
                        <p class="card-text">ID {{ owner.identificacion }}</p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        <div v-else>
            <div class="alert">No hay propietarios</div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    name: 'Dogs',
    mounted(){
        this.get()
    },
    data: () => ({
        owners: null
    }),
    methods: {
        get(){
            let self = this;
            axios.get('/propietarios')
            .then(function(response){
            //Método que se dispara cuando vuelve la respuesta del servidor.
            self.owners = response.data;
            })
            .catch(e => console.log(e))
        }
    }
}
</script>