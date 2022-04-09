<template>
  <q-page class="q-pa-md">
    <div class="col-md-8 q-gutter-sm q-ml-sm">
      <q-btn label="Nova ONG" icon="add" @click="openModalNewOng()"></q-btn>
      <q-btn label="Atualizar" icon="update" @click="GetOngs"></q-btn>
    </div>
    <div class="col-md-8">
      <q-card
        v-for="(on, key) in ongs"
        :key="key"
        class="q-ma-sm bg-blue-grey-1 text-dark"
      >
        <q-card-section>
          <div class="text-h6">Razão social: {{ on.razao_social }}</div>
          <div class="text-subtitle2">Cnpj: {{ on.cnpj }}</div>
        </q-card-section>

        <q-card-actions>
          <q-btn flat class="full-width" @click="openModalNewOng(on.codigo)"
            >Detalhes</q-btn
          >
        </q-card-actions>
      </q-card>
    </div>
    <NewOngDialog />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
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

    async function GetOngs() {
      try {
        Loading.show();
        await dispatch("OngStore/ActionGetOngs");
        Loading.hide();
      } catch (error) {
        Notify.create("Erro ao recuperar ONG's");
        Loading.hide();
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

    GetOngs();

    return {
      GetOngs,
      openModalNewOng,
      ongs: computed(() => state.OngStore.ongs),
    };
  },
});
</script>
