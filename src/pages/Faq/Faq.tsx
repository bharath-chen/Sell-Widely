import { useEffect, useState } from "react";
import { CanceledError } from "axios";
import Heading from "../../shared/Heading/Heading";
import faqService from "../../services/faq-service";
import AppAccordion from "../../components/AppAccordion/AppAccordion";
import { IFaq } from "../../services/faq-service";
import { hideLoader, showLoader } from "../../features/loader/loaderSlice";
import { useAppDispatch } from "../../hooks/hooks";

const Faq = () => {
  const dispatch = useAppDispatch();

  const [faqs, setFaqs] = useState<IFaq[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const { request, cancel } = faqService.getAll<IFaq>();

    dispatch(showLoader());

    request
      .then((res) => {
        setFaqs(res.data);
        dispatch(hideLoader());
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;

        dispatch(hideLoader());
        setError(err.message);
      });

    return () => cancel();
  }, []);

  return (
    <div className="container mx-auto px-4 my-20">
      <div className="grid grid-cols-1">
        <Heading desc="">FAQs</Heading>
        <div className="w-full rounded-2xl space-y-2.5">
          {faqs.map((item) => (
            <AppAccordion
              key={item.faq_id}
              title={item.question}
              body={item.answer}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
