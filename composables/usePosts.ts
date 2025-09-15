import { ref, readonly } from 'vue'
import type { Post, PostsQuery } from '~/types/api'

const POSTS_STORAGE_KEY = 'nuxt-blog-posts'
const SCROLL_STORAGE_KEY = 'nuxt-blog-scroll'

export const usePosts = () => {
  const posts = ref<Post[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const hasMore = ref(true)
  const currentPage = ref(1)
  

  const saveState = () => {
    if (process.client) {
      try {
        const state = {
          posts: posts.value,
          currentPage: currentPage.value,
          hasMore: hasMore.value
        }
        sessionStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(state))
      } catch (e) {
        console.warn('Failed to save posts state:', e)
      }
    }
  }

  const restoreState = () => {
    if (process.client) {
      try {
        const saved = sessionStorage.getItem(POSTS_STORAGE_KEY)
        if (saved) {
          const state = JSON.parse(saved)
          posts.value = state.posts || []
          currentPage.value = state.currentPage || 1
          hasMore.value = state.hasMore ?? true
          return true
        }
      } catch (e) {
        console.warn('Failed to restore posts state:', e)
      }
    }
    return false
  }

  const saveScrollPosition = () => {
    if (process.client) {
      try {
        sessionStorage.setItem(SCROLL_STORAGE_KEY, window.scrollY.toString())
      } catch (e) {
        console.warn('Failed to save scroll position:', e)
      }
    }
  }
  const restoreScrollPosition = () => {
    if (process.client) {
      try {
        const saved = sessionStorage.getItem(SCROLL_STORAGE_KEY)
        if (saved) {
          setTimeout(() => {
            window.scrollTo(0, parseInt(saved))
            sessionStorage.removeItem(SCROLL_STORAGE_KEY)
          }, 100)
        }
      } catch (e) {
        console.warn('Failed to restore scroll position:', e)
      }
    }
  }

  const initializePosts = (initialPosts: Post[], page: number = 1) => {
    posts.value = initialPosts
    currentPage.value = page
    hasMore.value = initialPosts.length === 10
    loading.value = false
    error.value = null
    saveState()
  }

  const fetchPosts = async (query: PostsQuery = {}) => {
    loading.value = true
    error.value = null
    
    try {
      const page = query.page || 1
      const limit = query.limit || 10
      const queryParams = new URLSearchParams({
        _page: page.toString(),
        _limit: limit.toString(),
        ...(query.userId && { userId: query.userId.toString() })
      })
      
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?${queryParams}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const fetchedPosts = await response.json() as Post[]
      
      console.log(`Fetched ${fetchedPosts.length} posts for page ${page}`)

      const totalPosts = 100
      const hasMorePosts = (page * limit) < totalPosts
      
      if (page === 1) {
        posts.value = fetchedPosts
      } else {
        posts.value.push(...fetchedPosts)
      }
      
      currentPage.value = page
      hasMore.value = hasMorePosts && fetchedPosts.length > 0
      saveState()
      
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch posts'
      console.error('Error fetching posts:', err)
    } finally {
      loading.value = false
    }
  }
  const loadMore = async () => {
    if (hasMore.value && !loading.value) {
      await fetchPosts({ page: currentPage.value + 1 })
    }
  }

  const refresh = async () => {
    currentPage.value = 1
    hasMore.value = true
    await fetchPosts({ page: 1 })
  }
  
  return {
    posts: readonly(posts),
    loading: readonly(loading),
    error: readonly(error),
    hasMore: readonly(hasMore),
    currentPage: readonly(currentPage),
    fetchPosts,
    loadMore,
    refresh,
    initializePosts,
    saveState,
    restoreState,
    saveScrollPosition,
    restoreScrollPosition
  }
}
