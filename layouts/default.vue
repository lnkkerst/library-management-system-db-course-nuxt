<script setup lang="ts">
useHead({
  title: '图书管理系统 - 管理员'
});

const leftDrawOpen = ref(false);
const toggleLeftDrawOpen = useToggle(leftDrawOpen);

const menuList = [
  {
    icon: 'home',
    label: '主页',
    route: 'admin-index',
    separator: true
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
            icon="menu"
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
