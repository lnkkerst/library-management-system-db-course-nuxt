<script setup lang="ts">
useHead({
  title: '图书管理系统 - 管理员'
});

const leftDrawOpen = ref(false);
const toggleLeftDrawOpen = useToggle(leftDrawOpen);

const menuList = [
  {
    icon: 'mdi-home',
    label: '主页',
    route: 'admin-index',
    separator: true
  },
  {
    icon: 'mdi-account-tag',
    label: '用户类别管理',
    route: 'admin-userTypes',
    separator: false
  },
  {
    icon: 'mdi-account',
    label: '用户管理',
    route: 'admin-users',
    separator: true
  },
  {
    icon: 'mdi-book-heart',
    label: '图书种类管理',
    route: 'admin-bookTypes',
    separator: false
  },
  {
    icon: 'mdi-book-edit',
    label: '图书管理',
    route: 'admin-books',
    separator: true
  },
  {
    icon: 'mdi-credit-card',
    label: '读者类别管理',
    route: 'admin-readerTypes',
    separator: false
  }
];
</script>

<template>
  <div>
    <QLayout>
      <QHeader elevated class="bg-primary text-white">
        <QToolbar>
          <QBtn
            dense
            flat
            round
            icon="mdi-menu"
            @click="toggleLeftDrawOpen()"
          ></QBtn>

          <QToolbarTitle>图书管理系统 - 管理员</QToolbarTitle>
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
