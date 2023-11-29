export function useAdminUsersRefreshEvent() {
  return useEventBus('admin:users:refresh');
}
