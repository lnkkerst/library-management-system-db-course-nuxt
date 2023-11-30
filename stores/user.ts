export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref<string>();
    const user = ref();

    async function login({
      username,
      password
    }: {
      username: string
      password: string
    }) {
      const res = await $fetch('/api/admin/login', {
        method: 'POST',
        body: { username, password }
      });
      document.cookie = '';
      user.value = res.user;
      token.value = res.accessToken;
      useCookie('userAccessToken').value = token.value;
    }

    return { token, login, user };
  },
  {
    persist: process.client
      ? {
          storage: localStorage
        }
      : false
  }
);
