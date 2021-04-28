<script>
  import Room from '../components/Room.svelte'
  import InputText from '../components/InputText.svelte'
  import { Rooms } from '../models'

  let allRooms = []
  let filteredRooms
  let loading = true

  export let activeRoom
  export let pinnedRooms
  export let filters = {
    name: '',
  }

  const filterRooms = (rooms, filters) => rooms
    .filter((room) => {
      if (filters.name === '') {
        return true
      }

      const nameRegex = new RegExp(filters.name, 'i')

      if (nameRegex.test(room.name)) {
        return true
      }

      if (room.users) {
        const usersInRoom = Object.values(room.users)
          .map(user => user.name.toLowerCase())

        const filterMatch = usersInRoom.some(user => nameRegex.test(user))

        if (filterMatch) {
          return true
        }
      }

      return false
    })

    function sortRoomsByUsers (rooms) {
      return rooms.sort((baseRoom, nextRoom) => {
        const baseRoomUsers = baseRoom.users || {}
        const nextRoomUsers = nextRoom.users || {}

        const baseRoomLengh = Object.keys(baseRoomUsers).length
        const nextRoomLengh = Object.keys(nextRoomUsers).length

        return nextRoomLengh - baseRoomLengh
      })
    }

    Rooms.watch(
    '/',
    true,
    (remoteRooms) => {
      allRooms = sortRoomsByUsers(remoteRooms)
      loading = false
    }
  )

  $: {
    const globalyPinnedRooms = allRooms
      .filter(({ globalyPinnedRoom }) => !!globalyPinnedRoom)

    const localPinnedRooms = allRooms.filter(({
      id,
      globalyPinnedRoom,
    }) => pinnedRooms[id] && !globalyPinnedRoom)

    const notPinnedRooms = allRooms.filter(({
      id,
      globalyPinnedRoom,
    }) => !pinnedRooms[id] && !globalyPinnedRoom)

    filteredRooms = filterRooms([
      ...globalyPinnedRooms,
      ...localPinnedRooms,
      ...notPinnedRooms,
    ], filters)
  }
</script>

<div>
  {#if loading}
    <p>loading...</p>
  {:else}
    <InputText
      bind:value={filters.name}
      classes='filter-input'
      label='Filtrar salas'
      isField={false}
    />
    {#each filteredRooms as room}
      <Room
        name={room.name}
        users={room.users || {}}
        active={activeRoom === room.id}
        pinnedRoom={!!pinnedRooms[room.id]}
        id={room.id}
        globalyPinnedRoom={room.globalyPinnedRoom}
      />
    {/each}
  {/if}
</div>
