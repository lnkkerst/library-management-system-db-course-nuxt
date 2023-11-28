export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref<string>();

    return { token };
  },
  { persist: true }
);
