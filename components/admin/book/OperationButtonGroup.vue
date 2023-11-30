<script setup lang="ts">
const props = defineProps<{
  bookId: string
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
        await $fetch(`/api/admin/books/${props.bookId}`, {
          method: 'DELETE'
        });
        quasar.notify({
          message: '删除成功',
          type: 'positive'
        });
        useAdminBooksRefreshEvent().emit();
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

    <AdminBookEditDialog
      v-model="modifyDialog"
      :book-id="props.bookId"
    ></AdminBookEditDialog>
  </div>
</template>

<style scoped></style>
