export const formatPrice = (num) => {
  const newNumber = Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
  }).format(num / 100);
  return newNumber;
};

export const getUniqueValues = (data, type) => {
  let unique = data.map((val) => val[type]);
  if (type === "colors") {
    unique = unique.flat();
  }
  return ["all", ...new Set(unique)];
};
