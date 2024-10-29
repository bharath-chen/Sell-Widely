import { FC, useState } from "react";
import ButtonPrimary from "../../../shared/Button/ButtonPrimary";
import AccordionInfo from "../../../containers/ProductDetailPage/AccordionInfo";
import { useLocation } from "react-router-dom";
import { IDoctor } from "../../../services/doctors-service";

export interface ProductDetailPageProps {
  className?: string;
}

const DoctorDetail: FC<ProductDetailPageProps> = ({ className = "" }) => {
  const { state } = useLocation();

  const [doctorDetail, setDoctorDetail] = useState<IDoctor | null>(
    state.doctor
  );

  const handleConnect = () => {
    console.log("Connect!");
  };

  const connectThroughWhatsapp = () => {
    console.log("Whatsapp Clicked!");
  };

  const accordionData = [
    {
      name: "Specialization",
      content: doctorDetail.specialization,
    },
  ];

  const renderSectionContent = () => {
    return (
      <div className="space-y-7 2xl:space-y-8">
        <div className="w-full max-w bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col pl-5 pb-5 mt-5">
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white pb-2">
              Name: {doctorDetail.name}
            </h5>
            <span className="text-md text-gray-500 dark:text-gray-400 pb-2">
              Qualification: {doctorDetail.qualification}
            </span>
          </div>
        </div>

        {/*  ---------- 4  QTY AND ADD TO CART BUTTON */}
        <div className="flex space-x-3.5">
          <ButtonPrimary
            className="flex-1 flex-shrink-0"
            onClick={handleConnect}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-gray-800 text-white dark:text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              />
            </svg>

            {/* <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" /> */}
            <span className="ml-3">Call us</span>
          </ButtonPrimary>
          <ButtonPrimary
            className="flex-1 flex-shrink-0"
            onClick={connectThroughWhatsapp}
          >
            <svg
              className="w-6 h-6 text-gray-800 text-white dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12 4a8 8 0 0 0-6.895 12.06l.569.718-.697 2.359 2.32-.648.379.243A8 8 0 1 0 12 4ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.96 9.96 0 0 1-5.016-1.347l-4.948 1.382 1.426-4.829-.006-.007-.033-.055A9.958 9.958 0 0 1 2 12Z"
                clipRule="evenodd"
              />
              <path
                fill="currentColor"
                d="M16.735 13.492c-.038-.018-1.497-.736-1.756-.83a1.008 1.008 0 0 0-.34-.075c-.196 0-.362.098-.49.291-.146.217-.587.732-.723.886-.018.02-.042.045-.057.045-.013 0-.239-.093-.307-.123-1.564-.68-2.751-2.313-2.914-2.589-.023-.04-.024-.057-.024-.057.005-.021.058-.074.085-.101.08-.079.166-.182.249-.283l.117-.14c.121-.14.175-.25.237-.375l.033-.066a.68.68 0 0 0-.02-.64c-.034-.069-.65-1.555-.715-1.711-.158-.377-.366-.552-.655-.552-.027 0 0 0-.112.005-.137.005-.883.104-1.213.311-.35.22-.94.924-.94 2.16 0 1.112.705 2.162 1.008 2.561l.041.06c1.161 1.695 2.608 2.951 4.074 3.537 1.412.564 2.081.63 2.461.63.16 0 .288-.013.4-.024l.072-.007c.488-.043 1.56-.599 1.804-1.276.192-.534.243-1.117.115-1.329-.088-.144-.239-.216-.43-.308Z"
              />
            </svg>

            {/* <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" /> */}
            <span className="ml-3">Whatsapp</span>
          </ButtonPrimary>
        </div>

        {/* ---------- 5 ----------  */}
        <AccordionInfo data={accordionData} />
      </div>
    );
  };

  //   const renderDetailSection = () => {
  //     return (
  //       <div className="">
  //         <h2 className="text-2xl font-semibold">Doctor Details</h2>
  //         <div className="prose prose-sm sm:prose dark:prose-invert sm:max-w-4xl mt-7">
  //           <p>
  //             The patented eighteen-inch hardwood Arrowhead deck --- finely
  //             mortised in, makes this the strongest and most rigid canoe ever
  //             built. You cannot buy a canoe that will afford greater satisfaction.
  //           </p>
  //           <p>
  //             The St. Louis Meramec Canoe Company was founded by Alfred Wickett in
  //             1922. Wickett had previously worked for the Old Town Canoe Co from
  //             1900 to 1914. Manufacturing of the classic wooden canoes in Valley
  //             Park, Missouri ceased in 1978.
  //           </p>
  //           <ul>
  //             <li>Regular fit, mid-weight t-shirt</li>
  //             <li>Natural color, 100% premium combed organic cotton</li>
  //             <li>
  //               Quality cotton grown without the use of herbicides or pesticides -
  //               GOTS certified
  //             </li>
  //             <li>Soft touch water based printed in the USA</li>
  //           </ul>
  //         </div>
  //       </div>
  //     );
  //   };

  //   const renderReviews = () => {
  //     return (
  //       <div className="">
  //         {/* HEADING */}
  //         <h2 className="text-2xl font-semibold flex items-center">
  //           <StarIcon className="w-7 h-7 mb-0.5" />
  //           <span className="ml-1.5"> 4,87 · 142 Reviews</span>
  //         </h2>

  //         {/* comment */}
  //         <div className="mt-10">
  //           <div className="grid grid-cols-1 md:grid-cols-2 gap-y-11 gap-x-28">
  //             <ReviewItem />
  //             <ReviewItem
  //               data={{
  //                 comment: `I love the charcoal heavyweight hoodie. Still looks new after plenty of washes.
  //                   If you’re unsure which hoodie to pick.`,
  //                 date: "December 22, 2021",
  //                 name: "Stiven Hokinhs",
  //                 starPoint: 5,
  //               }}
  //             />
  //             <ReviewItem
  //               data={{
  //                 comment: `The quality and sizing mentioned were accurate and really happy with the purchase. Such a cozy and comfortable hoodie.
  //                 Now that it’s colder, my husband wears his all the time. I wear hoodies all the time. `,
  //                 date: "August 15, 2022",
  //                 name: "Gropishta keo",
  //                 starPoint: 5,
  //               }}
  //             />
  //             <ReviewItem
  //               data={{
  //                 comment: `Before buying this, I didn't really know how I would tell a "high quality" sweatshirt, but after opening, I was very impressed.
  //                 The material is super soft and comfortable and the sweatshirt also has a good weight to it.`,
  //                 date: "December 12, 2022",
  //                 name: "Dahon Stiven",
  //                 starPoint: 5,
  //               }}
  //             />
  //           </div>

  //           <ButtonSecondary
  //             onClick={() => setIsOpenModalViewAllReviews(true)}
  //             className="mt-10 border border-slate-300 dark:border-slate-700 "
  //           >
  //             Show me all 142 reviews
  //           </ButtonSecondary>
  //         </div>
  //       </div>
  //     );
  //   };

  return (
    <div className={`nc-ProductDetailPage ${className}`}>
      {/* MAIn */}
      <main className="container mt-5 lg:mt-11">
        <div className="lg:flex">
          {/* CONTENT */}
          <div className="lg:w-[40%] ">
            {/* HEADING */}
            <div className="relative">
              <div className="aspect-w-16 aspect-h-16">
                <img
                  src={doctorDetail.profile_picture}
                  className="md:w-full rounded-2xl object-cover"
                  alt={doctorDetail.name}
                />
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="w-full lg:w-[60%] pt-10 lg:pt-0 lg:pl-7 xl:pl-9 2xl:pl-10">
            {renderSectionContent()}
          </div>
        </div>

        {/* DETAIL AND REVIEW */}
        <div className="mt-12 sm:mt-16 space-y-10 sm:space-y-16">
          <div className="block xl:hidden">{/* <Policy /> */}</div>

          {/* {renderDetailSection()} */}

          {/* <hr className="border-slate-200 dark:border-slate-700" />

          {renderReviews()} */}

          {/* <hr className="border-slate-200 dark:border-slate-700" /> */}

          {/* OTHER SECTION */}
          {/* <SectionSliderProductCard
            heading="Customers also purchased"
            subHeading=""
            headingFontClassName="text-2xl font-semibold"
            headingClassName="mb-10 text-neutral-900 dark:text-neutral-50"
          /> */}

          {/* SECTION */}
          {/* <div className="pb-20 xl:pb-28 lg:pt-14">
            <SectionPromo2 />
          </div> */}
        </div>
      </main>

      {/* MODAL VIEW ALL REVIEW */}
      {/* <ModalViewAllReviews
        show={isOpenModalViewAllReviews}
        onCloseModalViewAllReviews={() => setIsOpenModalViewAllReviews(false)}
      /> */}
    </div>
  );
};

export default DoctorDetail;
