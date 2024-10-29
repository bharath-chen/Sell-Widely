import styles from "./MiniOfferBanner.module.css";
import { Link } from "react-router-dom";

const MiniOfferBanner = () => {
  return (
    <div className="sticky top-0 w-full z-40">
      <div className="flex items-center justify-center bg-primary-500 text-white dark:bg-white dark:text-slate-900">
        <Link to="/products">
          <p className="py-3 px-3 font-medium text-xs sm:text-base">
            Get Premium Subscription & Save More with Multiple Benefits{" "}
            <span
              className={`${styles.highlightText} font-semibold dark:text-primary-900`}
            >
              @ Just 200 INR Per Month{" "}
            </span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default MiniOfferBanner;
