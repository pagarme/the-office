const noneHat = { title: 'n/a' }

const amongUsHats = Array.from({ length: 123 }).map((_, index) => {
  const id = index + 1
  return {
    title: `among us - ${id}`,
    url: `images/hats/among-us/${id}.png`,
  }
})

export default [noneHat, ...amongUsHats]
