function fetchCategories(inventory) {
  const categories = inventory?.reduce((acc, next) => {
    const currentCategories = next.categories.split(",");
    currentCategories.map((category) => {
      if (acc.includes(category)) return;
      acc.push(category);
    });
    return acc;
  }, []);
  return categories;
}

export default fetchCategories;
