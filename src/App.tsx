import { useEffect, useContext } from "react";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import {
  TwitterShareButton,
  WhatsappShareButton,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import { useQuery, useMutation } from "@tanstack/react-query";
import "./App.css";
import Axios from "axios";
import Quote from "./components/Quote";
import { QuoteContext } from "./contexts/QuoteContext";

type ApiResponse = {
  author: string;
  content: string;
};

function App() {
  const { quotes, setQuotes, setActiveIndex, activeIndex } =
    useContext(QuoteContext);

  const {
    data: initialData,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["quote"],
    queryFn: () =>
      Axios.get<ApiResponse>("https://majestic-naiad-7dace3.netlify.app").then(
        (res) => res.data
      ),
    refetchOnWindowFocus: false,
  });

  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      return Axios.get<ApiResponse>(
        "https://majestic-naiad-7dace3.netlify.app"
      ).then(({ data }) => data);
    },
  });

  useEffect(() => {
    if (isSuccess) setQuotes([initialData]);
  }, [isSuccess, initialData, setQuotes]);

  const handleNext = async () => {
    if (activeIndex === quotes.length - 1) {
      const data = await mutateAsync();

      setQuotes((prev) => [...prev, data]);

      setActiveIndex(activeIndex + 1);
    } else {
      setActiveIndex(activeIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  if (isLoading) return <p>"Loading..."</p>;

  return (
    <div className="h-screen bg-gray-100">
      <div className="h-10 w-screen bg-orange-500"></div>
      <div className="container my-0 mx-auto mt-16 max-w-4xl justify-center">
        <Quote />
        <div className="flex flex-wrap justify-between content-center">
          <div>
            <button
              // TODO reasearch on difference between commented code and original
              // onClick={() => handlePrevious()}
              onClick={handlePrevious}
              className={
                activeIndex == 0
                  ? "border border-black p-3 md:p-5 rounded-full opacity-50 mr-7"
                  : "border border-black p-3 md:p-5 rounded-full mr-7"
              }
            >
              <GrPrevious />
            </button>

            <button
              onClick={() => handleNext()}
              className="border border-black p-3 md:p-5 rounded-full"
            >
              <GrNext />
            </button>
          </div>

          <div className="flex flex-wrap gap-2.5 content-center">
            <h1 className="text-2xl text-slate-600">Share at:</h1>
            <div className="border border-black rounded-full flex h-8 w-8 flex-wrap justify-center content-center">
              <TwitterShareButton
                title={`"${quotes[activeIndex]?.content}" - ${quotes[activeIndex]?.author}`}
                url="https://react-random-quote-application.netlify.app/"
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
            </div>

            <div className="border border-black rounded-full flex h-8 w-8 flex-wrap justify-center content-center">
              <WhatsappShareButton
                title={`"${quotes[activeIndex]?.content}" - ${quotes[activeIndex]?.author}`}
                url="https://react-random-quote-application.netlify.app/"
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 h-10 w-screen bg-orange-500" />
    </div>
  );
}

export default App;
