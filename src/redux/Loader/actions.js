export const create = (user, pass, data) => ({
  type: "CREATE_FILE.REQUEST",
  payload: { user, pass, data }
});

export const load = (user, pass) => ({
  type: "LOAD_FILE.REQUEST",
  payload: { user, pass }
});
