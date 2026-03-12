export const API_ROUTES = {
  PETS: {
    GET_PET: {
      URL: (id: number) => `/pets/${id}`,
      METHOD: 'GET',
    },
    GET_PETS: {
      URL: '/pets',
      METHOD: 'GET',
    },
    CREATE_PET: {
      URL: '/pets',
      METHOD: 'POST',
    },
    DELETE_PET: {
      URL: (id: number) => `/pets/${id}`,
      METHOD: 'DELETE',
    },
    UPDATE_PET: {
      URL: (id: number) => `/pets/${id}`,
      METHOD: 'PATCH',
    },
    ACTIVATE_PET: {
      URL: (id: number) => `/pets/${id}/activate`,
      METHOD: 'PATCH',
    },
  },
} as const;
