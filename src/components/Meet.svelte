<script>
  import { onMount } from 'svelte'
  import { getUserProfile } from '../services/local'
  import { Rooms, Config } from '../models'
  import { appSlug } from '../../config'

  export let activeRoom

  let meetDiv
  let noJitsi

  onMount(async () => {
    const room = await Rooms.get(`${activeRoom}`)
    const { jitsiPassword } = await Config.get(`/`)

    if (room.noJitsi) {
      noJitsi = true
      return
    }
    function getMeetingOptions (roomId) {
      return {
        roomName: roomId,
        width: '100%',
        height: '80%',
        parentNode: meetDiv,
        configOverwrite: {
          startWithVideoMuted: true,
        },
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS: [
            'camera',
            'desktop',
            'fullscreen',
            'fodeviceselection',
            'profile',
            'settings',
            'videoquality',
            'filmstrip',
            'stats',
            'shortcuts',
            'tileview',
            'chat',
            'recording',
            'microphone',
            'hangup',
            'etherpad',
            'sharedvideo',
            'raisehand',
          ],
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
          SHOW_BRAND_WATERMARK: false,
        },
      }
    }

    const domain = 'meet.jit.si'
    const options = getMeetingOptions(`${appSlug}-${activeRoom}`)
    const userProfile = getUserProfile()

    setTimeout(() => {
      const meet = new JitsiMeetExternalAPI(domain, options)
      meet._frame.style.height = 'calc(100vh - 170px)'
      meet.executeCommand('displayName', userProfile.name)
      meet.executeCommand('avatarUrl', userProfile.picture)
      meet.on('participantRoleChanged', () => meet.executeCommand('password', jitsiPassword))
      meet.on('passwordRequired', () => meet.executeCommand('password', jitsiPassword))
    }, 500)
  })
</script>

<style>
  div {
    min-height: 100%;
  }
</style>

<div class="meet-container" bind:this={meetDiv}>
  {#if noJitsi}
    <p>
      Esta sala não possui video-conferência, se quiser se comunicar com outros
      integrantes, por favor escolha outra sala.
    </p>
  {/if}
</div>
