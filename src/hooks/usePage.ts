import { useSafeState } from 'ahooks';

export default function usePage() {
  const [page, setPage] = useSafeState(1);
}
