import { useUpdate } from 'ahooks';
import { createShareModel } from '@/services/createShareModel';

function useStackService() {
  const update = useUpdate();

  return {
    update,
  };
}

export default createShareModel(useStackService);
