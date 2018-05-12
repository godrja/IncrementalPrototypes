export function getCurrentActivityOf(personId, activities) {
  return activities.find( (activity) => activity.personId === personId );
}

export function person(person) {
  return { currentActivity: getCurrentActivityOf.bind(this, person.id) }
}

export default class Game {

}