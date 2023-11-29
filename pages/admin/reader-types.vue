<script setup lang="ts">
definePageMeta({
  name: 'admin-readerTypes'
});

const quasar = useQuasar();

const readerTypes = useReaderTypes();

async function handleClick(readerTypeId: string) {
  try {
    await $fetch(`/api/admin/reader-types/${readerTypeId}`, {
      method: 'DELETE'
    });
    quasar.notify({
      message: '删除成功',
      type: 'positive'
    });
    readerTypes.refresh();
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
      title: '添加读者种类',
      message: '请输入读者种类名称',
      prompt: {
        model: '',
        type: 'text'
      },
      cancel: true,

      persistent: true
    })
    .onOk(async data => {
      try {
        await $fetch(`/api/admin/reader-types`, {
          method: 'POST',
          body: {
            name: data
          }
        });
        quasar.notify({
          message: '添加成功',
          type: 'positive'
        });
        readerTypes.refresh();
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
              v-for="readerType in readerTypes.data.value"
              :key="readerType.id"
            >
              <QBtnDropdown split color="primary" :label="readerType.name">
                <QList>
                  <QItem
                    v-close-popup
                    clickable
                    @click="handleClick(readerType.id)"
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
      </QCard>
    </QPage>
  </div>
</template>

<style scoped></style>
