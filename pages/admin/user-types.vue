<script setup lang="ts">
definePageMeta({
  name: 'admin-userTypes'
});

const quasar = useQuasar();

const userTypes = useUserTypes();

async function handleClick(userTypeId: string) {
  try {
    await $fetch(`/api/admin/user-types/${userTypeId}`, { method: 'DELETE' });
    quasar.notify({
      message: '删除成功',
      type: 'positive'
    });
    userTypes.refresh();
  }
  catch (_e) {
    quasar.notify({
      message: '删除失败',
      type: 'negative'
    });
  }
}

async function handleAdd() {
  quasar
    .dialog({
      title: '添加用户种类',
      message: '请输入用户种类名称',
      prompt: {
        model: '',
        type: 'text'
      },
      cancel: true,

      persistent: true
    })
    .onOk(async data => {
      try {
        await $fetch(`/api/admin/user-types`, {
          method: 'POST',
          body: {
            name: data
          }
        });
        quasar.notify({
          message: '添加成功',
          type: 'positive'
        });
        userTypes.refresh();
      }
      catch (_e) {
        quasar.notify({
          message: '添加失败',
          type: 'negative'
        });
      }
    });
}
</script>

<template>
  <div>
    <QPage padding>
      <QCard>
        <QCardSection>
          <div class="flex gap-4">
            <template
              v-for="userType in userTypes.data.value"
              :key="userType.id"
            >
              <QBtnDropdown split color="primary" :label="userType.name">
                <QList>
                  <QItem
                    v-close-popup
                    clickable
                    @click="handleClick(userType.id)"
                  >
                    <QItemSection>
                      <QItemLabel>删除</QItemLabel>
                    </QItemSection>
                  </QItem>
                </QList>
              </QBtnDropdown>
            </template>
            <QBtn
              round
              icon="mdi-plus"
              color="secondary"
              @click="handleAdd()"
            ></QBtn>
          </div>
        </QCardSection>

        <QInnerLoading :showing="userTypes.pending.value"></QInnerLoading>
      </QCard>
    </QPage>
  </div>
</template>

<style scoped></style>
