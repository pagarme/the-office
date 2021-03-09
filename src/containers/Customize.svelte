<script>
  import { themeStore } from '../services/store'
  import { getUserProfile, setTheme, setUserProfile } from '../services/local'
  import { Rooms, Users } from '../models'

  import hats from '../resources/hats'

  import Container from '../components/Container.svelte'
  import UserProfile from '../components/UserProfile.svelte'
  import Button from '../components/Button.svelte'

  let selectedTheme
  let isDark = ''
  let selectedAvatarHat
  let user = getUserProfile()

  selectedAvatarHat = user.avatar ? user.avatar.hat : null

  themeStore.subscribe((value) => {
    selectedTheme = value
    isDark = value === 'dark' ? 'is-dark' : ''
  })

  function updateTheme ({ target }) {
    const { value: name } = target
    setTheme(name)
    return themeStore.update(() => name)
  }

  function updateAvatarHat (value) {
    const userProfile = getUserProfile()

    return Users.get(userProfile.id)
      .then((user) => {
        setUserProfile({
          ...userProfile,
          avatar: {
            ...userProfile.avatar,
            hat: value,
          },
        })

        if (user.activeRoom) {
          return Promise.all([
            Rooms.update(`${user.activeRoom}/users/${userProfile.id}`, { avatar: { hat: value } }),
            Users.update(userProfile.id, { avatar: { hat: value } }),
          ])
        }

        return Users.update(userProfile.id, { avatar: { hat: value } })
      })
      .then(() => {
        user = getUserProfile()
      })
  }

  function previewAvatarHat ({ target }) {
    const { value } = target
    user = {
      ...user,
      avatar: {
        ...user.avatar,
        hat: value,
      },
    }

    return user
  }

  function changeAvatar ({ target }) {
    const formData = new FormData(target)

    const data = {}
    for (const [key, value] of formData.entries()) {
      data[key] = value
    }

    const avatarHatValue = data.avatar_hat_select

    if (avatarHatValue) {
      updateAvatarHat(avatarHatValue)
    }
  }
</script>

<Container>
  <p class="title">escolher tema</p>
  <div class={`nes-select ${isDark}`}>
    <select required id="dark_select" value={selectedTheme} on:change={updateTheme}>
      <option value="white">claro</option>
      <option value="dark">escuro</option>
    </select>
  </div>
</Container>
<Container>
  <p class="title">avatar</p>
  {#each hats as hat, index}
    <label>
      <input type="radio" class="nes-radio" name="hat" />
      <span>
        <UserProfile user={previewAvatarHat({ target: { value: index }})}/>
      </span>
    </label>
  {/each}
  <form action="#" on:submit|preventDefault={changeAvatar}>
    <label for="avatar_hat_select">chapéu</label>
    <div class={`nes-select ${isDark}`}>
      <select required id="avatar_hat_select" name="avatar_hat_select" value={selectedAvatarHat} on:change={previewAvatarHat}>
        {#each hats as hat, index}
          <option value={index.toString()}>{hat.title}</option>
        {/each}
      </select>
    </div>
    <br />
    <Button submit>confirmar</Button>
  </form>
</Container>