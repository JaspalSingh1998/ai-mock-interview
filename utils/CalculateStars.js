export const CalculateStars = (rating) => {
  const filledStars = Math.round((rating / 10) * 5);
  const emptyStars = 5 - filledStars;
  return { filledStars, emptyStars };
};
