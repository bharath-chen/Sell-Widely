import React, { FC, useEffect, useState } from "react";
import {
  NoSymbolIcon,
  ClockIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import ButtonSecondary from "../../shared/Button/ButtonSecondary";
import NcImage from "../../shared/NcImage/NcImage";
import LikeSaveBtns from "./LikeSaveBtns";
import ModalPhotos from "./ModalPhotos";
import ReviewItem from "../../components/ReviewItem";
import IconDiscount from "../../components/IconDiscount";
import NcInputNumber from "../../components/NcInputNumber";
import BagIcon from "../../components/BagIcon";
import AccordionInfo from "./AccordionInfo";
import Policy from "./Policy";
import toast from "react-hot-toast";
import { CheckIcon, StarIcon } from "@heroicons/react/24/solid";
import SectionSliderProductCard from "../../components/SectionSliderProductCard";
import ModalViewAllReviews, { Review } from "./ModalViewAllReviews";
import { Link, useLocation, useParams } from "react-router-dom";
import AppProductChip from "../../components/AppProductChip/AppProductChip";
import faqImg from "../../assets/images/FAQ.png";
import Expert from "../../assets/PRODUCT DETAIL/4-Expert.jpg";
import video from "../../assets/PRODUCT DETAIL/5-video.jpg";
import videoIcon from "../../assets/PRODUCT DETAIL/5-video-icon.png";
import AppSlider from "../../components/AppSlider/AppSlider";
import Heading from "../../components/Heading/Heading";
import AppBuyingOptionCard from "../../components/AppBuyingOptionCard/AppBuyingOptionCard";
import EmailSubscribeSection from "../../shared/EmailSubscribeSection/EmailSubscribeSection";
import relatedProductsService from "../../services/related-products-service";
import { CanceledError } from "axios";
import productDetailService, {
  ProductDetail,
} from "../../services/product-detail-service";
import { hideLoader, showLoader } from "../../features/loader/loaderSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Product } from "../../models/product";
import { Transition } from "@headlessui/react";
import Prices from "../../components/Prices";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "../../features/wishlist/wishlistSlice";
import VideoPopup from "../../pages/Resources/Videos/VideoPopup";
import faqService, { IFaq } from "../../services/faq-service";
import {
  addItemToCartWithQuantity,
  clearCart,
} from "../../features/cart/cartSlice";
import { RootState } from "../../state/store";
import { Rating } from "react-simple-star-rating";
import product1Img from "../../assets/images/1d.png";
import product2Img from "../../assets/images/2d.jpg";
import product3Img from "../../assets/images/3d.jpg";
import product4Img from "../../assets/images/4d.jpg";
import ProductDisplay from "./ProductDisplay";

const calculateOriginalPrice = (price: number, pack: number) => price * pack;

const calculateDiscountedPrice = (price: number, pack: number, offer: number) =>
  price * pack - price * pack * (offer / 100);

export interface ProductDetailPage2Props {
  className?: string;
}

const ProductDetailPage2: FC<ProductDetailPage2Props> = ({
  className = "",
}) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [buyingOptions, setBuyingOptions] = useState([
    {
      id: 1,
      offer: 10,
      pack: 2,
      discountedPrice: 0,
      originalPrice: 0,
      selected: false,
    },
    {
      id: 2,
      offer: 20,
      pack: 4,
      discountedPrice: 0,
      originalPrice: 0,
      selected: false,
    },
    {
      id: 3,
      offer: 30,
      pack: 10,
      discountedPrice: 0,
      originalPrice: 0,
      selected: false,
    },
  ]);
  const [quantityOption, setQuantityOption] = React.useState({
    id: 1,
    label: "100 g",
  });
  const [variantActive, setVariantActive] = React.useState(0);
  const [sizeSelected, setSizeSelected] = React.useState("");
  const [quantitySelected, setQuantitySelected] = React.useState(1);
  const [inStock, setInStock] = React.useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModalViewAllReviews, setIsOpenModalViewAllReviews] =
    useState(false);
  const [openFocusIndex, setOpenFocusIndex] = useState(0);

  const [productDetail, setProductDetail] = useState<ProductDetail>({
    product_details: [
      {
        product_id: "p001",
        product_code: "SKU12345",
        product_name: "Organic Face Cream",
        product_image1: product1Img,
        product_image2: product1Img,
        product_image3: product1Img,
        product_image4: product1Img,
        product_image5: product1Img,
        video: "video1.mp4",
        audio: "audio1.mp3",
        howtouse: "Apply a small amount on clean skin and massage gently.",
        suitablefor: "Dry Skin",
        is_nutraceutical: "false",
        bottom_image: "bottom_image1.jpg",
        full_description:
          "A moisturizing organic face cream suitable for dry skin. Contains natural ingredients to hydrate and soothe.",
        short_description: "Organic face cream for dry skin",
        barcode: "123456789012",
        barcode_image: "barcode1.png",
        product_sgst: "5%",
        product_cgst: "5%",
        recomm_gender: "Unisex",
        nat_of_prod: "India",
        herb_type: "Aloe Vera",
        is_featured: "true",
        is_combo: "false",
        pres_req: "No",
        is_offer: "true",
        offer: "20% off",
        user_ratings: "4.5",
        almaa_ratings: "4.3",
        status: "Available",
        created_date: "2024-01-15",
        modified_date: "2024-06-10",
        key_benefits: "Moisturizes, soothes, and nourishes the skin.",
      },
    ],
    product_attributes: [
      {
        prod_attri_id: "attr1",
        product_id: "p001",
        size_id: "s1",
        product_measuring_unit_id: "50g",
        product_purchase_price: "200",
        product_mrp: "300",
        unit_price: "240",
        discount: "20%",
        selling_price: "240",
        quantity: "50",
        reordered_level: "10",
        attstatus: "active",
        created_date: "2024-01-01",
        modified_date: "2024-06-10",
        measurement_name: "50 ml",
      },
    ],
    product_experttalk: [
      {
        pro_exptalk_id: "talk1",
        product_id: "p001",
        image: "doctor_image1.jpg",
        doctor_id: "doc1",
        content:
          "This face cream is excellent for hydration and contains natural ingredients.",
        status: "Active",
        created_date: "2024-06-01",
      },
    ],
    product_feedback: [
      {
        prodcustfb_id: "fb1",
        customer_id: "cust1",
        name: "John Doe",
        product_id: "p001",
        user_ratings: "5",
        comments: "Great cream, very moisturizing!",
        status: "Approved",
      },
    ],
    product_tags: [
      {
        pro_tag_id: "tag1",
        product_id: "p001",
        tag_id: "tag1",
        status: "Active",
      },
      {
        pro_tag_id: "tag2",
        product_id: "p001",
        tag_id: "tag2",
        status: "Active",
      },
    ],
    product_ingred: [
      {
        pro_cat_id: "ing1",
        product_id: "p001",
        ingredient_id: "ing1",
        status: "Active",
      },
      {
        pro_cat_id: "ing2",
        product_id: "p001",
        ingredient_id: "ing2",
        status: "Active",
      },
    ],
  });
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([
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
  ]);
  const [showVideoPopup, setShowVideoPopup] = useState<boolean>(false);
  const [faqs, setFaqs] = useState<{ name: string; content: string }[]>([
    {
      name: "What is the return policy?",
      content:
        "You can return any unused product within 30 days of purchase for a full refund.",
    },
    {
      name: "How long does shipping take?",
      content:
        "Shipping typically takes 5-7 business days, depending on your location.",
    },
    {
      name: "Is this product cruelty-free?",
      content:
        "Yes, all our products are cruelty-free and not tested on animals.",
    },
    {
      name: "Can I use this product on sensitive skin?",
      content:
        "Yes, our products are formulated to be gentle on sensitive skin. However, we recommend doing a patch test before full application.",
    },
    {
      name: "Are the ingredients natural?",
      content:
        "Yes, we use high-quality natural ingredients in our formulations.",
    },
  ]);
  const [sellingPrice, setSellingPrice] = useState(
    +productDetail.product_attributes[0].selling_price
  );
  const cart = useAppSelector((state: RootState) => state.cart);

  // useEffect(() => {
  //   const { request, cancel } = productDetailService.get<
  //     ProductDetail,
  //     { product_id: number }
  //   >({ product_id: +location.state.id });

  //   dispatch(showLoader());

  //   request
  //     .then((res) => {
  //       const details = res.data;
  //       const price = +details.product_attributes[0].selling_price;
  //       dispatch(hideLoader());
  //       setProductDetail(details);
  //       setSellingPrice(price);
  //       setBuyingOptions((buyingOption) =>
  //         buyingOption.map((b) => ({
  //           ...b,
  //           originalPrice: calculateOriginalPrice(price, b.pack),
  //           discountedPrice: calculateDiscountedPrice(price, b.pack, b.offer),
  //         }))
  //       );
  //       setQuantityOption({
  //         id: 1,
  //         label: details.product_attributes[0].product_measuring_unit_id,
  //       });
  //       setInStock(details.product_attributes[0].attstatus === "1");
  //     })
  //     .catch((err) => {
  //       if (err instanceof CanceledError) return;

  //       dispatch(hideLoader());
  //     });

  //   return () => cancel();
  // }, []);

  // Related Products
  // useEffect(() => {
  //   const { request, cancel } = relatedProductsService.getAll<
  //     Product,
  //     { product_id: number }
  //   >({ product_id: +location.state.id });

  //   request
  //     .then((res) => {
  //       const updatedProducts = res.data.map((p) => ({ ...p, isLiked: false }));
  //       setRelatedProducts(updatedProducts);
  //     })
  //     .catch((err) => {
  //       if (err instanceof CanceledError) return;

  //       console.log(err.message);
  //     });

  //   return () => cancel();
  // }, []);

  // useEffect(() => {
  //   const { request, cancel } = faqService.get<IFaq[], { product_id: number }>({
  //     product_id: +location.state.id,
  //   });

  //   dispatch(showLoader());

  //   request
  //     .then((res) => {
  //       dispatch(hideLoader());
  //       const data = res.data.map((r) => ({
  //         name: r.question,
  //         content: r.answer,
  //       }));
  //       // setFaqs(data);
  //     })
  //     .catch((err) => {
  //       if (err instanceof CanceledError) return;

  //       dispatch(hideLoader());
  //       console.log(err);
  //     });

  //   return () => cancel();
  // }, []);

  const renderStatusSoldout = () => (
    <div className="rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
      <NoSymbolIcon className="w-3.5 h-3.5" />
      <span className="ml-1 leading-none">Sold Out</span>
    </div>
  );

  const renderStatusInstock = () => (
    <div className="rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
      <CheckIcon className="w-3.5 h-3.5" />
      <span className="ml-1 leading-none">In Stock</span>
    </div>
  );

  const handleWishlist = (liked: boolean) => {
    const productId = productDetail.product_details[0].product_id;
    if (liked) dispatch(addItemToWishlist(productId));
    else dispatch(removeItemFromWishlist(productId));
  };

  const handleOpenModal = (index: number) => {
    setIsOpen(true);
    setOpenFocusIndex(index);
  };

  const handleCloseModal = () => setIsOpen(false);

  const notifyAddTocart = ({ size }: { size?: string }) => {
    toast.custom(
      (t) => (
        <Transition
          appear
          show={t.visible}
          className="p-4 max-w-md w-full bg-white dark:bg-slate-800 shadow-lg rounded-2xl pointer-events-auto ring-1 ring-black/5 dark:ring-white/10 text-slate-900 dark:text-slate-200"
          enter="transition-all duration-150"
          enterFrom="opacity-0 translate-x-20"
          enterTo="opacity-100 translate-x-0"
          leave="transition-all duration-150"
          leaveFrom="opacity-100 translate-x-0"
          leaveTo="opacity-0 translate-x-20"
        >
          <p className="block text-base font-semibold leading-none">
            Added to cart!
          </p>
          <div className="border-t border-slate-200 dark:border-slate-700 my-4" />
          {renderProductCartOnNotify({ size })}
        </Transition>
      ),
      { position: "top-right", id: "nc-product-notify", duration: 3000 }
    );
  };

  const addToCart = () => {
    notifyAddTocart({ size: "" });
    const selected = buyingOptions.find((o) => o.selected);

    let originalPrice = sellingPrice.toString();
    if (selected && selected.pack >= quantitySelected) {
      originalPrice = calculateDiscountedPrice(
        +originalPrice,
        1,
        selected.offer
      )
        .toFixed(2)
        .toString();
    }

    const productPayload = {
      ...productDetail.product_details[0],
      selling_price: originalPrice,
      product_measuring_unit_id: quantityOption.label,
    };

    if (selected && cart.items.length > 0) {
      dispatch(clearCart());
    }

    dispatch(
      addItemToCartWithQuantity({
        product: productPayload,
        quantity: selected ? selected.pack : quantitySelected,
      })
    );
    // addItemToCartWithQuantity(
    //   {
    //     ...productDetail.product_details[0],
    //     ...productDetail.product_attributes[0],
    //     selling_price:
    //       `${selected.discountedPrice.toFixed(2)}` || `${sellingPrice}`,
    //   },
    //   quantity: selected ? selected.pack : quantitySelected
    // );
  };

  const renderProductCartOnNotify = ({ size }: { size?: string }) => {
    const selected = buyingOptions.find((o) => o.selected);

    return (
      <div className="flex ">
        <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <img
            src={productDetail.product_details[0].product_image1}
            alt={productDetail.product_details[0].product_name}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium ">
                  {productDetail.product_details[0].product_name}
                </h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  <span>
                    {/* {variants ? variants[variantActive].name : `Natural`} */}
                  </span>
                  <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4"></span>
                  <span>{quantityOption.label}</span>
                </p>
              </div>
              {!selected && <Prices price={sellingPrice} className="mt-0.5" />}
              {selected && (
                <Prices
                  price={calculateDiscountedPrice(
                    sellingPrice,
                    selected.pack,
                    selected.offer
                  )}
                  className="mt-0.5"
                />
              )}
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500 dark:text-slate-400">
              Qty {selected?.pack || quantitySelected}
            </p>

            <div className="flex">
              <Link
                to={"/cart"}
                className="font-medium text-primary-900 dark:text-primary-500 "
              >
                View cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleBuyingOption = (id: number) => {
    const updatedBuyingOptions = [...buyingOptions].map((o) =>
      o.id === id
        ? { ...o, selected: (o.selected = !o.selected) }
        : { ...o, selected: false }
    );
    if (updatedBuyingOptions.every((o) => !o.selected)) setQuantitySelected(1);
    setBuyingOptions(updatedBuyingOptions);
  };

  const renderStatus = () => {
    if (!status) {
      return null;
    }
    const CLASSES =
      "text-sm flex items-center text-slate-700 text-slate-900 dark:text-slate-300";
    if (status === "New in") {
      return (
        <div className={CLASSES}>
          <SparklesIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{status}</span>
        </div>
      );
    }
    if (status === "50% Discount") {
      return (
        <div className={CLASSES}>
          <IconDiscount className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{status}</span>
        </div>
      );
    }
    if (status === "Sold Out") {
      return (
        <div className={CLASSES}>
          <NoSymbolIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{status}</span>
        </div>
      );
    }
    if (status === "limited edition") {
      return (
        <div className={CLASSES}>
          <ClockIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{status}</span>
        </div>
      );
    }
    return null;
  };

  const handleQuantityOptionChange = (selectedQuantity: {
    id: number;
    label: string;
  }) => {
    const attributeSelected = productDetail?.product_attributes.find(
      (a) => a.product_measuring_unit_id === selectedQuantity.label
    );
    const price = +attributeSelected.selling_price;
    setQuantityOption(selectedQuantity);
    setInStock(attributeSelected.attstatus === "1");
    setSellingPrice(price);
    setBuyingOptions((prevBuyingOptions) =>
      prevBuyingOptions.map((b) => ({
        ...b,
        selected: false,
        originalPrice: calculateOriginalPrice(price, b.pack),
        discountedPrice: calculateDiscountedPrice(price, b.pack, b.offer),
      }))
    );
  };

  // const renderSectionSidebar = () => {
  //   const quantityOptions =
  //     productDetail?.product_attributes.map((a, i) => ({
  //       id: i + 1,
  //       label: a.product_measuring_unit_id,
  //     })) || [];

  //   const hasBuyingOptionSelected = buyingOptions.filter((b) => b.selected);

  //   return (
  //     <div className="listingSectionSidebar__wrap lg:shadow-lg">
  //       <div className="space-y-7 lg:space-y-8">
  //         {/* PRICE */}
  //         <div className="">
  //           {/* ---------- 1 HEADING ----------  */}
  //           <div className="flex items-center justify-between space-x-5">
  //             <div className="flex text-2xl font-semibold">
  //               {/* Rs.{price.toFixed(2)} */}
  //               Rs.
  //               {sellingPrice.toFixed(2)}
  //             </div>
  //             <a
  //               href="#reviews"
  //               className="flex items-center text-sm font-medium"
  //             >
  //               <div className="">
  //                 <StarIcon className="w-5 h-5 pb-[1px] text-orange-400" />
  //               </div>
  //               <span className="ml-1.5 flex">
  //                 <span>
  //                   {productDetail?.product_details[0]?.almaa_ratings}{" "}
  //                 </span>
  //                 <span className="mx-1.5">·</span>
  //                 <span className="text-slate-700 dark:text-slate-400 underline">
  //                   {productDetail?.product_feedback.length} reviews
  //                 </span>
  //               </span>
  //             </a>
  //           </div>

  //           {/* ---------- 3 VARIANTS AND SIZE LIST ----------  */}
  //           <div className="mt-6 space-y-7 lg:space-y-8">
  //             {inStock ? renderStatusInstock() : renderStatusSoldout()}
  //             {/* <div className="">{renderVariants()}</div> */}
  //             {/* <div className="">{renderSizeList()}</div> */}
  //           </div>
  //         </div>

  //         {/* QUANTITY OPTION */}
  //         <AppProductChip
  //           label="Select Quantity"
  //           items={quantityOptions}
  //           selectedItem={quantityOption}
  //           onItemChange={handleQuantityOptionChange}
  //         />

  //         {/* BUYING OPTION */}
  //         {/* <AppProductChip
  //           label="Buying Option"
  //           items={buyingOptions}
  //           selectedItem={buyingOption}
  //           onItemChange={setBuyingOption}
  //         /> */}

  //         {/* <div className="my-2">
  //           <h4 className="text-sm font-semibold">Buying Option</h4>

  //           <div className="grid grid-cols-2 gap-4 desktop:gap-6 desktop:flex desktop:flex-col">
  //             {buyingOptions.map((buyingOption) => (
  //               <AppBuyingOptionCard
  //                 key={buyingOption.id}
  //                 buyingOptions={buyingOption}
  //                 selected={buyingOption.selected}
  //                 onClick={() => handleBuyingOption(buyingOption.id)}
  //               />
  //             ))}
  //           </div>
  //         </div> */}

  //         {/*  ---------- 4  QTY AND ADD TO CART BUTTON */}
  //         <div className="flex space-x-3.5">
  //           {hasBuyingOptionSelected.length === 0 && (
  //             <div className="flex items-center justify-center bg-slate-100/70 dark:bg-slate-800/70 px-2 py-3 sm:p-3.5 rounded-full">
  //               <NcInputNumber
  //                 defaultValue={quantitySelected}
  //                 onChange={setQuantitySelected}
  //               />
  //             </div>
  //           )}
  //           <ButtonPrimary
  //             disabled={!inStock}
  //             className={`flex-1 flex-shrink-0 ${
  //               !inStock ? "not-allowed" : ""
  //             }`}
  //             onClick={addToCart}
  //           >
  //             <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
  //             <span className="ml-3">Add to cart</span>
  //           </ButtonPrimary>
  //         </div>

  //         {/* SUM */}
  //         <div className="hidden sm:flex flex-col space-y-4 ">
  //           <p className="text-md text-slate-500 dark:text-slate-300">
  //             Free shipping above ₹2000
  //           </p>
  //           <p className="text-md text-slate-500 dark:text-slate-300">
  //             Cash on delivery available at ₹50 COD Charges
  //           </p>
  //           {/* <div className="space-y-2.5">
  //             <div className="flex justify-between text-slate-600 dark:text-slate-300">
  //               <span className="flex">
  //                 <span>{`Rs.${price.toFixed(2)}  `}</span>
  //                 <span className="mx-2">x</span>
  //                 <span>{`${quantitySelected} `}</span>
  //               </span>

  //               <span>{`$${(price * quantitySelected).toFixed(2)}`}</span>
  //             </div>
  //             <div className="flex justify-between text-slate-600 dark:text-slate-300">
  //               <span>Tax estimate</span>
  //               <span>$0</span>
  //             </div>
  //           </div>
  //           <div className="border-b border-slate-200 dark:border-slate-700"></div>
  //           <div className="flex justify-between font-semibold">
  //             <span>Total</span>
  //             <span>{`$${(price * quantitySelected).toFixed(2)}`}</span>
  //           </div> */}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap !space-y-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold">
            {productDetail?.product_details[0]?.product_name}
          </h2>
          <div className="flex items-center mt-4 sm:mt-5">
            <a
              href="#reviews"
              className="hidden sm:flex items-center text-sm font-medium "
            >
              <div className="">
                <StarIcon className="w-5 h-5 pb-[1px] text-slate-800 dark:text-slate-200" />
              </div>
              <span className="ml-1.5">
                <span>{productDetail?.product_details[0]?.almaa_ratings}</span>
                <span className="mx-1.5">·</span>
                <span className="text-slate-700 dark:text-slate-400 underline">
                  {productDetail?.product_feedback?.length} reviews
                </span>
              </span>
            </a>
            <span className="hidden sm:block mx-2.5">·</span>
            {renderStatus()}

            <div className="ml-auto">
              <LikeSaveBtns
                audioUrl={productDetail?.product_details[0]?.audio}
                onClick={handleWishlist}
              />
            </div>
          </div>
        </div>
        {/*  */}
        {/* <div className="block lg:hidden">{renderSectionSidebar()}</div> */}

        {/*  */}
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/*  */}
        <AccordionInfo
          data={[
            {
              name: "Product Info",
              content: productDetail?.product_details[0]?.short_description,
              // "A miraculous combination of herbs in pal podi magically clears sore throat, sinus headache, running nose, sneezing, improves vision and clears the discolourization of facial skin",
            },
            //   {
            //     name: `Benefits of ${name}`,
            //     content: `<ul class="list-disc list-inside leading-7">
            //   <li>Essential to control plaque of teeth</li>
            //   <li>
            //    Removes odour from teeth
            //   </li>
            //   <li>
            //     Brushing your teeth twice a day is good for health
            //   </li>
            //   <li>
            //     Enhances immunity
            //   </li>
            // </ul>`,
            //   },
            {
              name: `How to Use?`,
              // content: `<ul class="list-disc list-inside leading-7"><li>${productDetail?.product_details[0]?.howtouse}</li></ul>`,
              content: productDetail?.product_details[0]?.howtouse,
              //     `<ul class="list-disc list-inside leading-7">
              //   <li>Essential to control plaque of teeth</li>
              //   <li>
              //    Removes odour from teeth
              //   </li>
              //   <li>
              //     Brushing your teeth twice a day is good for health
              //   </li>
              //   <li>
              //     Enhances immunity
              //   </li>
              // </ul>`,
            },
            {
              name: `Suitable For`,
              content: `<ul class="list-disc list-inside leading-7">
            <li>${productDetail?.product_details[0]?.suitablefor}</li>  
            </ul>`,
              // <li>Essential to control plaque of teeth</li>
              // <li>
              //  Removes odour from teeth
              // </li>
              // <li>
              //   Brushing your teeth twice a day is good for health
              // </li>
              // <li>
              //   Enhances immunity
              // </li>
            },
          ]}
          panelClassName="p-4 pt-3.5 text-slate-600 text-base dark:text-slate-300 leading-7"
        />
      </div>
    );
  };

  const renderSection2 = () => {
    return (
      <div className="listingSection__wrap !border-b-0 !pb-0">
        <h2 className="text-3xl font-semibold">Product details</h2>
        {/* <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div> */}
        <div className="prose prose-sm sm:prose dark:prose-invert sm:max-w-4xl">
          <p
            className="text-slate-700 font-normal"
            dangerouslySetInnerHTML={{
              __html: productDetail?.product_details[0]?.full_description,
            }}
          >
            {/* Apart from usual tooth cleansing, the palpodi is indicated to treat
            45 types of tooth disorders. A miraculous combinations of herbs in
            pal podi magically clears sore throat, sinus, headache, running
            nose, sneezing, improves vision and clears the discolouration of
            facial skin. */}
            {/* {productDetail?.product_details[0]?.full_description} */}
          </p>
          {/* <ul className="list-inside leading-7">
            <li>Essential to control plaque of teeth</li>
            <li>Removes odour from teeth</li>
            <li>Brushing your teeth twice a day is good for health</li>
            <li>Enhances Immunity</li>
          </ul> */}
        </div>
        {/* ---------- 6 ----------  */}
      </div>
    );
  };

  const renderReviews = () => {
    return (
      <div id="reviews" className="scroll-mt-[150px]">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold flex items-center">
          <Rating
            readonly
            transition
            allowFraction
            initialValue={+productDetail?.product_details[0]?.almaa_ratings}
            size={38}
          />
          <span className="ml-1.5">
            {" "}
            {productDetail?.product_details[0]?.almaa_ratings} &nbsp;&nbsp;
            &nbsp; {productDetail?.product_feedback?.length} Reviews
          </span>
        </h2>

        {/* comment */}
        <div className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-11 gap-x-28">
            {productDetail?.product_feedback?.map((feedback) => (
              <ReviewItem
                key={feedback.prodcustfb_id}
                data={{
                  comment: feedback.comments,
                  date: new Date().toString(),
                  name: feedback.name,
                  starPoint: +feedback.user_ratings,
                }}
              />
            ))}
            {/* <ReviewItem />
            <ReviewItem
              data={{
                comment: `I love the charcoal heavyweight hoodie. Still looks new after plenty of washes. 
                  If you’re unsure which hoodie to pick.`,
                date: "December 22, 2021",
                name: "Stiven Hokinhs",
                starPoint: 5,
              }}
            />
            <ReviewItem
              data={{
                comment: `The quality and sizing mentioned were accurate and really happy with the purchase. Such a cozy and comfortable hoodie. 
                Now that it’s colder, my husband wears his all the time. I wear hoodies all the time. `,
                date: "August 15, 2022",
                name: "Gropishta keo",
                starPoint: 5,
              }}
            />
            <ReviewItem
              data={{
                comment: `Before buying this, I didn't really know how I would tell a "high quality" sweatshirt, but after opening, I was very impressed. 
                The material is super soft and comfortable and the sweatshirt also has a good weight to it.`,
                date: "December 12, 2022",
                name: "Dahon Stiven",
                starPoint: 5,
              }}
            /> */}
          </div>

          <ButtonSecondary
            onClick={() => setIsOpenModalViewAllReviews(true)}
            className="mt-10 border border-slate-300 dark:border-slate-700 "
          >
            Show me all {productDetail?.product_feedback?.length} reviews
          </ButtonSecondary>
        </div>
      </div>
    );
  };

  const renderExperts = (expert) => {
    return (
      <div
        key={expert.doctor_id}
        className="bg-slate-100 rounded-3xl grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-4 py-6 px-10 mb-20"
      >
        <div>
          <NcImage
            className="sm:w-full md:w-56 h-auto rounded-2xl"
            src={expert.docphoto}
            alt={expert.name}
          />
        </div>
        <div className="col-span-3">
          <h3 className="md:text-lg lg:text-2xl font-semibold pt-2">
            {expert.name}
          </h3>
          <h4 className="text-zinc-500 font-medium mt-1 mb-2">
            {expert.specialization}
          </h4>
          <p className="text-sm md:text-md lg:text-lg text-black leading-7">
            {expert.content}
          </p>
        </div>
      </div>
    );
  };

  const renderIngredients = (item) => {
    return (
      <div key={item.ingredient_id}>
        <NcImage className="rounded-2xl " src={item.image} alt={item.name} />
        <div className="grid justify-items-stretch">
          <h5 className="font-semibold justify-self-center text-dark-900 dark:text-white text-2xl mt-2">
            {item.name}
          </h5>
          <p className="justify-self-center text-sm font-semibold text-slate-500 dark:text-white">
            {item.desc}
          </p>
        </div>
      </div>
    );
  };

  const expertTalkItems = [
    {
      id: 1,
      src: Expert,
      name: "Dr.Manikandan B.A.M.S",
      profession: "Ayurveda Doctor, General Medicine",
      content:
        "Was going through post partum hair fall, I was so depressed as no oils were showing result. This was my final hope & honestly it stands true to its benefits. Was going through post partum hair fall, I was so depressed as no oils were showing result. Was going through post partum hair fall, I was so depressed as no oils were showing result. This was my final hope & honestly it stands true to its benefits. Was going through post partum hair fall, I was so depressed as no oils were showing result.",
    },
    {
      id: 2,
      src: Expert,
      name: "Dr.Manikandan B.A.M.S",
      profession: "Ayurveda Doctor, General Medicine",
      content:
        "Was going through post partum hair fall, I was so depressed as no oils were showing result. This was my final hope & honestly it stands true to its benefits. Was going through post partum hair fall, I was so depressed as no oils were showing result. Was going through post partum hair fall, I was so depressed as no oils were showing result. This was my final hope & honestly it stands true to its benefits. Was going through post partum hair fall, I was so depressed as no oils were showing result.",
    },
    {
      id: 3,
      src: Expert,
      name: "Dr.Manikandan B.A.M.S",
      profession: "Ayurveda Doctor, General Medicine",
      content:
        "Was going through post partum hair fall, I was so depressed as no oils were showing result. This was my final hope & honestly it stands true to its benefits. Was going through post partum hair fall, I was so depressed as no oils were showing result. Was going through post partum hair fall, I was so depressed as no oils were showing result. This was my final hope & honestly it stands true to its benefits. Was going through post partum hair fall, I was so depressed as no oils were showing result.",
    },
  ];

  const expertSlideGlideOptions: Glide.Options | any = {
    perView: 1,
    gap: 32,
    bound: true,
    breakpoints: {
      1280: {
        gap: 28,
        perView: 1,
      },
      1279: {
        gap: 20,
        perView: 1,
      },
      1023: {
        gap: 20,
        perView: 1,
      },
      768: {
        gap: 20,
        perView: 1,
      },
      500: {
        gap: 20,
        perView: 1,
      },
    },
  };

  const handleLike = (id: string) => {
    console.log(relatedProducts);
    const updatedProducts = relatedProducts.map((p) =>
      p.product_id === id ? { ...p, isLiked: (p.isLiked = !p.isLiked) } : p
    );
    const product = updatedProducts.find((p) => p.product_id === id);

    if (product.isLiked) dispatch(addItemToWishlist(product.product_id));
    else dispatch(removeItemFromWishlist(product.product_id));

    setRelatedProducts(updatedProducts);
  };

  return (
    <div
      className={`ListingDetailPage nc-ProductDetailPage2 ${className}`}
      data-nc-id="ProductDetailPage2"
    >
      {/* SINGLE HEADER */}
      <>
        <ProductDisplay productDetail={productDetail} />
        {/* <header className="container mt-8 sm:mt-10">
          <div className="relative ">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-6">
              <div
                className="col-span-2 md:col-span-1 row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
                onClick={() => handleOpenModal(0)}
              >
                <NcImage
                  containerClassName="aspect-w-6 aspect-h-6 lg:aspect-h-6 md:absolute md:inset-0"
                  className="object-cover w-full h-full rounded-md sm:rounded-xl"
                  // src={LIST_IMAGES_DEMO[0]}
                  src={productDetail?.product_details[0]?.product_image1}
                />
                <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-40 transition-opacity"></div>
              </div>

              <div
                className="col-span-1 row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
                onClick={() => handleOpenModal(1)}
              >
                <NcImage
                  containerClassName="aspect-w-6 aspect-h-6 lg:aspect-h-6"
                  className="object-cover w-full h-full rounded-md sm:rounded-xl"
                  // src={LIST_IMAGES_DEMO[1]}
                  src={productDetail?.product_details[0]?.product_image2}
                />
                <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-40 transition-opacity"></div>
              </div>

              <div
                className="col-span-1 row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
                onClick={() => handleOpenModal(2)}
              >
                <NcImage
                  containerClassName="aspect-w-6 aspect-h-6 lg:aspect-h-6"
                  className="object-cover w-full h-full rounded-md sm:rounded-xl"
                  // src={LIST_IMAGES_DEMO[2]}
                  src={productDetail?.product_details[0]?.product_image3}
                />
                <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-40 transition-opacity"></div>
              </div>
            </div>
            <div
              className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-white text-slate-500 cursor-pointer hover:bg-slate-200 z-10"
              onClick={() => handleOpenModal(0)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              <span className="ml-2 text-neutral-800 text-sm font-medium">
                Show all photos
              </span>
            </div>
          </div>
        </header> */}
        {/* MODAL PHOTOS */}
        <ModalPhotos
          imgs={[
            productDetail?.product_details[0]?.product_image1,
            productDetail?.product_details[0]?.product_image2,
            productDetail?.product_details[0]?.product_image3,
            productDetail?.product_details[0]?.product_image4,
          ]}
          isOpen={isOpen}
          onClose={handleCloseModal}
          initFocus={openFocusIndex}
          uniqueClassName="nc-ProductDetailPage2__modalPhotos"
        />
      </>

      {/* MAIN */}
      <main className="container relative z-10 mt-9 sm:mt-11 flex ">
        {/* CONTENT */}
        <section className="w-full space-y-10 lg:pr-14 lg:space-y-14">
          {renderSection1()}
          {renderSection2()}
        </section>

        {/* SIDEBAR */}
        {/* <aside className="flex-grow">
          <div className="hidden lg:block sticky top-28">
            {renderSectionSidebar()}
          </div>
        </aside> */}
      </main>
      {/* KEY BENEFITS SECTION */}
      {/* <section className="container mb-10 lg:pb-28 pt-48 space-y-14">
        <div className={`nc-SectionPromo2 ${className}`}>
          <div className="relative flex flex-col lg:flex-row lg:justify-end bg-yellow-50 dark:bg-slate-800 rounded-2xl sm:rounded-[40px] p-4 pb-0 sm:p-5 sm:pb-0 lg:p-24">
            <div className="lg:w-[50%] max-w-lg relative">
              <p className="font-semibold text-2xl">Key Benefits</p>
              <h2 className="font-semibold text-2xl sm:text-4xl xl:text-5xl 2xl:text-6xl mt-2 sm:mt-2 !leading-[1.13] tracking-tight">
                {productDetail?.product_details[0]?.product_name}
              </h2>
              {productDetail?.product_details[0]?.key_benefits && (
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      productDetail?.product_details[0]?.key_benefits.replace(
                        "<ul>",
                        '<ul class="text-lg list-disc list-inside leading-7 text-yellow-950 mt-3">'
                      ),
                  }}
                ></div>
              )}
            </div>

            <NcImage
              containerClassName="relative block lg:absolute lg:left-0 lg:bottom-0 mt-10 lg:mt-0 max-w-xl lg:max-w-[calc(52%-42px)]"
              src={productDetail?.product_details[0]?.bottom_image}
            />
          </div>
        </div>
      </section> */}

      {/* KEY INGREDIENTS */}
      <section className="container mb-24 overflow-hidden">
        {/* <h4 className="text-3xl font-semibold mb-10">Key Ingredients</h4>
        <div className="grid grid-cols-1 gap-y-10 gap-x-5 md:grid-cols-2 lg:grid-cols-4 mb-10">
          {ingredients.map((ing) => (
            <div key={ing.id}>
              <img className="rounded-2xl " src={ing.src} alt={ing.title} />
              <div className="grid justify-items-stretch">
                <h5 className="font-semibold justify-self-center text-dark-900 dark:text-white text-2xl mt-2">
                  {ing.title}
                </h5>
                <p className="justify-self-center text-sm font-semibold text-slate-500 dark:text-white">
                  {ing.shortDesc}
                </p>
              </div>
            </div>
          ))}
        </div> */}

        {/* SLIDER SECTION */}
        {/* {productDetail?.product_ingred && (
          <AppSlider
            data={productDetail?.product_ingred}
            renderChildren={renderIngredients}
            glideOptions={{
              perView: 4,
              gap: 32,
              bound: true,
              breakpoints: {
                1280: {
                  perView: 4,
                },
                1024: {
                  gap: 20,
                  perView: 4,
                },
                768: {
                  gap: 20,
                  perView: 3,
                },
                640: {
                  gap: 20,
                  perView: 1,
                },
                500: {
                  gap: 20,
                  perView: 1,
                },
              },
            }}
          >
            <Heading fontClass="text-3xl md:text-3xl font-semibold" hasNextPrev>
              Key Ingredients
            </Heading>
          </AppSlider>
        )} */}
        {/* <ButtonSecondary className="border border-slate-300 dark:border-slate-700 md:text-lg md:px-20 md:py-4">
          Show all ingredients
        </ButtonSecondary> */}
      </section>

      {/* EXPERT TALK */}
      {/* <section className="container mb-10 overflow-hidden"> */}
      {/* SLIDER SECTION */}
      {/* {productDetail?.product_experttalk && (
          <AppSlider
            data={productDetail.product_experttalk}
            renderChildren={renderExperts}
            glideOptions={expertSlideGlideOptions}
          >
            <Heading fontClass="text-3xl md:text-3xl font-semibold" hasNextPrev>
              Expert Talk
            </Heading>
          </AppSlider>
        )} */}

      {/* VIDEO */}
      {/* <div
          className="group aspect-w-16 aspect-h-16 sm:aspect-h-9 bg-neutral-800 rounded-3xl overflow-hidden border-4 border-white dark:border-neutral-900 sm:rounded-[50px] sm:border-[10px] z-0"
          title={"expert Meditating"}
          onClick={() => setShowVideoPopup(!showVideoPopup)}
        >
          <div className="cursor-pointer absolute inset-0 flex items-center justify-center z-10">
            <img src={videoIcon} alt="icon" />
          </div>
          <NcImage
            containerClassName="absolute inset-0 rounded-3xl overflow-hidden z-0"
            className="object-cover w-full h-full transition-transform group-hover:scale-105 duration-300  "
            src={video}
            title={"expert Meditating"}
            alt={"expert Meditating"}
          />
        </div> */}
      {/* </section> */}
      {/* {showVideoPopup && (
        <VideoPopup
          url={productDetail?.product_details[0]?.video}
          isOpen={showVideoPopup}
          closeModal={() => setShowVideoPopup(false)}
          backdropClick={() => setShowVideoPopup(false)}
        />
      )} */}

      {/* OTHER SECTION */}
      <section className="container pb-24 lg:pb-28 mb-10 space-y-14">
        {/* <hr className="border-slate-200 dark:border-slate-700" /> */}
        <h4 className="text-3xl font-semibold mb-10">Customer Reviews</h4>
        {renderReviews()}

        {/* FAQ */}
        <section>
          <h4 className="text-3xl font-semibold mb-10">
            Frequently Asked Questions
          </h4>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-[30%,70%]">
            <div>
              <img src={faqImg} alt="FAQ" />
            </div>
            <div>
              <AccordionInfo data={faqs} />
            </div>
          </div>
        </section>

        {/* <hr className="border-slate-200 dark:border-slate-700" /> */}

        {relatedProducts.length > 0 && (
          <SectionSliderProductCard
            heading="Similar Products"
            subHeading=""
            headingFontClassName="text-3xl font-semibold"
            headingClassName="mb-10 text-neutral-900 dark:text-neutral-50"
            data={relatedProducts}
            onLike={handleLike}
          />
        )}
      </section>

      {/* POLICY SECTION */}
      {/* <section className="container mb-40">
        <Policy />
      </section> */}

      {/* MODAL VIEW ALL REVIEW */}
      <ModalViewAllReviews
        show={isOpenModalViewAllReviews}
        onCloseModalViewAllReviews={() => setIsOpenModalViewAllReviews(false)}
        rating={productDetail?.product_details[0]?.almaa_ratings}
        reviews={productDetail?.product_feedback?.map((f) => ({
          id: f.prodcustfb_id,
          name: f.name,
          date: new Date().toString(),
          comment: f.comments,
          starPoint: +f.user_ratings,
        }))}
      />

      {/* EMAIL SUBSCRIBE SECTION */}
      {/* <EmailSubscribeSection /> */}
    </div>
  );
};

export default ProductDetailPage2;
