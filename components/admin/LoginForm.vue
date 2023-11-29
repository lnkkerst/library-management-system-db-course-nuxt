<script setup lang="ts">
const quasar = useQuasar();
const userStore = useUserStore();
const router = useRouter();

const form = ref({
  username: '',
  password: ''
});
const passwordType = ref<'password' | 'text'>('password');
const loading = ref(false);

function togglePasswordType() {
  if (passwordType.value === 'password') {
    passwordType.value = 'text';
  }
  else {
    passwordType.value = 'password';
  }
}

async function handleLogin() {
  loading.value = true;
  try {
    await userStore.login(form.value);
    quasar.notify({
      message: '登录成功',
      type: 'positive'
    });
    router.push({ name: 'admin-index' });
  }
  catch (_e) {
    const e = _e as any;
    if (e.status === 500) {
      quasar.notify({ message: '登录失败：未知错误', type: 'negative' });
    }
    else {
      quasar.notify({ message: '用户名或密码不正确', type: 'negative' });
    }
  }
  finally {
    loading.value = false;
  }
}
</script>

<template>
  <div>
    <QForm class="px-sm">
      <QInput
        v-model="form.username"
        label="用户名"
        type="text"
        clearable
        :rules="[]"
      >
        <template #prepend>
          <q-icon name="mdi-account" />
        </template>
      </QInput>

      <QInput
        v-model="form.password"
        label="密码"
        :type="passwordType"
        clearable
        :rules="[]"
      >
        <template #prepend>
          <q-icon name="mdi-lock" />
        </template>
        <template #append>
          <q-icon
            :name="passwordType === 'password' ? 'mdi-eye' : 'mdi-eye-off'"
            class="cursor-pointer"
            @click="togglePasswordType()"
          />
        </template>
      </QInput>

      <QBtn
        color="primary"
        class="w-full text-white mt-lg"
        label="登录"
        type="submit"
        :loading="loading"
        @click.prevent="handleLogin"
      ></QBtn>
    </QForm>
  </div>
</template>

<style scoped></style>
