import { createContext, useContext, useState } from "react";
import { WithChildren, LoadingContextInt } from "../types/interfaces";
import Loader from "../components/Loader";

export const LoadingContext = createContext<LoadingContextInt>({
  loading: true,
  handleLoading: () => null,
});
export const useLoading = () => useContext(LoadingContext);

const LoadingWindow = () => (
  <div>
    <Loader />
  </div>
);

export const LoadingWrapper = ({ children }: WithChildren) => {
  const [loading, handleLoading] = useState<boolean>(true);

  return (
    <LoadingContext.Provider value={{ loading, handleLoading }}>
      {loading === true && <LoadingWindow />}
      {children}
    </LoadingContext.Provider>
  );
};
