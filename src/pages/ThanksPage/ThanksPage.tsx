import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import NcImage from "../../shared/NcImage/NcImage";
import SuccessImage from "../../assets/Almaa-Order-min.png";

const ThanksPage: React.FC = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    const redirectTimer = setTimeout(() => {
      navigate("/account-my-order");
    }, 10000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  const routeToMyOrdersPage = () => {
    navigate("/account-my-order");
  };

  return (
    <div className="nc-ThankYouPage">
      <Helmet>
        <title>Thank You - Order Success</title>
      </Helmet>
      <div className="container relative pt-5 pb-16 lg:pb-20 lg:pt-5">
        <header className="text-center max-w-2xl mx-auto space-y-4">
          <NcImage src={SuccessImage} />
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">
            Thank you for your order!
          </h2>
          <p className="text-sm text-neutral-800 sm:text-base dark:text-neutral-200">
            You will be redirected to your orders page in{" "}
            <span className="text-lg font-bold">{countdown}</span> seconds.
          </p>
          <div className="pt-8">
            <ButtonPrimary onClick={routeToMyOrdersPage}>
              View My Orders Now
            </ButtonPrimary>
          </div>
        </header>
      </div>
    </div>
  );
};

export default ThanksPage;
