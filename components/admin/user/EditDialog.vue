<script setup lang="ts">
const props = defineProps<{
  userId: string
}>();
const emit = defineEmits(['update:modelValue']);

const quasar = useQuasar();

const userTypes = useUserTypes();
const form = ref<any>({
  name: '',
  password: undefined
});

if (process.client) {
  watch(
    () => props.userId,
    async val => {
      const user = await $fetch(`/api/admin/users/${val}`);
      form.value = { name: user.name, password: undefined };
    },
    { immediate: true }
  );
}

async function handleSubmit() {
  try {
    await $fetch(`/api/admin/users/${props.userId}`, {
      method: 'PUT',
      body: {
        name: form.value.name,
        password: form.value.password || undefined,
        userTypeId: form.value.userTypeId.id
      }
    });
    emit('update:modelValue', false);
    quasar.notify({
      message: '修改成功',
      type: 'positive'
    });
    useAdminUsersRefreshEvent().emit();
  }
  catch (_e) {
    quasar.notify({
      message: '修改失败',
      type: 'negative'
    });
  }
}
</script>

<template>
  <QDialog persistent>
    <QCard>
      <QCardSection>
        <div class="text-h6">修改用户信息</div>
        <div>
          <QForm>
            <QInput v-model="form.name" label="用户名"></QInput>
            <QSelect
              v-model="form.userTypeId"
              :options="userTypes.data.value ?? []"
              option-label="name"
              option-value="id"
              label="用户类型"
            ></QSelect>
            <QInput v-model="form.password" label="密码"></QInput>

            <div class="flex mt-sm">
              <QBtn
                type="submit"
                color="primary"
                label="确定"
                @click.prevent="handleSubmit()"
              ></QBtn>
              <div class="flex-grow"></div>
              <QBtn
                label="取消"
                @click="emit('update:modelValue', false)"
              ></QBtn>
            </div>
          </QForm>
        </div>
      </QCardSection>
    </QCard>
  </QDialog>
</template>

<style scoped></style>
