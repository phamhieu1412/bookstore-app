import { createSelector } from 'reselect';

const getCollections = state => state?.layouts?.layout;

const makeGetCollections = () => {
  return createSelector(
    [getCollections],
    collections => {
      return collections;
    }
  );
};

export default makeGetCollections;
