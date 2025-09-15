<template>
  <div class="post-card card">
    <h3 class="post-card__title">
      <NuxtLink :to="`/posts/${post.id}`" class="post-card__link" @click="handleClick">
        {{ post.title }}
      </NuxtLink>
    </h3>

    <p class="post-card__excerpt">
      {{ excerpt }}
    </p>

    <div class="post-card__meta">
      <span class="post-card__author text-muted">
        User #{{ post.userId }}
      </span>
      <span class="post-card__divider">•</span>
      <span class="post-card__id text-muted">
        Post #{{ post.id }}
      </span>
    </div>

    <NuxtLink :to="`/posts/${post.id}`" class="btn btn--primary post-card__read-more" @click="handleClick">
      Read More
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '~/types/api'

interface Props {
  post: Post
  excerptLength?: number
}

const props = withDefaults(defineProps<Props>(), {
  excerptLength: 150
})

const excerpt = computed(() => {
  if (props.post.body.length <= props.excerptLength) {
    return props.post.body
  }
  return props.post.body.substring(0, props.excerptLength).trim() + '...'
})

const handleClick = () => {
  const { saveScrollPosition } = usePosts()
  saveScrollPosition()
}
</script>

<style scoped lang="scss">
.post-card {
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &__title {
    margin-bottom: 0.5rem;
  }

  &__link {
    color: #1e293b;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      color: #3b82f6;
      text-decoration: none;
    }
  }

  &__excerpt {
    color: #64748b;
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }

  &__meta {
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    margin-bottom: 1.5rem;
  }

  &__divider {
    margin: 0 0.5rem;
    color: #e2e8f0;
  }

  &__read-more {
    margin-top: auto;
  }
}
</style>
