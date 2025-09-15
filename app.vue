<template>
  <div id="app">
      <header class="header">
        <div class="container">
          <NuxtLink class="header__logo" to="/">
            <h1>Blog</h1>
          </NuxtLink>
          <nav class="header__nav">
            <NuxtLink class="header__link" to="/">
              Home
            </NuxtLink>
          </nav>
        </div>
      </header>
      <main class="main">
        <div class="container">
          <NuxtPage/>
        </div>
      </main>

      <footer class="footer">
        <div class="container text-center">
          <p class="text-muted">
            JSONPlaceholder API
          </p>
        </div>
      </footer>
  </div>
</template>

<style scoped lang="scss">
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: white;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  &__logo {
    text-decoration: none;
    color: #1e293b;

    h1 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 700;
      color: #3b82f6;
    }

    &:hover {
      text-decoration: none;
    }
  }

  &__nav {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  &__link {
    color: #64748b;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: #3b82f6;
      text-decoration: none;
    }

    &.router-link-active {
      color: #3b82f6;
      font-weight: 600;
    }
  }
}

.main {
  flex: 1;
  padding: 3rem 0;
}

.footer {
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
  padding: 2rem 0;
  margin-top: auto;
}
</style>
