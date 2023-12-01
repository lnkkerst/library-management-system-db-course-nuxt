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
      user.value = res.user;
      token.value = res.accessToken;
      useCookie('userAccessToken').value = token.value;
    }

    async function logout() {
      user.value = undefined;
      token.value = undefined;
      useCookie('userAccessToken').value = token.value;
    }

    return { token, login, user, logout };
  },
  {
    persist: true
  }
);
