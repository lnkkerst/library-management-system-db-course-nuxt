export function useAdminUsersRefreshEvent() {
  return useEventBus('admin:users:refresh');
}

export function useAdminReadersRefreshEvent() {
  return useEventBus('admin:readers:refresh');
}

export function useAdminBooksRefreshEvent() {
  return useEventBus('admin:books:refresh');
}

export function useReaderBookReturnRefreshEvent() {
  return useEventBus('reader:book-return:refresh');
}
