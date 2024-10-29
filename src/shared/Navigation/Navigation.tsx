import NavigationItem from "./NavigationItem";
import { NAV_LINKS } from "../../data/navigation";
import useCategory from "../../hooks/useCategory";
import { useEffect } from "react";

function Navigation() {
  const { categories, error } = useCategory();

  useEffect(() => {
    const modifiedCategories =
      categories && categories.length > 0
        ? categories?.map((c) => ({
            id: c.category_id,
            name: c.cat_name,
            href: undefined,
          }))
        : [];
    NAV_LINKS[1].children = modifiedCategories;
  }, [categories]);

  return (
    <ul className="nc-Navigation flex items-center">
      {NAV_LINKS.map((item) => (
        <NavigationItem key={item.id} menuItem={item} />
      ))}
    </ul>
  );
}

export default Navigation;
