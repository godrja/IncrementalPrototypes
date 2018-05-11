export function getCurrentJobOf(personId, jobs) {
  return jobs.find((job) =>
    job.peopleIds.includes(personId));
}

export function person(person) {
  return {
    currentJob: getCurrentJobOf.bind(this, person.id)
  }
}