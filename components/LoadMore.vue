<template>
  <div class="load-more">
    <button
        v-if="hasMore && !loading"
        :disabled="loading"
        class="btn btn--secondary load-more__button"
        @click="$emit('load-more')"
    >
      Load More Posts
    </button>

    <div v-else-if="loading" class="loading load-more__loading">
      <span class="load-more__spinner"></span>
      Loading more posts...
    </div>

    <p v-else-if="!hasMore" class="load-more__end text-muted text-center">
      No more posts to load
    </p>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  loading?: boolean
  hasMore?: boolean
}

defineProps<Props>()

defineEmits<{
  'load-more': []
}>()
</script>
<style lang="scss" scoped>
.load-more {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;

  &__button {
    min-width: 200px;
  }

  &__loading {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    & .load-more__spinner {
      width: 20px;
      height: 20px;
      border: 2px solid #e2e8f0;
      border-top-color: #3b82f6;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
  }

  &__end {
    font-style: italic;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
