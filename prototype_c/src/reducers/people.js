const spawnPeople = () => ( { name: 'Fyodor Ignatyevitch' } );
const defaultPeople = [ spawnPeople() ];

export default (state = defaultPeople, action) => {
    switch (action.type) {
        default:
            return state;
    }
}
