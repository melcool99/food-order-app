import { useCallback, useState } from "react";

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const handleRequests = useCallback(async (configs, handleDataFn) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(configs.url, {
        method: configs.method ? configs.method : "GET",
        headers: configs.headers ? configs.headers : {},
        body: configs.body ? JSON.stringify(configs.body) : null,
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const data = await response.json();

      if (handleDataFn) {
        handleDataFn(data);
      }
    } catch (error) {
      setIsLoading(false)
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  return {
    handleRequests,
    setIsLoading,
    isLoading,
    error,
  };
};

export default useFetch;
