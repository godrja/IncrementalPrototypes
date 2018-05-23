function getAllItemsInNaturalOrder(state) {
  return state.allIds.map((id) => state.byId[id])
}

function indexed(slice) {
  const dataSet = () => getAllItemsInNaturalOrder(slice);
  return {
    map: fn => dataSet().map(fn),
    find: fn => dataSet().find(fn),
    filter: fn => dataSet().filter(fn),
    findById: id => slice.byId[id],
  }
}

export default function gameState(state) {
  const {people} = state;
  return {
    getPeople: () => ({
      ...indexed(people),
      findByName: name => getAllItemsInNaturalOrder(people).find(p => p.name === name),
    })
  }
}