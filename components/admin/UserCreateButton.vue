<script setup lang="ts">
const dialog = ref(false);
const toggleDialog = useToggle(dialog);
</script>

<template>
  <div>
    <QBtn color="primary" round icon="mdi-plus" @click="toggleDialog()"></QBtn>
    <AdminUserCreateDialog v-model="dialog"></AdminUserCreateDialog>
  </div>
</template>

<style scoped></style>
