<script setup lang="ts">
const dialog = ref(false);
const toggleDialog = useToggle(dialog);
</script>

<template>
  <div>
    <QBtn color="primary" round icon="mdi-plus" @click="toggleDialog()"></QBtn>
    <AdminBookCreateDialog v-model="dialog"></AdminBookCreateDialog>
  </div>
</template>

<style scoped></style>
