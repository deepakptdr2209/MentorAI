import { RingLoader } from "react-spinners";
import { Suspense } from "react";

export default function Layout({ children }) {
  return (
    <div className="px-5 min-h-screen flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-6xl font-bold gradient-title">Industry Insights</h1>
      </div>

      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-screen">
            <RingLoader color="#ff09c9" size={120} />
          </div>
        }
      >
        {children}
      </Suspense>
    </div>
  );
}
