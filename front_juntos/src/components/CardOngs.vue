<template>
  <q-card
    style="min-width: 500px; max-height: 200px"
    flat
    bordered
    class="q-ma-sm col-auto text-dark"
  >
    <q-card-section>
      <div class="text-h6">Razão social: {{ on.razao_social }}</div>
      <div class="text-subtitle2">Cnpj: {{ on.cnpj }}</div>
    </q-card-section>
    <q-card-section>
      <div class="q-mt-none">{{ GetState(on.estado) }} - {{ on.cidade }}</div>
    </q-card-section>

    <q-card-actions>
      <q-btn
        color="indigo-5"
        class="full-width"
        @click="$emit('detailEvent', on)"
        >Detalhes</q-btn
      >
    </q-card-actions>
  </q-card>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "CardOngs",
  props: {
    on: Object,
  },
  setup() {
    const { state } = useStore();

    const StatesUF = computed(() => state.OngStore.statesUF);

    function GetState(estado) {
      const { label } = StatesUF.value.find((sF) => sF.value === estado);
      return label;
    }

    return {
      GetState,
    };
  },
});
</script>

<style>
</style>