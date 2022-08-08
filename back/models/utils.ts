/* eslint-disable no-underscore-dangle */
/** Переименование _id в id в полученной из базы записи. */
export const renameStorageId = (_, entity) => {
  entity.id = entity._id;
  delete entity._id;

  return entity;
};
