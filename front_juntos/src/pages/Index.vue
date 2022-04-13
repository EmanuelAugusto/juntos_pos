<template>
  <q-page class="q-pa-md row">
    <div class="col-md-12 q-gutter-sm q-ml-sm q-mb-md">
      <q-btn
        label="Nova ONG"
        color="indigo-5"
        icon="add"
        @click="openModalNewOng()"
      ></q-btn>
      <q-btn
        label="Atualizar"
        color="indigo-5"
        icon="update"
        @click="GetOngs"
      ></q-btn>
    </div>
    <transition
      v-if="!loading"
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div class="col-md-12 flex justify-center">
        <!-- Wrapping only one DOM element, defined by QBtn -->

        <q-card
          v-for="(on, key) in ongs"
          :key="key"
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
            <div class="q-mt-none">
              {{ GetState(on.estado) }} - {{ on.cidade }}
            </div>
          </q-card-section>

          <q-card-actions>
            <q-btn
              color="indigo-5"
              class="full-width"
              @click="openModalNewOng(on.codigo)"
              >Detalhes</q-btn
            >
          </q-card-actions>
        </q-card>
      </div>
    </transition>
    <div v-if="loading" class="col-md-12 flex justify-center">
      <q-spinner-oval color="indigo-5" size="4em" />
    </div>
    <NewOngDialog />
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { computed } from "vue";
import NewOngDialog from "../components/NewOngDialog.vue";
import { Loading, Notify } from "quasar";

export default defineComponent({
  name: "PageIndex",
  components: {
    NewOngDialog,
  },
  setup() {
    const { dispatch, state, commit } = useStore();

    const loading = ref(true);

    const StatesUF = computed(() => state.OngStore.statesUF);

    async function GetOngs() {
      try {
        loading.value = true;
        await dispatch("OngStore/ActionGetOngs");
        loading.value = false;
      } catch (error) {
        Notify.create("Erro ao recuperar ONG's");
        loading.value = false;
        return error;
      }
    }

    function openModalNewOng(id = null) {
      commit("OngStore/setModalNewOng", {
        modal: true,
        data: {
          id,
        },
      });
    }

    function GetState(estado) {
      const { label } = StatesUF.value.find((sF) => sF.value === estado);
      return label;
    }

    GetOngs();

    return {
      GetOngs,
      loading,
      GetState,
      openModalNewOng,
      ongs: computed(() => state.OngStore.ongs),
    };
  },
});
</script>
