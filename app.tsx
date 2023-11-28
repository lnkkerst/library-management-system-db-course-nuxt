import {} from '#imports';
import { NuxtLayout, NuxtPage } from '#components';

export default defineComponent(() => {
  return () => (
    <div>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  );
});
