import { ReactNode, createContext, useState } from "react";

interface Quote {
  author: string;
  content: string;
}

interface QuoteContextType {
  quotes: Quote[];
  setQuotes: React.Dispatch<React.SetStateAction<Quote[]>>;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

// TODO reasearch on type casting
export const QuoteContext = createContext<QuoteContextType>(
  {} as QuoteContextType
);

const QuoteContextProvider = (props: { children: ReactNode }) => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <QuoteContext.Provider
      value={{ quotes, setQuotes, setActiveIndex, activeIndex }}
    >
      {props.children}
    </QuoteContext.Provider>
  );
};

export default QuoteContextProvider;
