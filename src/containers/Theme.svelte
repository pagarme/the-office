<script>
  import { themeStore } from '../services/store'
  import { getTheme } from '../services/local'

  let darkMode
  let carnivalMode

  themeStore.update(() => getTheme())

  themeStore.subscribe((value) => {
    darkMode = value === 'dark'
    carnivalMode = value === 'carnival'
  })
</script>

<svelte:head>
  {#if darkMode}
    <link rel="stylesheet" href="themes/dark-theme.css">
  {/if}
  {#if carnivalMode}
    <link rel="stylesheet" href="themes/carnival-theme.css">
  {/if}
</svelte:head>
