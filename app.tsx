import {} from '#imports';
import { NuxtLayout, NuxtPage } from '#components';

export default defineComponent(() => {
  if (process.client) {
    Notify.setDefaults({
      position: 'bottom-right'
    });
  }
  return () => (
    <div>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  );
});
