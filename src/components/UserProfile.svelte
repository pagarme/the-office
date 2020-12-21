<script>
  export let user
</script>

<style>
  img {
    border: 1px solid gray;
    margin: 5px;
  }

  div {
    display: inline-block;
  }

  div .tooltiptext {
    visibility: hidden;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    margin-top: -135px;
    margin-left: -5px;
    padding: 3px;
  }

  div:hover .tooltiptext {
    visibility: visible;
  }
  .gorro {
    position: absolute;
    top: -32px;
    left: -14px;
    border: 0;
  }
  .user-profile-container {
    position: relative;
  }
</style>

<div class="user-profile-container">
  <img
    src="https://user-images.githubusercontent.com/8251208/71283705-b8e2bb00-233f-11ea-8549-f327b5c05d26.png"
    class="gorro"
    alt="gorrinho"
  />
  <img
    class="nes-avatar is-rounded is-large"
    src={user.picture}
    alt={user.name}
    style="image-rendering: pixelated;"
  />
  <p class="nes-text is-primary tooltiptext nes-balloon from-left nes-pointer">{user.name}</p>
</div>
