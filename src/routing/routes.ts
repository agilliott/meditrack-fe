export const PATH_TRACKER = 'tracker';
export const PATH_ANALYSE = 'analyse';
export const PATH_MEDICATION = 'medication';
export const PATH_PROFILE = 'profile';
export const PATH_LOGIN = 'login';
export const PATH_HOME = 'home';
export const PATH_ADD = 'add';
export const PATH_EDIT = 'edit';
export const PATH_ADD_MEDICATION = `${PATH_MEDICATION}/${PATH_ADD}`;
export const PATH_EDIT_MEDICATION = `${PATH_MEDICATION}/${PATH_EDIT}/:medicationId`;

export const getEditMedicationLink = (id: string | number) => {
  return `${PATH_EDIT}/${id}`;
};

export const routeKeyMap: { [key: string]: number } = {
  [PATH_TRACKER]: 0,
  [PATH_ANALYSE]: 1,
  [PATH_MEDICATION]: 2,
  [PATH_PROFILE]: 3,
};
