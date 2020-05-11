<template>
  <div class="container">
    <div class="pantalla">
      <p class="font-weight-bold" style="color:white; font-size:20px">
        Pantalla
      </p>
    </div>

    <div class="asientos">
      <div class="row">
        <div
          class="col asiento"
          v-for="asiento in asientos"
          :key="asiento.id"
          v-text="asiento.id"
          @click="seleccionarAsiento(asiento.id)"
          v-bind:class="{
            disponible: asiento.disp,
            pointer: !asiento.adqui,
            ocupado: !asiento.disp,
          }"
        ></div>
      </div>
    </div>

    <div class="botones" style="margin-top:5rem">
      <b-button :disabled="contador == 0" variant="success" @click="guardar()"
        >Guardar</b-button
      >
      <b-button
        :disabled="contador == 0"
        variant="danger"
        style="margin-left:2rem"
        @click="cancelar()"
        >Cancelar</b-button
      >
      <br />
      <b-button style="margin:2rem" @click="reset()">Reset</b-button>
    </div>
    <div>
      <p>asientos seleccionados: {{ contador }}</p>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  created() {
    //metodo que se ejecuta al inicio del render
    this.id = firebase
      .database()
      .ref("/users")
      .push().key;

    firebase
      .database()
      .ref("salas")
      .child("1")
      .on("value", (snapshot) => {
        //once para leer una sola vez
        //on para leer constantemente
        this.cargarElemento(snapshot.val());
      });
  },
  data() {
    return {
      id: "",
      asientos: [],
      contador: 0,
    };
  },
  methods: {
    actualizarElementos() {
      firebase
        .database()
        .ref("salas")
        .child("1") // = /salas/1
        .set(this.asientos);
    },
    seleccionarAsiento(id) {
      this.asientos.forEach((asiento) => {
        if (asiento.id == id) {
          if (
            asiento.adqui ||
            (asiento.user_id != null && asiento.user_id != this.id)
          ) {
            return console.log("no se puede adquirir " + asiento.id);
          }
          asiento.disp = !asiento.disp;
          asiento.user_id = this.id;

          this.actualizarElementos();
          this.contador = this.asientosSeleccionados().length;
        }
      });
    },

    asientosSeleccionados() {
      return this.asientos.filter((a) => !a.adqui && !a.disp);
    },

    cargarElemento(data) {
      this.asientos = data;
    },
    guardar() {
      this.asientos.forEach((asiento) => {
        if (asiento.disp == asiento.adqui) {
          asiento.adqui = !asiento.adqui;
          this.contador = 0;
        }
      });
      this.$notify({
        group: "foo",
        title: "Importante",
        text: "Se han Guardado",
      });
      this.actualizarElementos();
    },
    cancelar() {
      this.asientosSeleccionados().forEach((asiento) => {
        asiento.user_id = null;
        asiento.disp = true;
      });
      this.actualizarElementos();
      this.contador = 0;
    },
    reset() {
      this.asientos.forEach((asiento) => {
        asiento.disp = true;
        asiento.adqui = false;
        asiento.user_id = null;
      });
      this.$notify({
        group: "foo",
        type: "warn",
        title: "Importante",
        text: "Se han Reseteado todos los asientos",
      });
      this.contador = 0;
      this.actualizarElementos();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pantalla {
  background-color: darkcyan;
}
.asientos {
  margin-top: 5rem;
}
.asiento {
  color: white;
  margin: 4px;
}
.pointer {
  cursor: pointer;
}
.disponible {
  background-color: dodgerblue;
}
.ocupado {
  background-color: firebrick;
}
</style>
