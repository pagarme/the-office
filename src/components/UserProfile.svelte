<script>
  import hats from '../resources/hats'

  export let user

  $: avatar = {
    hat: user.avatar
      && user.avatar.hat
      && hats[user.avatar.hat],
  }
</script>

<style>
  img {
    image-rendering: pixelated;
  }

  img.avatar {
    border: 1px solid gray;
    margin: 5px;
  }

  img.hat {
    position: absolute;
    top: -55%;
    left: -50%;
    height: 200%;
    width: 200%;
    z-index: 1;
    pointer-events: none;
  }

  div {
    display: inline-block;
    position: relative;
  }

  div .tooltiptext {
    visibility: hidden;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 2;
    padding: 3px;
    bottom: 0;
    left: 10px;
  }

  div:hover .tooltiptext {
    visibility: visible;
  }
</style>

<div style="{avatar.hat && 'margin-top: 15px'}">
  <img
    class="nes-avatar is-rounded is-large avatar"
    src={user.picture}
    alt={user.name}
  />
  {#if avatar.hat && avatar.hat.url}
    <img
      class="hat"
      src={avatar.hat.url} alt={avatar.hat.title}
    />
  {/if}
  <p class="nes-text is-primary tooltiptext nes-balloon from-left nes-pointer">{user.name}</p>
</div>
