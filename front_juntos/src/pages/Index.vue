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
        @click="GetOngs()"
      ></q-btn>
    </div>
    <transition
      v-if="!loading"
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div class="col-md-12 flex justify-center">
        <CardOngs
          v-for="(on, key) in ongs"
          :key="key"
          :on="on"
          @detail-event="openModalNewOng"
        />
      </div>
    </transition>
    <div v-if="loading" class="col-md-12 flex justify-center">
      <Loading />
    </div>
    <NewOngDialog />
  </q-page>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import { Notify } from "quasar";
import NewOngDialog from "../components/NewOngDialog.vue";
import CardOngs from "../components/CardOngs.vue";
import Loading from "../components/Loading.vue";

export default defineComponent({
  name: "PageIndex",
  components: {
    NewOngDialog,
    CardOngs,
    Loading,
  },
  setup() {
    const { dispatch, state, commit } = useStore();

    const loading = ref(true);

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

    function openModalNewOng(ong) {
      const id = ong?.codigo || null;

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
      loading,
      ongs: computed(() => state.OngStore.ongs),
    };
  },
});
</script>
