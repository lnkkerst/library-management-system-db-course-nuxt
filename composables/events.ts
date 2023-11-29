export function useAdminUsersRefreshEvent() {
  return useEventBus('admin:users:refresh');
}

export function useAdminReadersRefreshEvent() {
  return useEventBus('admin:readers:refresh');
}
