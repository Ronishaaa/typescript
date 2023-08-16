import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import "./App.css";
import Axios from "axios";
import Quote from "./components/Quote";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect, useContext } from "react";
import { QuoteContext } from "./contexts/QuoteContext";
import { TwitterShareButton, WhatsappShareButton } from "react-share";
import { TwitterIcon, WhatsappIcon } from "react-share";

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
      Axios.get<ApiResponse>("https://api.quotable.io/random").then(
        (res) => res.data
      ),
  });
  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      return Axios.get<ApiResponse>("https://api.quotable.io/random").then(
        ({ data }) => data
      );
    },
  });

  useEffect(() => {
    if (isSuccess) setQuotes([initialData]);
  }, [isSuccess, initialData, setQuotes]);
  const handleNext = async () => {
    if (activeIndex === quotes.length - 1) {
      const data = await mutateAsync();

      setQuotes((prev) => {
        return [...prev, data];
      });
      console.log(data);
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

  if (isLoading) return "Loading...";
  return (
    <div className="h-screen bg-gray-100">
      <div className="top-0 h-10 w-screen bg-orange-500"></div>
      <div className="container my-0 mx-auto mt-16 max-w-4xl justify-center">
        <Quote />
        <div className="flex flex-wrap justify-between  content-center ">
          <div>
            <button
              onClick={() => handlePrevious()}
              className={
                activeIndex == 0
                  ? "border border-black p-5 rounded-full  opacity-50 mr-7"
                  : "border border-black p-5 rounded-full  mr-7"
              }
            >
              <GrPrevious />
            </button>
            <button
              onClick={() => handleNext()}
              className="border border-black p-5 rounded-full "
            >
              <GrNext />
            </button>
          </div>

          <div className="flex flex-wrap gap-2.5 content-center ">
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
      <div className="absolute bottom-0 h-10 w-screen bg-orange-500"></div>
    </div>
  );
}

export default App;
