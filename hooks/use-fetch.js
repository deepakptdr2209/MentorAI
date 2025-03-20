"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";
import { set } from "zod";

const useFetch = (cb) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const userFn = async (...arg) => {
    setLoading(true);
    setError(null);
    try {
      const response = await cb(...arg);
      setData(response);
      setError(null);
    } catch (error) {
      setError(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { data, loading, error, userFn, setData };
};
export default useFetch;
