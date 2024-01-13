export const formatDate = (isoStr?: string) => {
  if (!isoStr) return;
  const dateObj = new Date(isoStr);
  const date = new Intl.DateTimeFormat("en-in", { dateStyle: "short" }).format(
    dateObj
  );
  return date;
};
