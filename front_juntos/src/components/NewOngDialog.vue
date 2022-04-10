<template>
  <q-dialog
    :model-value="ModalNewOng.modal"
    @before-show="ShowModalNewOng"
    @before-hide="HideModalNewOng"
  >
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section class="row items-center q-pb-none">
        <div v-if="!ModalNewOng.data.id" class="text-h6">
          Cadastrar Nova Ong:
        </div>
        <div v-else class="text-h6">Editar Ong:</div>
        <q-space />
        <q-btn
          v-if="ModalNewOng.data.id"
          icon="delete"
          color="red"
          round
          dense
          v-close-popup
          @click="DeleteOng"
        />
      </q-card-section>
      <q-form
        autocorrect="off"
        autocapitalize="off"
        autocomplete="off"
        spellcheck="false"
        @submit.prevent="SaveOng"
      >
        <q-card-section class="q-pt-none">
          <div class="q-gutter-md">
            <q-input v-model="formData.razao_social" label="Razão Social" />
          </div>
          <div class="q-gutter-md">
            <q-input v-model="formData.cnpj" label="Cnpj:" />
          </div>
          <div class="q-gutter-md">
            <q-input v-model="formData.logradouro" label="Logradouro:" />
          </div>
          <div class="q-gutter-md">
            <q-input v-model="formData.cidade" label="Cidade:" />
          </div>
          <div class="q-gutter-md">
            <q-select
              v-model="formData.estado"
              label="Estado:"
              emit-value
              map-options
              :options="StatesUF"
            ></q-select>
          </div>
          <div class="q-gutter-md">
            <q-input
              v-model="formData.telefone"
              mask="########"
              label="Telefone:"
            >
              <template #before>
                <q-input
                  v-model="formData.ddd"
                  mask="##"
                  label="DDD:"
                  style="max-width: 50px"
                />
              </template>
            </q-input>
          </div>
          <div class="q-gutter-md">
            <q-input v-model="formData.email" label="E-mail:" />
          </div>
          <div class="q-gutter-md">
            <q-input v-model="formData.pix" label="Pix:" />
          </div>
          <div class="q-gutter-md">
            <q-input v-model="formData.agencia" mask="####" label="Agência:" />
          </div>
          <div class="q-gutter-md">
            <q-input v-model="formData.conta" mask="#####-#" label="Conta:" />
          </div>
          <div class="q-gutter-md">
            <q-input
              v-model="formData.tipo_trabalho"
              label="Tipo do trabalho:"
            />
          </div>
          <div class="q-gutter-md">
            <q-input
              v-model="formData.password"
              :type="showPassword ? 'text' : 'password'"
              label="Senha"
            >
              <template #after>
                <q-btn
                  flat
                  round
                  :icon="showPassword ? 'visibility' : 'visibility_off'"
                  @click="showPassword = !showPassword"
                ></q-btn>
              </template>
            </q-input>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn outline label="cancelar" color="red" v-close-popup />
          <q-btn label="Salvar ong" color="indigo-5" type="submit" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { Loading, Notify } from "quasar";

export default defineComponent({
  name: "NewOngDialog",
  setup() {
    const { dispatch, state, commit } = useStore();

    const formData = ref({});

    const showPassword = ref(false);

    const ModalNewOng = computed(() => state.OngStore.ModalNewOng);

    const StatesUF = computed(() => state.OngStore.statesUF);

    function HideModalNewOng() {
      formData.value = {};
      commit("OngStore/setModalNewOng", {
        modal: false,
        data: null,
      });
    }

    async function DeleteOng() {
      Loading.show();
      await dispatch("OngStore/ActionDeleteOng", {
        id: ModalNewOng.value.data.id,
      });
      Loading.hide();
    }

    async function ShowModalNewOng() {
      if (ModalNewOng.value.data.id) {
        Loading.show();
        const response = await dispatch("OngStore/ActionGetOng", {
          id: ModalNewOng.value.data.id,
        });
        formData.value = response;
        Loading.hide();
      }
    }

    async function SaveOng() {
      Loading.show();
      let MsgResponse = "";
      if (ModalNewOng.value.data.id) {
        const { msg } = await dispatch("OngStore/ActionPutOng", formData.value);
        MsgResponse = msg;
      } else {
        const { msg } = await dispatch(
          "OngStore/ActionPostOng",
          formData.value
        );
        MsgResponse = msg;
      }
      Notify.create(MsgResponse);
      Loading.hide();
    }

    return {
      DeleteOng,
      ShowModalNewOng,
      HideModalNewOng,
      SaveOng,
      StatesUF,
      formData,
      showPassword,
      ModalNewOng,
    };
  },
});
</script>