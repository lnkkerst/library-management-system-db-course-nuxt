import { ofetch } from 'ofetch';

export default defineNuxtPlugin(_nuxtApp => {
  globalThis.$fetch = ofetch.create({
    onRequest() {},
    onResponseError({ response }) {
      if (process.client) {
        if (response.status === 401) {
          Notify.create({
            message: '请先登录',
            type: 'warning',
            position: 'bottom-right'
          });
          const router = useRouter();
          if (router.currentRoute.value.name?.toString().startsWith('admin')) {
            useRouter().push({ name: 'admin-login' });
          }
          else {
            useRouter().push({ name: 'reader-login' });
          }
        }
      }
    }
  });
});
