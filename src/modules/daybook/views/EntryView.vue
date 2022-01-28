<template>

    <template v-if="entry">
        <div class="entry-title d-flex justify-content-between p-2">
            <div>
                <span class="text-success fs-3 fw-bold">{{day}}</span>
                <span class="mx-1 fs-3">{{month}}</span>
                <span class="mx-2 fs-4 fw-light">{{yearDay}}</span>
            </div>

            <div>
                <input type="file"
                    ref="imageSelector"
                    @change="onSelectedImage"
                    v-show="false"
                    accept="image/png, image/jpeg"
                >

                <button class="btn btn-danger mx-2"
                    v-if="entry.id"
                    @click="onDeleteEntry">
                    Borrar
                    <i class="fa fa-trash-alt"></i>
                </button>

                <button class="btn btn-primary"
                    @click="onSelectImage">
                    Subir foto
                    <i class="fa fa-upload"></i>
                </button>
            </div>
        </div>

        <hr>
        <div class="d-flex flex-column px-3 h-7">
            <textarea v-model="entry.text" placeholder="¿Qué sucedió hoy?"></textarea>
        </div>

    
        <img v-if="entry.picture && !localImage" 
            :src="entry.picture" 
            alt="entry-picture"
            class="img-thumbnail"
        >
        <img v-if="localImage" 
            :src="localImage" 
            alt="entry-picture"
            class="img-thumbnail"
        >

    </template>

    <Fab icon="fa-save" @on:click="saveEntry" />
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters, mapActions } from "vuex";
import Swal from 'sweetalert2'

import getDayMonthYear from "../helpers/getDayMonthYear";
import uploadImage from "../helpers/uploadImage";

export default {

    props:{
        id: {
            type: String,
            required: true
        }
    },

    components: {
        Fab: defineAsyncComponent(() => import("../components/Fab.vue"))
    },

    computed: {
        ...mapGetters('journal', ['getEntryById']),
        entry(){
            if(this.id === 'new'){
                return {
                    text: '',
                    date: new Date().getTime(),
                    file: null
                }
            }
            return this.getEntryById(this.id)
        },
        day(){
            if(!this.entry) return ""
            return getDayMonthYear(this.entry.date).day
        },
        month(){
            if(!this.entry) return ""
            return getDayMonthYear(this.entry.date).month
        },
        yearDay(){
            if(!this.entry) return ""
            return getDayMonthYear(this.entry.date).yearDay
        }
        
    },

    data(){
        return {
            localImage: null
        }
    },

    methods: {
        async saveEntry(){
            new Swal( {
                title: "Espere por favor",
                allowOutsideClick: false
            })
            Swal.showLoading()

            const picture = await uploadImage(this.file)

            // console.log( picture )

            this.entry.picture = picture

            if( this.entry.id ){
                this.updateEntry(this.entry)
            }
            else{
                const id = await this.createEntry(this.entry)
                this.$router.push({name: 'entry', params: {id}})
            }

            Swal.fire('Guardado', 'Entrada registrada con éxito', 'success')
            this.file = null
        },
        async onDeleteEntry(){
            const { isConfirmed } = await Swal.fire({
                title: '¿Está seguro?',
                text: 'Una vez borrado, no se puede recuperar',
                showDenyButton: true,
                confirmButtonText: 'Si, estoy seguro'
            })

            if( isConfirmed ){
                new Swal( {
                    title: "Espere por favor",
                    allowOutsideClick: false
                })
                Swal.showLoading()

                await this.deleteEntry(this.entry.id)
                this.$router.push({name: 'no-entry'})

                Swal.fire('Eliminado', '', 'success')
            }

        },
        ...mapActions('journal', ['updateEntry', 'createEntry', 'deleteEntry']),
        onSelectedImage( event ){
            const file = event.target.files[0]
            if(!file) {
                this.localImage = null
                this.file = null
                return
            }

            this.file = file

            const fr = new FileReader()
            fr.onload = () => this.localImage = fr.result
            fr.readAsDataURL( file )
            
        },
        onSelectImage(){
            this.$refs.imageSelector.click()
        }
    },

    created() {
        if(!this.entry) return this.$router.push({name: 'no-entry'})
    },

    watch: {
        id() {
            if(!this.entry) return this.$router.push({name: 'no-entry'})
        }
    }
    
}
</script>

<style lang="scss" scoped>

textarea {
    font-size: 20px;
    border: none;
    height: 80vh;

    &:focus {
        outline: none;
    }
}

img {
    width: 200px;
    position: fixed;
    bottom: 150px;
    right: 20px;
    box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}

</style>