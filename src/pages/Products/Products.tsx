import ProductCard from "../../components/ProductCard";
import SidebarFilters, { Filters } from "../../containers/SidebarFilters";
import { FC, useEffect, useState } from "react";
import EmailSubscribeSection from "../../shared/EmailSubscribeSection/EmailSubscribeSection";
import Chip from "./Chip/Chip";
import productService from "../../services/product-service";
import { Product } from "../../models/product";
import { CanceledError } from "axios";
import { hideLoader, showLoader } from "../../features/loader/loaderSlice";
import { SortOrder } from "../../models/sort-order";
import sortProductsService from "../../services/sort-products-service";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "../../features/wishlist/wishlistSlice";
import { useLocation, useNavigate } from "react-router-dom";
import subcategoryService from "../../services/subcategory-service";
import { type SubCategory } from "../../models/subCategory";
import filterProductsService from "../../services/filter-products-service";
import useNatProducts from "../../hooks/useNatProducts";
import { TabFilterItem } from "../../components/AppFilterTabs/AppFilterTabs";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import Pagination from "../../shared/Pagination/Pagination";

interface Props {
  className?: string;
}

const DATA_sortOrderRadios = [
  { name: "Most Popular", id: "most-popular", value: "popular" },
  { name: "Best Rating", id: "best-rating", value: "rating" },
  { name: "Newest", id: "newest", value: "newest" },
  { name: "Price Low - High", id: "price-low-high", value: "price_low_high" },
  { name: "Price High - Low", id: "price-high-low", value: "price_high_low" },
];

const Products: FC<Props> = ({ className = "" }) => {
  const [showFilters, setShowFilters] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const { natProducts } = useNatProducts();
  const [productForms, setProductForms] = useState<TabFilterItem[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<SubCategory | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [selectedSortOrder, setSelectedSortOrder] = useState<SortOrder>();
  const [selectedFilter, setSelectedFilter] = useState<Filters>({
    nat_of_prod: [],
    herb_type: false,
    is_nutraceutical: false,
    pres_req: false,
    sortBy: "",
  });
  const [close, setClose] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();
  const customer = useAppSelector((state) => state.auth);
  const categoryId = queryParams.get("category_id"); // Extracts category_id (1)
  const category = queryParams.get("category");
  const natProductId = queryParams.get("nat_prod_id");
  const natProduct = queryParams.get("nat_product");
  const itemsPerPage = 9;

  const getSubCategories = (id: string) => {
    const { request } = subcategoryService.getAll<
      SubCategory,
      { category_id: string }
    >({
      category_id: id,
    });

    dispatch(showLoader());

    request
      .then((res) => {
        dispatch(hideLoader());
        setSubCategories(res.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;

        dispatch(hideLoader());
      });
  };

  const getProductsByCategory = (id: string) => {
    dispatch(showLoader());

    const { request } = productService.getAll<Product, { category_id: string }>(
      { category_id: id }
    );

    request
      .then((res) => {
        dispatch(hideLoader());
        setProducts(res.data);
      })
      .catch((err) => {
        dispatch(hideLoader());
        setError(err.message);
      });
  };

  const getProductsBySubCategory = (subCategoryId: string) => {
    dispatch(showLoader());

    const { request } = productService.getAll<
      Product,
      { subcategory_id: string }
    >({ subcategory_id: subCategoryId });

    request
      .then((res) => {
        dispatch(hideLoader());
        setProducts(res.data);
      })
      .catch((err) => {
        dispatch(hideLoader());
        setError(err.message);
      });
  };

  const fetchProducts = () => {
    const { request, cancel } = customer?.customer_id
      ? productService.getAll<Product, { customer_id: string }>({
          customer_id: customer?.customer_id,
        })
      : productService.getAll<Product>();

    dispatch(showLoader());

    request
      .then((res) => {
        dispatch(hideLoader());
        setProducts(
          res.data.filter(
            (obj, index, self) =>
              index === self.findIndex((t) => t.product_id === obj.product_id)
          )
        );
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        dispatch(hideLoader());
        setError(err.message);
      });

    return cancel;
  };

  useEffect(() => {
    setProductForms(
      natProducts.map((natProduct) => ({
        id: natProduct.natprod_id,
        name: natProduct.name,
        checked: natProduct.natprod_id === natProductId,
      }))
    );
  }, [natProducts, natProductId, natProduct]);

  useEffect(() => {
    if (location.state?.item || categoryId) {
      setSelectedSubCategory(null);
      setSelectedFilter({
        nat_of_prod: [],
        herb_type: false,
        is_nutraceutical: false,
        pres_req: false,
        sortBy: "",
      });
      setSelectedSortOrder({ name: "", id: "", value: "" });
      setProductForms((prevProductForms) =>
        prevProductForms.map((p) => ({ ...p, checked: false }))
      );
      getSubCategories(location.state?.item?.id || categoryId);
      getProductsByCategory(location.state?.item?.id || categoryId);
    }
  }, [location.state, categoryId]);

  // Products
  useEffect(() => {
    const cancelFetchProducts = fetchProducts();
    return () => cancelFetchProducts();
  }, []);

  // useEffect(() => {
  //   if (selectedSortOrder?.value) {
  //     const { request } = sortProductsService.getAll<
  //       Product,
  //       { sortBy: string }
  //     >({ sortBy: selectedSortOrder.value });

  //     dispatch(showLoader());

  //     request
  //       .then((res) => {
  //         dispatch(hideLoader());
  //         setProducts(res.data);
  //       })
  //       .catch((err) => {
  //         dispatch(hideLoader());
  //         setError(err.message);
  //       });
  //   }
  // }, [selectedSortOrder?.value]);

  useEffect(() => {
    if (
      selectedFilter.nat_of_prod.length > 0 ||
      selectedFilter.herb_type ||
      selectedFilter.pres_req ||
      selectedFilter.is_nutraceutical ||
      (selectedSortOrder && selectedSortOrder.id)
    ) {
      const obj = {
        nat_of_prod: selectedFilter.nat_of_prod.join(","),
        is_nutraceutical: 1,
        pres_req: 1,
        herb_type: "Single",
        sortby: selectedSortOrder?.value || "",
      };

      if (selectedFilter.nat_of_prod.length === 0) delete obj.nat_of_prod;

      if (!selectedFilter.is_nutraceutical) delete obj.is_nutraceutical;

      if (!selectedFilter.pres_req) delete obj.pres_req;

      if (!selectedFilter.herb_type) delete obj.herb_type;

      if (!selectedSortOrder?.value) delete obj.sortby;

      const { request } = filterProductsService.getAll<
        Product,
        | {
            nat_of_prod?: string;
            herb_type?: string;
            pres_req?: number;
            is_nutraceutical?: number;
            sortby?: string;
          }
        | {}
      >(obj);

      dispatch(showLoader());

      request
        .then((res) => {
          dispatch(hideLoader());
          setProducts(res.data["error"] ? [] : res.data);
        })
        .catch((err) => {
          dispatch(hideLoader());
          setError(err.message);
        });
    }
  }, [selectedFilter, selectedSortOrder]);

  useEffect(() => {
    if (natProductId && natProduct) {
      setSelectedFilter((prevSelectedFilter) => ({
        ...prevSelectedFilter,
        nat_of_prod: [natProductId],
      }));
    }
  }, [natProductId, natProduct]);

  const handleSortingProducts = (selectedSort: SortOrder) => {
    setSubCategories([]);
    setSelectedSubCategory(null);
    setSelectedSortOrder(selectedSort);
  };

  const handleFilterChange = (filter: Filters, items: TabFilterItem[]) => {
    if (filter.nat_of_prod.length === 0) {
      navigate("/products");
    }

    if (
      filter.nat_of_prod.length === 0 &&
      !filter.herb_type &&
      !filter.is_nutraceutical &&
      !filter.pres_req
    ) {
      fetchProducts();
    }

    setSubCategories([]);
    setSelectedSubCategory(null);
    setProductForms(items);
    setSelectedFilter(filter);
  };

  const handleLike = (id: string) => {
    const updatedProducts = [...products].map((p) =>
      p.product_id === id
        ? {
            ...p,
            isLiked: (p.is_in_wishlist = !p.is_in_wishlist),
            is_in_wishlist: (p.is_in_wishlist = !p.is_in_wishlist),
          }
        : p
    );
    const product = updatedProducts.find((p) => p.product_id === id);

    if (product.isLiked) dispatch(addItemToWishlist(product.product_id));
    else dispatch(removeItemFromWishlist(product.product_id));

    setProducts(updatedProducts);
  };

  const handleClose = () => {
    setClose(!close);
  };

  const handleSelectedChip = (item: SubCategory) => {
    getProductsBySubCategory(item.subcategory_id);
    setSelectedSubCategory(item);
  };

  // Calculate startIndex and endIndex
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, products.length - 1);

  // Get current page products
  const currentProducts = products.slice(startIndex, endIndex + 1);

  return (
    <div
      className={`nc-PageCollection2 ${className}`}
      data-nc-id="PageCollection2"
    >
      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
        <div className="space-y-10 lg:space-y-14">
          {subCategories.length !== 0 && category && (
            <h2 className="ml-1 text-2xl md:text-3xl font-semibold">
              {category}
            </h2>
          )}
          <div className="flex overflow-x-auto whitespace-nowrap sm:overflow-x-auto">
            {subCategories.map((item) => (
              <Chip
                active={
                  item.subcategory_id === selectedSubCategory?.subcategory_id
                }
                key={item.subcategory_id}
                id={item.subcategory_id}
                name={item.subcat_name}
                onClick={() => handleSelectedChip(item)}
              />
            ))}
          </div>

          <main>
            {/* LOOP ITEMS */}
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/3 xl:w-1/4 pr-4 hidden lg:block">
                <SidebarFilters
                  selectedSortOrder={selectedSortOrder}
                  onSort={handleSortingProducts}
                  selectedFilter={selectedFilter}
                  onFilterChange={handleFilterChange}
                  productForms={productForms}
                  sortOrderRadios={DATA_sortOrderRadios}
                />
              </div>
              {/* Filter modal/toolbar for mobile view */}
              <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 z-40">
                <ButtonPrimary
                  className="w-full py-3 text-white rounded-lg"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  {showFilters ? "Close Filters" : "Open Filters"}
                </ButtonPrimary>
              </div>

              {showFilters && (
                <div
                  className="fixed inset-0 bg-gray-800 bg-opacity-75 z-40"
                  onClick={() => setShowFilters(false)}
                >
                  <div
                    className="fixed inset-0 bg-white w-4/4 p-6 overflow-y-auto z-30"
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
                  >
                    {/* Flexbox container for Close Button */}
                    <div className="flex justify-end mb-4">
                      <button
                        className="text-sm p-2"
                        onClick={() => setShowFilters(false)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Sidebar Filters */}
                    <SidebarFilters
                      selectedSortOrder={selectedSortOrder}
                      onSort={handleSortingProducts}
                      selectedFilter={selectedFilter}
                      onFilterChange={handleFilterChange}
                      productForms={productForms}
                      sortOrderRadios={DATA_sortOrderRadios}
                    />
                  </div>
                </div>
              )}

              <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mx-4 border-t lg:border-t-0"></div>

              <div className="flex-1 ">
                <div className="flex-1 grid grid-cols-1 gap-x-8 gap-y-10 ">
                  {!currentProducts.length && (
                    <div className="flex flex-col items-center justify-center text-center py-10 px-6 bg-gray-50 rounded-lg shadow-md w-full max-w-md mx-auto">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        No Products Found!
                      </h2>
                      <p className="text-gray-600 mb-4">
                        Sorry, we couldn't find any products matching your
                        search.
                      </p>
                      <p className="text-gray-600 mb-8">
                        Try adjusting your filters or explore our categories for
                        more great deals!
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex-1 grid sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10 ">
                  {currentProducts.length > 0 &&
                    currentProducts.map((item, index) => (
                      <ProductCard
                        data={item}
                        isLiked={item.is_in_wishlist}
                        onLike={() => handleLike(item.product_id)}
                        key={item.product_id}
                      />
                    ))}
                </div>
              </div>
            </div>
          </main>
          <div className="flex justify-center lg:justify-end">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(products.length / itemsPerPage)}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>

      {/* EMAIL SUBSCRIBE SECTION */}
      <EmailSubscribeSection />
    </div>
  );
};

export default Products;
