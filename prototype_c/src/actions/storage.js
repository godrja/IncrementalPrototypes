export const UPDATE_ITEM_COUNT = 'STORAGE_UPDATE_ITEM_COUNT';

export const updateItemCountInStorage = (itemId, count = 1) =>
  ({ type: UPDATE_ITEM_COUNT, payload: { itemId, count }});