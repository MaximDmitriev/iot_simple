export const reportReducer = (state, { type, payload }) => {
  switch (type) {
  case 'fetchRequest':
    return { ...state, loaded: false };
  case 'fetchSuccess':
    return { loaded: true, metadata: payload.metadata, data: payload.data, type: payload.metadata.type, error: null };
  case 'fetchFailure':
    return { ...state, error: payload.error, loaded: true };
  }
};
