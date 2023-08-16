import { useContext } from "react";
import { QuoteContext } from "../contexts/QuoteContext";
import { BiSolidQuoteAltRight } from "react-icons/bi";

const Quote = () => {
  const { quotes, activeIndex } = useContext(QuoteContext);

  return (
    <div>
      <h1 className="text-8xl mb-7">
        <BiSolidQuoteAltRight />
      </h1>
      <h1 className="text-4xl mb-7  text-slate-600">
        {quotes[activeIndex]?.content}
      </h1>
      <h1 className="text-4xl mb-7  text-slate-600">
        -{quotes[activeIndex]?.author}
      </h1>
    </div>
  );
};

export default Quote;
