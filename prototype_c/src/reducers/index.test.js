import rootReducers from './index.js'
import {createStore} from "redux";
import {addPerson, switchActivity} from "../actions/people"
import {updateItemCountInStorage} from "../actions/storage"

function createTestStore() {
  return createStore(rootReducers)
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
  const store = createTestStore();
  store.dispatch(addPerson("john_0", "John Doe"));

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

test("Person changed activity", () => {
  const store = createTestStore();
  store.dispatch(addPerson("john_0", "John Doe"));
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