import rootReducers from './index.js'
import {createStore} from "redux";
import {addPerson, switchActivity} from "../actions/people"
import {updateItemCountInStorage} from "../actions/storage"

const withJohnDoe = (store) => { store.dispatch(addPerson("john_0", "John Doe")) };
function createTestStore(...fns) {
  const store = createStore(rootReducers);
  fns.forEach((fn) => fn(store));
  return store
}

test('Correct initial state', () => {
  expect(createTestStore().getState()).toEqual(
    {
      "tick": 0,
      "people": {
        "profiles": [],
        "activities": {}
      },
      "storage": {byId: {}, allIds: []}
    }
  );
});

test("One person added", () => {
  const store = createTestStore(withJohnDoe);

  expect(store.getState()).toEqual(
    {
      "tick": 0,
      "people": {
        "profiles": [
          {
            id: "john_0",
            name: "John Doe"
          }
        ],
        "activities": {
          "john_0": {type: "idle"}
        }
      },
      "storage": {byId: {}, allIds: []}
    })
});

test("Change person's activity", () => {
  const store = createTestStore(withJohnDoe);
  store.dispatch(switchActivity("john_0", "gathering"));

  expect(store.getState()).toEqual(
    {
      "tick": 0,
      "people": {
        "profiles": [
          {
            id: "john_0",
            name: "John Doe"
          }
        ],
        "activities": {
          "john_0": {type: "gathering"}
        }
      },
      "storage": {byId: {}, allIds: []}
    })
});

test("Add a first item into the storage", () => {
  const store = createTestStore();
  store.dispatch(updateItemCountInStorage("branch", 1));

  expect(store.getState().storage).toEqual({
    byId: {
      "branch": {id: "branch", count: 1}
    },
    allIds: ["branch"]
  });
});

test("Add more items of a type into the storage", () => {
  const store = createTestStore();
  store.dispatch(updateItemCountInStorage("branch", 1));
  store.dispatch(updateItemCountInStorage("branch", 2));

  expect(store.getState().storage).toEqual({
    byId: {
      "branch": {id: "branch", count: 3}
    },
    allIds: ["branch"]
  });
});

test("Change activity to gathering and return to idle after 1000 ticks", () => {
  const store = createTestStore(withJohnDoe);

  //TODO: Test and implement that.
});