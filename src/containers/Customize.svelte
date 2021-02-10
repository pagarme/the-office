<script>
  import { themeStore } from '../services/store'
  import { setTheme } from '../services/local'
  import Container from '../components/Container.svelte'

  let selectedTheme
  let isDark = ''

  themeStore.subscribe((value) => {
    selectedTheme = value
    isDark = value === 'dark' ? 'is-dark' : ''
  })

  function updateTheme ({ target }) {
    const { value: name } = target
    setTheme(name)
    return themeStore.update(() => name)
  }
</script>

<Container>
  <p class="title">escolher tema</p>
  <div class={`nes-select ${isDark}`}>
    <select required id="dark_select" value={selectedTheme} on:change={updateTheme}>
      <option value="white">claro</option>
      <option value="dark">escuro</option>
      <option value="carnival">carnaval</option>
    </select>
  </div>
</Container>