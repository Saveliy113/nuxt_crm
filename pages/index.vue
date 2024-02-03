<script setup lang="ts">
import type { ICard, IColumn } from '~/components/kanban/kanban.types';
import { useKanbanQuery } from '~/components/kanban/useKanbanQuery';
import dayjs from 'dayjs';
import { useMutation } from '@tanstack/vue-query';
import type { EnumStatus } from '~/types/deals.types';
import { COLLECTION_DEALS, DB_ID } from '~/app.constants';
import { generateColumnStyle } from '@/components/kanban/generate-gradient';
import { useDealSlideStore } from '~/store/deal-slide.store';

useSeoMeta({
  title: 'Home | Nuxt CRM-System',
});

const dragCard = ref<ICard | null>(null);
const sourceColumnRef = ref<IColumn | null>(null);
const { data, isLoading, refetch } = useKanbanQuery();
const store = useDealSlideStore();

type TypeMutationVariables = {
  docId: string;
  status?: EnumStatus;
};

const { mutate } = useMutation({
  mutationKey: ['moveCard'],
  mutationFn: ({ docId, status }: TypeMutationVariables) =>
    DB.updateDocument(DB_ID, COLLECTION_DEALS, docId, {
      status,
    }),
  onSuccess() {
    refetch();
  },
});

function handleDragStart(card: ICard, column: IColumn) {
  dragCard.value = card;
  sourceColumnRef.value = column;
}

function handleDragOver(event: DragEvent) {
  event.preventDefault();
}

function handleDrop(targetColumn: IColumn) {
  if (dragCard.value && sourceColumnRef.value) {
    mutate({ docId: dragCard.value.id, status: targetColumn.id });
  }
}
</script>

<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">Nuxt CRM System</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div class="grid grid-cols-5 gap-16">
        <div
          class="min-h-screen"
          v-for="(column, index) in data"
          :key="column.id"
          @dragover="handleDragOver"
          @drop="() => handleDrop(column)"
        >
          <div
            class="rounded bg-slate-700 py-1 px-5 mb-2 text-center"
            :style="generateColumnStyle(index, data?.length)"
          >
            {{ column.name }}
          </div>
          <div>
            <KanbanCreateDeal :refetch="refetch" :status="column.id" />
            <CnCard
              v-for="card in column.items"
              :key="card.id"
              class="mb-5"
              draggable="true"
              @dragstart="() => handleDragStart(card, column)"
            >
              <CnCardHeader role="button" @click="store.set(card)">
                <CnCardTitle>
                  {{ card.name }}
                </CnCardTitle>
                <CnCardDescription class="mt-2 block">
                  {{ convertCurrency(card.price) }}
                </CnCardDescription>
              </CnCardHeader>
              <CnCardContent class="text-xs"
                ><div>Компания</div>
                {{ card.companyName }}</CnCardContent
              >
              <CnCardFooter>{{
                dayjs(card.$createdAt).format('DD MMMM YYYY')
              }}</CnCardFooter>
            </CnCard>
          </div>
        </div>
      </div>
      <KanbanSlideover />
    </div>
  </div>
</template>

<style scoped></style>
