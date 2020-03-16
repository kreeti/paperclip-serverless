module.exports = throwError = error => {
  if (error instanceof Error) throw error;
  throw new Error(error);
};
