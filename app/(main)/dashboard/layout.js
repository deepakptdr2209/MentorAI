import { RingLoader } from "react-spinners";
import { Suspense } from "react";

export default function Layout({ children }) {
  return (
    <div className="px-5">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-6xl font-bold gradient-title">Industry Insights</h1>
      </div>
      <Suspense
        fallback={
          <RingLoader color="#ff09c9" className="mt-4" width={"100%"} />
        }
      >
        {children}
      </Suspense>
    </div>
  );
}
