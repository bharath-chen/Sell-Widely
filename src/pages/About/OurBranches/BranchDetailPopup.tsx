import { useState } from "react";
import ButtonPrimary from "../../../shared/Button/ButtonPrimary";
import "../OurBranches/OurBranches.css";
import GMap from "../../../components/GMap/GMap";
import { IBranch } from "../../../services/branches-service";

// interface Branch {
//   picture: string;
//   name: string;
//   address: string;
//   contactInfo: string;
//   whatsapp: string;
//   phone: string;
//   email: string;
// }

interface BranchDetailPopupProps {
  branch: IBranch;
  onClose: () => void;
}

const BranchDetailPopup = ({ branch, onClose }: BranchDetailPopupProps) => {
  const handleOutsideClick = (event) => {
    if (event.target.classList.contains("popup-overlay")) {
      onClose();
    }
  };

  const dialPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, "*", 0, "#"];

  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState<string>("");

  const clearPhoneNumber = () => {
    setEnteredPhoneNumber("");
  };

  const handleWhatsapp = () => {
    window.open(`https://wa.me/${branch.contact_number}`, "_blank");
  };

  const handleCall = () => {
    window.location.href = `tel:${branch.contact_number}`;
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center popup-overlay z-[999]"
      onClick={handleOutsideClick}
    >
      <div className="bg-white rounded-lg overflow-hidden max-w-md w-full m-4 sm:m-8 lg:m-12 relative">
        <button
          className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800 focus:outline-none"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="p-8 max-h-[700px] overflow-y-auto">
          {/* Add overflow-y-auto to make the content scrollable */}
          {/* <img
            src=""
            alt="Branch"
            className="w-32 h-32 rounded-full mb-2 mx-auto"
          /> */}
          <h2 className="text-xl font-bold text-center mb-2">
            {branch.branch_name}
          </h2>
          <p className="text-center text-gray-600 mb-4">{branch.location}</p>
          <p className="text-center text-gray-600 mb-4">
            {branch.contact_number}
          </p>
          <GMap />
          <div className="flex flex-col justify-between mt-5">
            <div className="flex sm:flex-col md:flex-row justify-center">
              <ButtonPrimary className="mr-5 w-full" onClick={handleWhatsapp}>
                <svg
                  className="w-6 h-6 text-gray-800 text-white"
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
                {/* <a
                  href={`https://wa.me/${branch.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn mr-4"
                >
                  Whatsapp
                </a> */}
              </ButtonPrimary>
              <ButtonPrimary className="w-full" onClick={handleCall}>
                <svg
                  className="w-6 h-6 text-gray-800 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18.427 14.768 17.2 13.542a1.733 1.733 0 0 0-2.45 0l-.613.613a1.732 1.732 0 0 1-2.45 0l-1.838-1.84a1.735 1.735 0 0 1 0-2.452l.612-.613a1.735 1.735 0 0 0 0-2.452L9.237 5.572a1.6 1.6 0 0 0-2.45 0c-3.223 3.2-1.702 6.896 1.519 10.117 3.22 3.221 6.914 4.745 10.12 1.535a1.601 1.601 0 0 0 0-2.456Z"
                  />
                </svg>
                {/* <a className="btn mr-4">Phone Call</a> */}
              </ButtonPrimary>
            </div>
            {/* <div className="grid grid-cols-3 gap-4 my-5">
              <div className="col-span-3 text-center mt-4">
                <p className="text-lg font-bold">Entered Phone Number:</p>
                <p className="text-xl">{enteredPhoneNumber}</p>
              </div>
              {dialPad.map((number) => (
                <button
                  key={number}
                  onClick={() =>
                    setEnteredPhoneNumber(
                      (prevNumber) => prevNumber + number.toString()
                    )
                  }
                  className="btn btn-dialpad-sm"
                >
                  {number}
                </button>
              ))}
              <ButtonPrimary className="col-span-3" onClick={clearPhoneNumber}>
                Clear
              </ButtonPrimary>
            </div> */}

            {/* <ButtonPrimary className="mt-0">
              <svg
                className="w-6 h-6 text-gray-800 text-white mr-5"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <rect x="3" y="5" width="18" height="14" rx="2" />{" "}
                <polyline points="3 7 12 13 21 7" />
              </svg>
              <a href={`mailto:${branch.email}`} className="btn">
                Email Us
              </a>
            </ButtonPrimary> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchDetailPopup;

// https://maps.app.goo.gl/XGZoKARJeqSaeVB38
