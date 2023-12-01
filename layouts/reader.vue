<script setup lang="ts">
useHead({
  title: '图书借阅系统'
});

const leftDrawOpen = ref(false);
const toggleLeftDrawOpen = useToggle(leftDrawOpen);

const menuList = [
  {
    icon: 'mdi-home',
    label: '主页',
    route: 'reader-index',
    separator: true
  },
  {
    icon: 'mdi-book',
    label: '图书借阅',
    route: 'reader-booking',
    separator: false
  },
  {
    icon: 'mdi-book-check',
    label: '图书归还',
    route: 'reader-bookReturn',
    separator: true
  },
  {
    icon: 'mdi-account',
    label: '信息维护',
    route: 'reader-profile',
    separator: true
  },
  {
    icon: 'mdi-exit-to-app',
    label: '去管理端',
    route: 'admin-index',
    separator: false
  }
];
</script>

<template>
  <div>
    <QLayout view="hHh LpR fFf">
      <QHeader elevated class="bg-primary text-white">
        <QToolbar>
          <QBtn
            dense
            flat
            round
            icon="mdi-menu"
            @click="toggleLeftDrawOpen()"
          ></QBtn>

          <QToolbarTitle>图书借阅系统</QToolbarTitle>

          <ToolbarUserButton type="reader"></ToolbarUserButton>
        </QToolbar>
      </QHeader>

      <QDrawer v-model="leftDrawOpen" show-if-above side="left" bordered>
        <QScrollArea class="fit">
          <QList>
            <template v-for="menuItem in menuList" :key="menuItem.label">
              <NuxtLink :to="{ name: menuItem.route }">
                <QItem
                  v-ripple
                  clickable
                  :active="$route.name === menuItem.route"
                >
                  <QItemSection avatar>
                    <q-icon :name="menuItem.icon" />
                  </QItemSection>
                  <QItemSection>
                    {{ menuItem.label }}
                  </QItemSection>
                </QItem>
                <QSeparator
                  v-if="menuItem.separator"
                  :key="`sep-${menuItem.label}`"
                />
              </NuxtLink>
            </template>
          </QList>
        </QScrollArea>
      </QDrawer>

      <QPageContainer>
        <slot />
      </QPageContainer>
    </QLayout>
  </div>
</template>

<style lang="scss" scoped></style>
