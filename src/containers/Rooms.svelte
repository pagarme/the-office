<script>
	import Room from '../components/Room.svelte'
	import {
		Rooms,
	} from '../models'

	let allRooms = []
	let filteredRooms
	let loading = true

	export let activeRoom
	export let activeRoomName
	export let pinnedRooms
	export let filters = {
		name: ''
	}

	const filterRooms = (rooms, filters) => rooms
		.filter(room => filters.name === '' || room.name.includes(filters.name))

	Rooms.watch(
		'/',
		true,
		remoteRooms => {
			allRooms = remoteRooms
			loading = false
		}
	)

	$: {
		const globalyPinnedRooms = allRooms
		  .filter(({ globalyPinnedRoom }) => !!globalyPinnedRoom)

		const localPinnedRooms = allRooms
			.filter(({ id, globalyPinnedRoom }) => pinnedRooms[id] && !globalyPinnedRoom)

		const notPinnedRooms = allRooms
			.filter(({ id, globalyPinnedRoom }) => !pinnedRooms[id] && !globalyPinnedRoom)

		filteredRooms = filterRooms([
			...globalyPinnedRooms,
			...localPinnedRooms,
			...notPinnedRooms,
		], filters)
	}
</script>

<style>
  .filter-input {
    margin-bottom: 15px;
    max-width: 97.6%;
  }
</style>

<div>
	{#if loading}
		<p>loading...</p>
	{:else}
		<input
			class='nes-input filter-input'
			placeholder='Filtrar salas'
			type='text'
			bind:value="{filters.name}"
		>
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
