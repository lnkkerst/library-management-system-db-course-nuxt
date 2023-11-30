<script setup lang="ts">
definePageMeta({
  name: 'reader-login',
  layout: 'reader'
});

const formType = ref<'login' | 'register'>('login');
function toggleFormType() {
  if (formType.value === 'login') {
    formType.value = 'register';
  }
  else {
    formType.value = 'login';
  }
}
</script>

<template>
  <div>
    <QPage class="h-full grid place-items-center">
      <QCard class="w-88 h-96">
        <QCardSection class="bg-secondary">
          <div class="text-center py-6 px-2">
            <span class="text-xl font-medium text-white">登录</span>
          </div>
        </QCardSection>
        <QCardSection>
          <QFab
            color="primary"
            icon="mdi-plus"
            class="absolute top-0 right-0 translate--1/2"
            @click="toggleFormType()"
          ></QFab>
        </QCardSection>

        <div class="px-xs">
          <ReaderLoginForm v-show="formType === 'login'"></ReaderLoginForm>

          <AdminRegisterForm
            v-show="formType === 'register'"
          ></AdminRegisterForm>
        </div>
      </QCard>
    </QPage>
  </div>
</template>

<style scoped></style>
