import { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import MyRouter from "./routers/index";
import Spinner from "./components/Spinner/Spinner";
import { useAppDispatch } from "./hooks/hooks";
import { hideLoader, showLoader } from "./features/loader/loaderSlice";
import ModalPopup from "./shared/ModalPopup/ModalPopup";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(showLoader());

    setTimeout(() => {
      dispatch(hideLoader());
    }, 1000);
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Sell Widely</title>
        <meta name="description" content="Sell Widely || Shop - eCommerce" />
      </Helmet>
      {/* MAIN APP */}
      <Spinner size="large" color="primary" />
      <div className="bg-white text-base dark:bg-slate-900 text-slate-900 dark:text-slate-200">
        <MyRouter />
        <ModalPopup />
      </div>
    </HelmetProvider>
  );
}

export default App;
