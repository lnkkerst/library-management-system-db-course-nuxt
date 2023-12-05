<script setup lang="ts">
definePageMeta({
  name: 'admin-users'
});

const userTypes = useUserTypes();
const page = ref(1);
const size = ref(20);
const sizeOptions = ref(
  Array.from({ length: 5 }, (_, index) => 20 * (index + 1))
);
const form = ref<any>({
  name: '',
  userTypeId: undefined
});
const { data, refresh, pending } = await useFetch('/api/admin/users', {
  query: refDebounced(
    computed(() => ({
      offset: (page.value - 1) * size.value,
      limit: size.value,
      name: form.value.name,
      userTypeId: form.value.userTypeId?.id
    })),
    1000
  ),
  lazy: false
});
const totalCount = ref(data.value?.totalCount ?? 0);
const maxPage = computed(() => {
  return Math.floor((totalCount.value + size.value - 1) / size.value);
});
const expanded = ref(false);
const toggleExpanded = useToggle(expanded);

watch(
  () => data.value,
  val => {
    totalCount.value = val?.totalCount ?? 0;
  }
);

useAdminUsersRefreshEvent().on(() => refresh());
</script>

<template>
  <div>
    <QPage padding>
      <QCard>
        <QCardSection>
          <div class="flex">
            <QBtn
              icon="mdi-filter"
              color="primary"
              outline
              label="筛选"
              @click="toggleExpanded()"
            ></QBtn>

            <div class="flex-grow"></div>

            <AdminUserCreateButton></AdminUserCreateButton>

            <QBtn
              class="ml-sm"
              color="secondary"
              round
              icon="mdi-refresh"
              @click="refresh()"
            ></QBtn>
          </div>

          <QExpansionItem v-model="expanded" class="expansion-collapse">
            <div class="mt-sm">
              <QForm>
                <div class="grid grid-cols-2 gap-2">
                  <QInput
                    v-model="form.name"
                    type="text"
                    label="用户名"
                  ></QInput>
                  <QSelect
                    v-model="form.userTypeId"
                    :options="
                      [{ name: '全部' }].concat(userTypes.data.value ?? [])
                    "
                    option-label="name"
                    option-value="id"
                    label="用户类型"
                  ></QSelect>
                </div>
              </QForm>
            </div>
          </QExpansionItem>
        </QCardSection>
      </QCard>

      <QMarkupTable class="mt-sm" separator="cell" wrap-cells>
        <thead>
          <tr>
            <th>用户名</th>
            <th>用户类型</th>
            <th>权限</th>
            <th>操作</th>
          </tr>
        </thead>

        <tbody>
          <template v-for="user in data?.data" :key="user.id">
            <tr>
              <td>{{ user.name }}</td>
              <td>{{ userTypes.idMap.value[user.userTypeId] }}</td>
              <td>{{ user.permission }}</td>
              <td class="w-30">
                <AdminUserOperationButtonGroup
                  :user-id="user.id"
                ></AdminUserOperationButtonGroup>
              </td>
            </tr>
          </template>
        </tbody>

        <QInnerLoading :showing="pending">
          <QSpinnerGears size="50px" color="primary" />
        </QInnerLoading>
      </QMarkupTable>

      <div class="flex px-2 py-1 items-center gap-2">
        <div class="flex-grow"></div>

        <div class="flex items-center gap-1">
          <span>共 {{ totalCount }} 条数据，每页显示</span>
          <QSelect
            v-model="size"
            :options="sizeOptions"
            dense
            borderless
          ></QSelect>
          <span>条</span>
        </div>
        <QPagination v-model="page" input :max="maxPage"></QPagination>
      </div>
    </QPage>
  </div>
</template>

<style lang="scss"></style>
