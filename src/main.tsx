import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import QuoteContextProvider from "./contexts/QuoteContext";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <QuoteContextProvider>
      <App />
    </QuoteContextProvider>
  </QueryClientProvider>
);
