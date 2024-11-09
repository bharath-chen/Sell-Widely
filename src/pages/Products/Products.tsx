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
import product1Img from "../../assets/images/1d.png";
import product2Img from "../../assets/images/2d.jpg";
import product3Img from "../../assets/images/3d.jpg";
import product4Img from "../../assets/images/4d.jpg";

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
  const [brands, setBrands] = useState<TabFilterItem[]>([
    {
      id: "b1",
      name: "Sanofi",
      checked: false,
    },
    {
      id: "b2",
      name: "Bayer",
      checked: false,
    },
    {
      id: "b3",
      name: "Medtronic",
      checked: false,
    },
    {
      id: "b4",
      name: "Novartis",
      checked: false,
    },
  ]);
  const [ingredients, setIngredients] = useState<TabFilterItem[]>([
    {
      id: "i1",
      name: "Natural Extracts",
      checked: false,
    },
    {
      id: "i2",
      name: "Organic",
      checked: false,
    },
    {
      id: "i3",
      name: "Vegan",
      checked: false,
    },
    {
      id: "i4",
      name: "Paraben-Free",
      checked: false,
    },
    {
      id: "i5",
      name: "Sulfate-Free",
      checked: false,
    },
    {
      id: "i6",
      name: "Fragrance-Free",
      checked: false,
    },
    {
      id: "i7",
      name: "Alcohol-Free",
      checked: false,
    },
  ]);
  const [certifications, setCertifications] = useState<TabFilterItem[]>([
    {
      id: "c1",
      name: "FDA Approved",
      checked: false,
    },
    {
      id: "c2",
      name: "Cruelty-Free",
      checked: false,
    },
    {
      id: "c3",
      name: "Fair Trade Certified",
      checked: false,
    },
    {
      id: "c4",
      name: "ECOCERT",
      checked: false,
    },
    {
      id: "c5",
      name: "Non-GMO",
      checked: false,
    },
    {
      id: "c6",
      name: "Gluten-Free",
      checked: false,
    },
    {
      id: "c7",
      name: "ISO Certified",
      checked: false,
    },
  ]);
  const [skinTypes, setSkinTypes] = useState<TabFilterItem[]>([
    {
      id: "s1",
      name: "Oily Skin",
      checked: false,
    },
    {
      id: "s2",
      name: "Dry Skin",
      checked: false,
    },
    {
      id: "s3",
      name: "Sensitive Skin",
      checked: false,
    },
    {
      id: "s4",
      name: "Combination Skin",
      checked: false,
    },
    {
      id: "s5",
      name: "Normal Skin",
      checked: false,
    },
    {
      id: "s6",
      name: "Acne-Prone",
      checked: false,
    },
    {
      id: "s7",
      name: "Mature Skin",
      checked: false,
    },
  ]);
  const [health, setHealth] = useState<TabFilterItem[]>([
    {
      id: "h1",
      name: "Hypoallergenic",
      checked: false,
    },
    {
      id: "h2",
      name: "Dermatologist Tested",
      checked: false,
    },
    {
      id: "h3",
      name: "Non-Comedogenic",
      checked: false,
    },
    {
      id: "h4",
      name: "Antioxidant-Rich",
      checked: false,
    },
    {
      id: "h5",
      name: "Moisturizing",
      checked: false,
    },
    {
      id: "h6",
      name: "Anti-Aging",
      checked: false,
    },
    {
      id: "h7",
      name: "SPF Protection",
      checked: false,
    },
  ]);
  const [packaging, setPackaging] = useState<TabFilterItem[]>([
    {
      id: "p1",
      name: "Recyclable",
      checked: false,
    },
    {
      id: "p2",
      name: "Plastic-Free",
      checked: false,
    },
    {
      id: "p3",
      name: "Biodegradable",
      checked: false,
    },
    {
      id: "p4",
      name: "Glass Bottle",
      checked: false,
    },
    {
      id: "p5",
      name: "Eco-Friendly",
      checked: false,
    },
    {
      id: "p6",
      name: "Minimal Packaging",
      checked: false,
    },
    {
      id: "p7",
      name: "Reusable Container",
      checked: false,
    },
  ]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<SubCategory | null>(null);
  const [products, setProducts] = useState<Product[]>([
    {
      product_id: "p001",
      product_code: "SKU12345",
      category_id: "c1",
      subcategory_id: "sc1",
      product_name: "Organic Face Cream",
      age_group_id: "adult",
      brand_id: "b1",
      product_image1: product1Img,
      product_image2: product1Img,
      full_description:
        "A moisturizing organic face cream suitable for dry skin.",
      short_description: "Organic face cream for dry skin",
      barcode: "123456789012",
      barcode_image: "barcode1.png",
      product_sgst: "5%",
      product_cgst: "5%",
      recomm_gender: "Unisex",
      nat_of_prod: "Natural",
      herb_type: "Aloe Vera",
      is_featured: "true",
      is_combo: "false",
      is_today: "false",
      is_offer: "true",
      offer: "20% off",
      user_ratings: "4.5",
      almaa_ratings: "4.3",
      status: "Available",
      created_date: "2024-01-15",
      updated: "2024-06-10",
      prod_attri_id: "attr1",
      color_id: "c1",
      size_id: "s1",
      product_measuring_unit_id: "ml",
      product_purchase_price: "200",
      product_mrp: "300",
      unit_price: "240",
      discount: "20%",
      selling_price: "240",
      quantity: 50,
      reordered_level: "10",
      attstatus: "active",
      created: "2024-01-01",
      is_in_wishlist: false,
      isLiked: true,
      qty: 1,
      suitablefor: "Dry Skin",
      measurement_name: "50 ml",
    },
    {
      product_id: "p002",
      product_code: "SKU12346",
      category_id: "c1",
      subcategory_id: "sc2",
      product_name: "Herbal Shampoo",
      age_group_id: "all",
      brand_id: "b2",
      product_image1: product2Img,
      product_image2: product2Img,
      full_description: "Gentle herbal shampoo for all hair types.",
      short_description: "Herbal shampoo for shiny hair",
      barcode: "123456789013",
      barcode_image: "barcode2.png",
      product_sgst: "5%",
      product_cgst: "5%",
      recomm_gender: "Unisex",
      nat_of_prod: "Herbal",
      herb_type: "Neem",
      is_featured: "false",
      is_combo: "false",
      is_today: "true",
      is_offer: "false",
      offer: "",
      user_ratings: "4.2",
      almaa_ratings: "4.0",
      status: "Available",
      created_date: "2024-02-01",
      updated: "2024-06-12",
      prod_attri_id: "attr2",
      color_id: "c2",
      size_id: "s2",
      product_measuring_unit_id: "ml",
      product_purchase_price: "150",
      product_mrp: "250",
      unit_price: "200",
      discount: "20%",
      selling_price: "200",
      quantity: 100,
      reordered_level: "20",
      attstatus: "active",
      created: "2024-02-01",
      is_in_wishlist: true,
      isLiked: false,
      qty: 1,
      suitablefor: "All Hair Types",
      measurement_name: "100 ml",
    },
    {
      product_id: "p003",
      product_code: "SKU12347",
      category_id: "c2",
      subcategory_id: "sc1",
      product_name: "SPF 50 Sunscreen",
      age_group_id: "adult",
      brand_id: "b1",
      product_image1: product3Img,
      product_image2: product3Img,
      full_description: "Broad-spectrum SPF 50 sunscreen for all skin types.",
      short_description: "SPF 50 sunscreen",
      barcode: "123456789014",
      barcode_image: "barcode3.png",
      product_sgst: "5%",
      product_cgst: "5%",
      recomm_gender: "Unisex",
      nat_of_prod: "Natural",
      herb_type: "Green Tea",
      is_featured: "true",
      is_combo: "false",
      is_today: "false",
      is_offer: "true",
      offer: "15% off",
      user_ratings: "4.8",
      almaa_ratings: "4.5",
      status: "Available",
      created_date: "2024-03-10",
      updated: "2024-06-15",
      prod_attri_id: "attr3",
      color_id: "c1",
      size_id: "s3",
      product_measuring_unit_id: "ml",
      product_purchase_price: "400",
      product_mrp: "500",
      unit_price: "425",
      discount: "15%",
      selling_price: "425",
      quantity: 75,
      reordered_level: "15",
      attstatus: "active",
      created: "2024-03-01",
      is_in_wishlist: false,
      isLiked: true,
      qty: 1,
      suitablefor: "All Skin Types",
      measurement_name: "75 ml",
    },
    {
      product_id: "p004",
      product_code: "SKU12348",
      category_id: "c3",
      subcategory_id: "sc1",
      product_name: "Aloe Vera Gel",
      age_group_id: "all",
      brand_id: "b3",
      product_image1: product4Img,
      product_image2: product4Img,
      full_description:
        "Multi-purpose aloe vera gel for skin hydration and soothing.",
      short_description: "Aloe vera gel",
      barcode: "123456789015",
      barcode_image: "barcode4.png",
      product_sgst: "5%",
      product_cgst: "5%",
      recomm_gender: "Unisex",
      nat_of_prod: "Herbal",
      herb_type: "Aloe Vera",
      is_featured: "false",
      is_combo: "true",
      is_today: "true",
      is_offer: "false",
      offer: "",
      user_ratings: "4.7",
      almaa_ratings: "4.6",
      status: "Available",
      created_date: "2024-04-01",
      updated: "2024-06-20",
      prod_attri_id: "attr4",
      color_id: "c3",
      size_id: "s4",
      product_measuring_unit_id: "ml",
      product_purchase_price: "100",
      product_mrp: "150",
      unit_price: "120",
      discount: "20%",
      selling_price: "120",
      quantity: 200,
      reordered_level: "30",
      attstatus: "active",
      created: "2024-04-01",
      is_in_wishlist: true,
      isLiked: false,
      qty: 1,
      suitablefor: "All Skin Types",
      measurement_name: "100 ml",
    },
    {
      product_id: "p005",
      product_code: "SKU12349",
      category_id: "c4",
      subcategory_id: "sc2",
      product_name: "Vitamin C Serum",
      age_group_id: "adult",
      brand_id: "b4",
      product_image1: product1Img,
      product_image2: product1Img,
      full_description: "Brightening Vitamin C serum to enhance skin radiance.",
      short_description: "Brightening serum",
      barcode: "123456789016",
      barcode_image: "barcode5.png",
      product_sgst: "5%",
      product_cgst: "5%",
      recomm_gender: "Unisex",
      nat_of_prod: "Natural",
      herb_type: "Vitamin C",
      is_featured: "true",
      is_combo: "false",
      is_today: "true",
      is_offer: "true",
      offer: "10% off",
      user_ratings: "4.9",
      almaa_ratings: "4.7",
      status: "Available",
      created_date: "2024-05-05",
      updated: "2024-06-25",
      prod_attri_id: "attr5",
      color_id: "c4",
      size_id: "s5",
      product_measuring_unit_id: "ml",
      product_purchase_price: "500",
      product_mrp: "600",
      unit_price: "540",
      discount: "10%",
      selling_price: "540",
      quantity: 120,
      reordered_level: "25",
      attstatus: "active",
      created: "2024-05-05",
      is_in_wishlist: false,
      isLiked: true,
      qty: 1,
      suitablefor: "All Skin Types",
      measurement_name: "30 ml",
    },
    {
      product_id: "p006",
      product_code: "SKU12345",
      category_id: "c1",
      subcategory_id: "sc1",
      product_name: "Organic Face Cream",
      age_group_id: "adult",
      brand_id: "b1",
      product_image1: product2Img,
      product_image2: product2Img,
      full_description:
        "A moisturizing organic face cream suitable for dry skin.",
      short_description: "Organic face cream for dry skin",
      barcode: "123456789012",
      barcode_image: "barcode1.png",
      product_sgst: "5%",
      product_cgst: "5%",
      recomm_gender: "Unisex",
      nat_of_prod: "Natural",
      herb_type: "Aloe Vera",
      is_featured: "true",
      is_combo: "false",
      is_today: "false",
      is_offer: "true",
      offer: "20% off",
      user_ratings: "4.5",
      almaa_ratings: "4.3",
      status: "Available",
      created_date: "2024-01-15",
      updated: "2024-06-10",
      prod_attri_id: "attr1",
      color_id: "c1",
      size_id: "s1",
      product_measuring_unit_id: "ml",
      product_purchase_price: "200",
      product_mrp: "300",
      unit_price: "240",
      discount: "20%",
      selling_price: "240",
      quantity: 50,
      reordered_level: "10",
      attstatus: "active",
      created: "2024-01-01",
      is_in_wishlist: false,
      isLiked: true,
      qty: 1,
      suitablefor: "Dry Skin",
      measurement_name: "50 ml",
    },
    {
      product_id: "p007",
      product_code: "SKU12346",
      category_id: "c1",
      subcategory_id: "sc2",
      product_name: "Herbal Shampoo",
      age_group_id: "all",
      brand_id: "b2",
      product_image1: product3Img,
      product_image2: product3Img,
      full_description: "Gentle herbal shampoo for all hair types.",
      short_description: "Herbal shampoo for shiny hair",
      barcode: "123456789013",
      barcode_image: "barcode2.png",
      product_sgst: "5%",
      product_cgst: "5%",
      recomm_gender: "Unisex",
      nat_of_prod: "Herbal",
      herb_type: "Neem",
      is_featured: "false",
      is_combo: "false",
      is_today: "true",
      is_offer: "false",
      offer: "",
      user_ratings: "4.2",
      almaa_ratings: "4.0",
      status: "Available",
      created_date: "2024-02-01",
      updated: "2024-06-12",
      prod_attri_id: "attr2",
      color_id: "c2",
      size_id: "s2",
      product_measuring_unit_id: "ml",
      product_purchase_price: "150",
      product_mrp: "250",
      unit_price: "200",
      discount: "20%",
      selling_price: "200",
      quantity: 100,
      reordered_level: "20",
      attstatus: "active",
      created: "2024-02-01",
      is_in_wishlist: true,
      isLiked: false,
      qty: 1,
      suitablefor: "All Hair Types",
      measurement_name: "100 ml",
    },
    {
      product_id: "p008",
      product_code: "SKU12347",
      category_id: "c2",
      subcategory_id: "sc1",
      product_name: "SPF 50 Sunscreen",
      age_group_id: "adult",
      brand_id: "b1",
      product_image1: product4Img,
      product_image2: product4Img,
      full_description: "Broad-spectrum SPF 50 sunscreen for all skin types.",
      short_description: "SPF 50 sunscreen",
      barcode: "123456789014",
      barcode_image: "barcode3.png",
      product_sgst: "5%",
      product_cgst: "5%",
      recomm_gender: "Unisex",
      nat_of_prod: "Natural",
      herb_type: "Green Tea",
      is_featured: "true",
      is_combo: "false",
      is_today: "false",
      is_offer: "true",
      offer: "15% off",
      user_ratings: "4.8",
      almaa_ratings: "4.5",
      status: "Available",
      created_date: "2024-03-10",
      updated: "2024-06-15",
      prod_attri_id: "attr3",
      color_id: "c1",
      size_id: "s3",
      product_measuring_unit_id: "ml",
      product_purchase_price: "400",
      product_mrp: "500",
      unit_price: "425",
      discount: "15%",
      selling_price: "425",
      quantity: 75,
      reordered_level: "15",
      attstatus: "active",
      created: "2024-03-01",
      is_in_wishlist: false,
      isLiked: true,
      qty: 1,
      suitablefor: "All Skin Types",
      measurement_name: "75 ml",
    },
    {
      product_id: "p009",
      product_code: "SKU12348",
      category_id: "c3",
      subcategory_id: "sc1",
      product_name: "Aloe Vera Gel",
      age_group_id: "all",
      brand_id: "b3",
      product_image1: product1Img,
      product_image2: product1Img,
      full_description:
        "Multi-purpose aloe vera gel for skin hydration and soothing.",
      short_description: "Aloe vera gel",
      barcode: "123456789015",
      barcode_image: "barcode4.png",
      product_sgst: "5%",
      product_cgst: "5%",
      recomm_gender: "Unisex",
      nat_of_prod: "Herbal",
      herb_type: "Aloe Vera",
      is_featured: "false",
      is_combo: "true",
      is_today: "true",
      is_offer: "false",
      offer: "",
      user_ratings: "4.7",
      almaa_ratings: "4.6",
      status: "Available",
      created_date: "2024-04-01",
      updated: "2024-06-20",
      prod_attri_id: "attr4",
      color_id: "c3",
      size_id: "s4",
      product_measuring_unit_id: "ml",
      product_purchase_price: "100",
      product_mrp: "150",
      unit_price: "120",
      discount: "20%",
      selling_price: "120",
      quantity: 200,
      reordered_level: "30",
      attstatus: "active",
      created: "2024-04-01",
      is_in_wishlist: true,
      isLiked: false,
      qty: 1,
      suitablefor: "All Skin Types",
      measurement_name: "100 ml",
    },
    {
      product_id: "p010",
      product_code: "SKU12349",
      category_id: "c4",
      subcategory_id: "sc2",
      product_name: "Vitamin C Serum",
      age_group_id: "adult",
      brand_id: "b4",
      product_image1: product2Img,
      product_image2: product2Img,
      full_description: "Brightening Vitamin C serum to enhance skin radiance.",
      short_description: "Brightening serum",
      barcode: "123456789016",
      barcode_image: "barcode5.png",
      product_sgst: "5%",
      product_cgst: "5%",
      recomm_gender: "Unisex",
      nat_of_prod: "Natural",
      herb_type: "Vitamin C",
      is_featured: "true",
      is_combo: "false",
      is_today: "true",
      is_offer: "true",
      offer: "10% off",
      user_ratings: "4.9",
      almaa_ratings: "4.7",
      status: "Available",
      created_date: "2024-05-05",
      updated: "2024-06-25",
      prod_attri_id: "attr5",
      color_id: "c4",
      size_id: "s5",
      product_measuring_unit_id: "ml",
      product_purchase_price: "500",
      product_mrp: "600",
      unit_price: "540",
      discount: "10%",
      selling_price: "540",
      quantity: 120,
      reordered_level: "25",
      attstatus: "active",
      created: "2024-05-05",
      is_in_wishlist: false,
      isLiked: true,
      qty: 1,
      suitablefor: "All Skin Types",
      measurement_name: "30 ml",
    },
  ]);
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
  const itemsPerPage = 10;

  // const getSubCategories = (id: string) => {
  //   const { request } = subcategoryService.getAll<
  //     SubCategory,
  //     { category_id: string }
  //   >({
  //     category_id: id,
  //   });

  //   dispatch(showLoader());

  //   request
  //     .then((res) => {
  //       dispatch(hideLoader());
  //       setSubCategories(res.data);
  //     })
  //     .catch((err) => {
  //       if (err instanceof CanceledError) return;

  //       dispatch(hideLoader());
  //     });
  // };

  // const getProductsByCategory = (id: string) => {
  //   dispatch(showLoader());

  //   const { request } = productService.getAll<Product, { category_id: string }>(
  //     { category_id: id }
  //   );

  //   request
  //     .then((res) => {
  //       dispatch(hideLoader());
  //       setProducts(res.data);
  //     })
  //     .catch((err) => {
  //       dispatch(hideLoader());
  //       setError(err.message);
  //     });
  // };

  // const getProductsBySubCategory = (subCategoryId: string) => {
  //   dispatch(showLoader());

  //   const { request } = productService.getAll<
  //     Product,
  //     { subcategory_id: string }
  //   >({ subcategory_id: subCategoryId });

  //   request
  //     .then((res) => {
  //       dispatch(hideLoader());
  //       setProducts(res.data);
  //     })
  //     .catch((err) => {
  //       dispatch(hideLoader());
  //       setError(err.message);
  //     });
  // };

  // const fetchProducts = () => {
  //   const { request, cancel } = customer?.customer_id
  //     ? productService.getAll<Product, { customer_id: string }>({
  //         customer_id: customer?.customer_id,
  //       })
  //     : productService.getAll<Product>();

  //   dispatch(showLoader());

  //   request
  //     .then((res) => {
  //       dispatch(hideLoader());
  //       setProducts(
  //         res.data.filter(
  //           (obj, index, self) =>
  //             index === self.findIndex((t) => t.product_id === obj.product_id)
  //         )
  //       );
  //     })
  //     .catch((err) => {
  //       if (err instanceof CanceledError) return;
  //       dispatch(hideLoader());
  //       setError(err.message);
  //     });

  //   return cancel;
  // };

  // useEffect(() => {
  //   setProductForms(
  //     natProducts.map((natProduct) => ({
  //       id: natProduct.natprod_id,
  //       name: natProduct.name,
  //       checked: natProduct.natprod_id === natProductId,
  //     }))
  //   );
  // }, [natProducts, natProductId, natProduct]);

  // useEffect(() => {
  //   if (location.state?.item || categoryId) {
  //     setSelectedSubCategory(null);
  //     setSelectedFilter({
  //       nat_of_prod: [],
  //       herb_type: false,
  //       is_nutraceutical: false,
  //       pres_req: false,
  //       sortBy: "",
  //     });
  //     setSelectedSortOrder({ name: "", id: "", value: "" });
  //     setProductForms((prevProductForms) =>
  //       prevProductForms.map((p) => ({ ...p, checked: false }))
  //     );
  //     getSubCategories(location.state?.item?.id || categoryId);
  //     getProductsByCategory(location.state?.item?.id || categoryId);
  //   }
  // }, [location.state, categoryId]);

  // Products
  // useEffect(() => {
  //   const cancelFetchProducts = fetchProducts();
  //   return () => cancelFetchProducts();
  // }, []);

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

  // useEffect(() => {
  //   if (
  //     selectedFilter.nat_of_prod.length > 0 ||
  //     selectedFilter.herb_type ||
  //     selectedFilter.pres_req ||
  //     selectedFilter.is_nutraceutical ||
  //     (selectedSortOrder && selectedSortOrder.id)
  //   ) {
  //     const obj = {
  //       nat_of_prod: selectedFilter.nat_of_prod.join(","),
  //       is_nutraceutical: 1,
  //       pres_req: 1,
  //       herb_type: "Single",
  //       sortby: selectedSortOrder?.value || "",
  //     };

  //     if (selectedFilter.nat_of_prod.length === 0) delete obj.nat_of_prod;

  //     if (!selectedFilter.is_nutraceutical) delete obj.is_nutraceutical;

  //     if (!selectedFilter.pres_req) delete obj.pres_req;

  //     if (!selectedFilter.herb_type) delete obj.herb_type;

  //     if (!selectedSortOrder?.value) delete obj.sortby;

  //     const { request } = filterProductsService.getAll<
  //       Product,
  //       | {
  //           nat_of_prod?: string;
  //           herb_type?: string;
  //           pres_req?: number;
  //           is_nutraceutical?: number;
  //           sortby?: string;
  //         }
  //       | {}
  //     >(obj);

  //     dispatch(showLoader());

  //     request
  //       .then((res) => {
  //         dispatch(hideLoader());
  //         setProducts(res.data["error"] ? [] : res.data);
  //       })
  //       .catch((err) => {
  //         dispatch(hideLoader());
  //         setError(err.message);
  //       });
  //   }
  // }, [selectedFilter, selectedSortOrder]);

  // useEffect(() => {
  //   if (natProductId && natProduct) {
  //     setSelectedFilter((prevSelectedFilter) => ({
  //       ...prevSelectedFilter,
  //       nat_of_prod: [natProductId],
  //     }));
  //   }
  // }, [natProductId, natProduct]);

  // const handleSortingProducts = (selectedSort: SortOrder) => {
  //   setSubCategories([]);
  //   setSelectedSubCategory(null);
  //   setSelectedSortOrder(selectedSort);
  // };

  // const handleFilterChange = (filter: Filters, items: TabFilterItem[]) => {
  //   if (filter.nat_of_prod.length === 0) {
  //     navigate("/products");
  //   }

  //   if (
  //     filter.nat_of_prod.length === 0 &&
  //     !filter.herb_type &&
  //     !filter.is_nutraceutical &&
  //     !filter.pres_req
  //   ) {
  //     fetchProducts();
  //   }

  //   setSubCategories([]);
  //   setSelectedSubCategory(null);
  //   setProductForms(items);
  //   setSelectedFilter(filter);
  // };

  // const handleLike = (id: string) => {
  //   const updatedProducts = [...products].map((p) =>
  //     p.product_id === id
  //       ? {
  //           ...p,
  //           isLiked: (p.is_in_wishlist = !p.is_in_wishlist),
  //           is_in_wishlist: (p.is_in_wishlist = !p.is_in_wishlist),
  //         }
  //       : p
  //   );
  //   const product = updatedProducts.find((p) => p.product_id === id);

  //   if (product.isLiked) dispatch(addItemToWishlist(product.product_id));
  //   else dispatch(removeItemFromWishlist(product.product_id));

  //   setProducts(updatedProducts);
  // };

  // const handleClose = () => {
  //   setClose(!close);
  // };

  // const handleSelectedChip = (item: SubCategory) => {
  //   getProductsBySubCategory(item.subcategory_id);
  //   setSelectedSubCategory(item);
  // };

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
          {/* {subCategories.length !== 0 && category && (
            <h2 className="ml-1 text-2xl md:text-3xl font-semibold">
              {category}
            </h2>
          )} */}
          {/* <div className="flex overflow-x-auto whitespace-nowrap sm:overflow-x-auto">
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
          </div> */}

          <main>
            {/* LOOP ITEMS */}
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/3 xl:w-1/4 pr-4 hidden lg:block">
                <SidebarFilters
                  selectedSortOrder={selectedSortOrder}
                  // handleSortingProducts
                  onSort={(items) => {
                    console.log(items);
                  }}
                  selectedFilter={selectedFilter}
                  // handleFilterChange
                  onFilterChange={(items) => console.log(items)}
                  brands={brands}
                  certifications={certifications}
                  health={health}
                  packaging={packaging}
                  ingredients={ingredients}
                  skinType={skinTypes}
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
                      onSort={(items) => console.log(items)}
                      selectedFilter={selectedFilter}
                      onFilterChange={(items) => console.log(items)}
                      brands={brands}
                      certifications={certifications}
                      health={health}
                      packaging={packaging}
                      ingredients={ingredients}
                      skinType={skinTypes}
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
                        // onLike={() => handleLike(item.product_id)}
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
      {/* <EmailSubscribeSection /> */}
    </div>
  );
};

export default Products;
