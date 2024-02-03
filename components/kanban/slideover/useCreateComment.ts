import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { v4 as uuidv4 } from 'uuid';
import { COLLECTION_COMMENTS, DB_ID } from '~/app.constants';
import { useDealSlideStore } from '~/store/deal-slide.store';

export function useCreateComment({ refetch }: { refetch: () => void }) {
  const queryClient = useQueryClient();
  const store = useDealSlideStore();
  const commentRef = ref<string>();

  const { mutate } = useMutation({
    mutationKey: ['add comment', commentRef.value],
    mutationFn: () =>
      DB.createDocument(DB_ID, COLLECTION_COMMENTS, uuidv4(), {
        text: commentRef.value,
        deal: store.card?.id,
      }),
    onSuccess: () => {
      refetch();
      commentRef.value = '';
    },
  });

  const writeComment = () => {
    if (!commentRef.value) return;
    console.log(111);
    mutate();
    console.log(222);
  };

  return {
    writeComment,
    commentRef,
  };
}
