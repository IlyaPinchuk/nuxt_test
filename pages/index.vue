<template>
  <div class="home-page">
    <div class="hero mb-6">
      <h1 class="hero__title"> Posts</h1>
    </div>
    <div v-if="error" class="error-message">
      <p class="error-text">{{ error }}</p>
      <button class="btn btn--primary" @click="refresh">Retry</button>
    </div>
    <div v-if="posts.length " class="posts-section">
      <div class="posts-grid">
        <PostCard
            v-for="post in posts"
            :key="post.id"
            :post="post"
        />
      </div>
      <LoadMore
          :has-more="hasMore"
          :loading="loading"
          @load-more="loadMore"
      />
    </div>
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading posts...</p>
    </div>
    <div v-if="!loading && !posts.length" class="empty-state">
      <p>No posts found.</p>
      <button class="btn btn--primary" @click="refresh">Refresh</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PostCard from "../components/PostCard.vue";
import LoadMore from "../components/LoadMore.vue";

const {posts, loading, error, hasMore, loadMore, refresh, fetchPosts, restoreState, restoreScrollPosition} = usePosts()

async function fetchData() {
  const hasSavedState = restoreState()
  if (!hasSavedState) {
    await fetchPosts({
      page: 1,
      limit: 10
    })
  }
  restoreScrollPosition()
}

fetchData()

useHead({
  title: 'Home - Blog',
  meta: [
    {name: 'description', content: 'Blog built with Nuxt 3, TypeScript, and SCSS'}
  ]
})
</script>

<style lang="scss" scoped>
.hero {
  text-align: center;
  padding: 3rem 0;

  &__title {
    font-size: 1.875rem;
    margin-bottom: 1rem;
    color: #1e293b;

    @media (min-width: 768px) {
      font-size: 3rem;
    }
  }
}

.posts-section {
  margin-top: 3rem;
}

.posts-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 3rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.error-message {
  text-align: center;
  padding: 3rem;
  margin-top: 2rem;
  background: rgba(220, 38, 127, 0.1);
  border: 1px solid rgba(220, 38, 127, 0.2);
  border-radius: 8px;

  .error-text {
    color: #dc2626;
    margin-bottom: 1rem;
    font-weight: 500;
  }
}

.loading-state {
  text-align: center;
  padding: 3rem;
  margin-top: 2rem;

  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #f3f4f6;
    border-top-color: #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
  }

  p {
    color: #64748b;
    font-size: 1.125rem;
  }
}

.empty-state {
  text-align: center;
  padding: 3rem;
  margin-top: 2rem;

  p {
    color: #64748b;
    margin-bottom: 1rem;
    font-size: 1.125rem;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
