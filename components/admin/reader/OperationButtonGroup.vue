<script setup lang="ts">
const props = defineProps<{
  readerId: string
}>();

const quasar = useQuasar();

const modifyDialog = ref(false);

const toggleModifyDialog = useToggle(modifyDialog);

async function handleDelete() {
  quasar
    .dialog({
      title: '删除确认',
      message: '确认要删除吗？',
      cancel: true,
      persistent: true
    })
    .onOk(async () => {
      try {
        await $fetch(`/api/admin/readers/${props.readerId}`, {
          method: 'DELETE'
        });
        quasar.notify({
          message: '删除成功',
          type: 'positive'
        });
        useAdminReadersRefreshEvent().emit();
      }
      catch (_e) {
        quasar.notify({
          message: '删除失败',
          type: 'negative'
        });
      }
    });
}
</script>

<template>
  <div class="flex">
    <!-- <QBtn color="secondary" round flat icon="mdi-eye"></QBtn> -->
    <QBtn
      color="primary"
      round
      flat
      icon="mdi-account-edit"
      @click="toggleModifyDialog()"
    ></QBtn>
    <QBtn
      color="red"
      round
      flat
      icon="mdi-delete"
      @click="handleDelete()"
    ></QBtn>

    <AdminReaderEditDialog
      v-model="modifyDialog"
      :reader-id="props.readerId"
    ></AdminReaderEditDialog>
  </div>
</template>

<style scoped></style>
