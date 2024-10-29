import Heading from "../../components/Heading/Heading";
import ProductCard from "../../components/ProductCard";
import { Product } from "../../models/product";
import { ProductTab } from "../../models/productTab";
import Nav from "../../shared/Nav/Nav";
import NavItem from "../../shared/NavItem/NavItem";

interface Props {
  heading: string;
  rightDescText: string;
  productTabs: ProductTab[];
  onTabClick: (tab: ProductTab) => void;
}

const ProductTabs = ({
  productTabs,
  heading,
  rightDescText,
  onTabClick,
}: Props) => {
  const handleLike = () => {
    console.log("Liked");
  };

  const selectedTab = productTabs.find((t) => t.selected);

  return (
    <section className="container mb-40">
      <Heading
        fontClass="text-2xl md:text-4xl font-bold text-[#b58c69]"
        className="mb-10"
        rightDescText={rightDescText}
      >
        {heading}
      </Heading>
      <Nav
        className="sm:space-x-2"
        containerClassName="relative flex w-full overflow-x-auto text-sm md:text-base hiddenScrollbar"
      >
        {productTabs.map((item) => (
          <NavItem
            key={item.id}
            isActive={item.selected}
            onClick={() => onTabClick(item)}
          >
            {item.tabname}
          </NavItem>
        ))}
      </Nav>
      {/* <hr className="my-8" /> */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-10">
        {!selectedTab && <p>No items found!</p>}
        {selectedTab &&
          selectedTab.products?.slice(0, 4)?.map((product: Product) => {
            const updatedProduct = {
              ...product,
              isLiked: false,
            };
            return (
              <ProductCard
                key={updatedProduct.product_id}
                data={updatedProduct}
                isLiked={updatedProduct.isLiked}
                onLike={() => handleLike()}
              />
            );
          })}
      </div>
    </section>
  );
};

export default ProductTabs;
