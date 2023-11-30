<script setup lang="ts">
const props = defineProps<{ type: 'user' | 'reader' }>();

const router = useRouter();
const quasar = useQuasar();
const userStore = useUserStore();
const readerStore = useReaderStore();

const name = computed(() => {
  if (props.type === 'user') {
    return userStore.user?.name;
  }
  else {
    return readerStore.reader?.name;
  }
});

const logout = computed(() => {
  if (props.type === 'user') {
    return userStore.logout;
  }
  else {
    return readerStore.logout;
  }
});

async function handleLogout() {
  try {
    await logout.value();
    quasar.notify({
      message: '注销成功',
      type: 'negative'
    });
    router.push({
      name: `${props.type === 'user' ? 'admin' : 'reader'}-login`
    });
  }
  catch (_e) {
    quasar.notify({
      message: '注销失败',
      type: 'negative'
    });
  }
}

async function handleLogin() {
  router.push({
    name: `${props.type === 'user' ? 'admin' : 'reader'}-login`
  });
}
</script>

<template>
  <div>
    <QBtn flat round :icon="name ? 'mdi-account-check' : 'mdi-account-alert'">
      <QMenu>
        <QList>
          <QItem>
            <QItemSection>
              <QItemLabel v-if="name">当前登录用户：{{ name }}</QItemLabel>
              <QItemLabel v-else>未登录</QItemLabel>
            </QItemSection>
          </QItem>
          <QItem v-if="name" clickable color="red" @click="handleLogout()">
            <QItemSection>
              <QItemLabel>注销</QItemLabel>
            </QItemSection>
          </QItem>
          <QItem v-else clickable color="red" @click="handleLogin()">
            <QItemSection>
              <QItemLabel>登录</QItemLabel>
            </QItemSection>
          </QItem>
        </QList>
      </QMenu>
    </QBtn>
  </div>
</template>

<style scoped></style>
