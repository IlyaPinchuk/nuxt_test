
import { ref, readonly, watch, unref, type MaybeRef } from 'vue'
import type { Post, Comment } from '../types/api'

export const usePost = (postId: MaybeRef<number>) => {
  const post = ref<Post | null>(null)
  const comments = ref<Comment[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchPost = async (id?: number) => {
    const targetId = id || unref(postId)
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${targetId}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const fetchedPost = await response.json() as Post
      
      console.log('Fetched post with ID:', targetId)
      post.value = fetchedPost
      
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch post'
      console.error('Error fetching post:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchComments = async (id?: number) => {
    const targetId = id || unref(postId)
    
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${targetId}/comments`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const fetchedComments = await response.json() as Comment[]
      
      console.log('Fetched comments for post ID:', targetId)
      comments.value = fetchedComments
      
    } catch (err) {
      console.error('Error fetching comments:', err)
    }
  }

  const fetchPostWithComments = async (id?: number) => {
    await Promise.all([
      fetchPost(id),
      fetchComments(id)
    ])
  }

  watch(() => unref(postId), (newId) => {
    if (newId) {
      fetchPostWithComments(newId)
    }
  }, { immediate: true })
  
  return {
    post: readonly(post),
    comments: readonly(comments),
    loading: readonly(loading),
    postError: readonly(error),
    fetchPost,
    fetchComments,
    fetchPostWithComments
  }
}
