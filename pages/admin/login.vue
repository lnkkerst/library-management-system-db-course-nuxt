<script setup lang="ts">
definePageMeta({
  name: 'admin-login'
});

const formType = ref<'login' | 'register'>('login');
const toggleFormType = useToggle(formType);
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
            icon="add"
            class="absolute top-0 right-0 translate--1/2"
            @click="toggleFormType()"
          ></QFab>
        </QCardSection>

        <AdminLoginForm v-show="formType === 'login'"></AdminLoginForm>

        <AdminRegisterForm v-show="formType === 'register'"></AdminRegisterForm>
      </QCard>
    </QPage>
  </div>
</template>

<style scoped></style>
