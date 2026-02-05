export const createGrid = (rows, cols) => {
  return Array.from(
    { length: rows },
    () => Array.from({ length: cols }, () => ""),
  );
};
