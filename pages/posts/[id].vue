<template>
  <div class="post-detail">
    <div v-if="error" class="error-message">
      <h2>Error Loading Post</h2>
      <p class="error-text">{{ error }}</p>
      <div class="error-actions">
        <button class="btn btn--secondary" @click="() => router.go(-1)">Go Back</button>
        <button class="btn btn--primary" @click="fetchPostWithComments()">Retry</button>
      </div>
    </div>

    <div v-else-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading post...</p>
    </div>

    <article v-else-if="post" class="post-content">
      <nav class="breadcrumb mb-6">
        <NuxtLink class="breadcrumb__link" to="/">Home</NuxtLink>
        <span class="breadcrumb__separator"> > </span>
        <span class="breadcrumb__current">Post #{{ post.id }}</span>
      </nav>

      <header class="post-header">
        <h1 class="post-header__title">{{ post.title }}</h1>
        <div class="post-header__meta">
          <span class="meta-item">
            <strong>Author:</strong> User #{{ post.userId }}
          </span>
          <span class="meta-item">
            <strong>Post ID:</strong> #{{ post.id }}
          </span>
        </div>
      </header>

      <div class="post-body">
        <p>{{ post.body }}</p>
      </div>

      <section class="comments-section">
        <h2 class="comments-section__title">
          Comments ({{ comments.length }})
        </h2>

        <div v-if="comments.length > 0" class="comments-list">
          <div
              v-for="comment in comments"
              :key="comment.id"
              class="comment-item card"
          >
            <div class="comment-header">
              <h3 class="comment-author">{{ comment.name }}</h3>
              <span class="comment-email text-muted">{{ comment.email }}</span>
            </div>
            <p class="comment-body">{{ comment.body }}</p>
          </div>
        </div>

        <div v-else class="no-comments">
          <p class="text-muted">No comments yet.</p>
        </div>
      </section>

      <nav class="post-navigation">
        <button class="btn btn--secondary" @click="() => router.go(-1)">
          ← Back to Posts
        </button>
      </nav>
    </article>

    <div v-else class="not-found">
      <h2>Post Not Found</h2>
      <p>The post you're looking for doesn't exist.</p>
      <NuxtLink class="btn btn--primary" to="/">Back to Home</NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const router = useRouter()
const postId = Number(route.params.id)
const {fetchPostWithComments, post, comments, postError} = usePost(postId)
const error = ref<string | null>(null)
const loading = ref(false)

await fetchPostWithComments(postId)

onMounted(() => {
  if (postError.value) {
    error.value = postError.value?.message || 'Failed to fetch data'
  }
})

const pageTitle = computed(() => {
  if (post.value) {
    return `${post.value.title} - Blog`
  }
  return 'Post - Blog'
})

const pageDescription = computed(() => {
  if (post.value) {
    const excerpt = post.value.body.length > 140
        ? post.value.body.substring(0, 140)
        : post.value.body
    return excerpt
  }
  return 'empty'
})

useHead({
  title: pageTitle,
  meta: [
    {name: 'description', content: pageDescription},
    {property: 'og:title', content: pageTitle},
    {property: 'og:description', content: pageDescription},
    {property: 'og:type', content: 'article'},
  ]
})
</script>

<style scoped lang="scss">
.post-detail {
  max-width: 800px;
  margin: 0 auto;
}

.breadcrumb {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: #64748B;

  &__link {
    color: #3B82F6;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  &__separator {
    margin: 0 0.5rem;
    color: #E2E8F0;
  }

  &__current {
    color: #64748B;
  }
}

.post-header {
  margin-bottom: 3rem;

  &__title {
    font-size: 1.875rem;
    margin-bottom: 1rem;
    line-height: 1.2;

    @media (min-width: 768px) {
      font-size: 2.5rem;
    }
  }

  &__meta {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    font-size: 0.875rem;
    color: #64748B;

    .meta-item {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
  }
}

.post-body {
  font-size: 1.125rem;
  line-height: 1.8;
  margin-bottom: 3rem;

  p {
    margin-bottom: 1.5rem;
  }
}

.comments-section {
  border-top: 1px solid #E2E8F0;
  padding-top: 3rem;
  margin-top: 3rem;

  &__title {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    color: #1E293B;
  }

  .comments-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    .comment-item {
      &:hover {
        transform: none;
      }

      .comment-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 0.5rem;
        flex-wrap: wrap;
        gap: 0.25rem;

        .comment-author {
          font-size: 1.125rem;
          font-weight: 600;
          margin: 0;
          color: #1E293B;
        }

        .comment-email {
          font-size: 0.875rem;
          font-style: italic;
        }
      }

      .comment-body {
        line-height: 1.6;
        margin: 0;
      }
    }
  }

  .no-comments {
    text-align: center;
    padding: 2rem 0;

    p {
      color: #64748B;
    }
  }
}

.post-navigation {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #E2E8F0;
}

.error-message {
  text-align: center;
  padding: 3rem;
  margin-top: 2rem;
  background: rgba(220, 38, 127, 0.1);
  border: 1px solid rgba(220, 38, 127, 0.2);
  border-radius: 8px;

  h2 {
    color: #dc2626;
    margin-bottom: 1rem;
  }

  .error-text {
    color: #dc2626;
    margin-bottom: 1.5rem;
    font-weight: 500;
  }

  .error-actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
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
    border-top-color: #3B82F6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
  }

  p {
    color: #64748B;
    font-size: 1.125rem;
  }
}

.not-found {
  text-align: center;
  padding: 3rem;
  margin-top: 2rem;

  h2 {
    color: #1E293B;
    margin-bottom: 1rem;
  }

  p {
    color: #64748B;
    margin-bottom: 1.5rem;
    font-size: 1.125rem;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
