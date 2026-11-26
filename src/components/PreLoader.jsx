import { useEffect, useState } from "react";

const PreLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
      <div role="status" className="font-sans text-3xl font-bold tracking-wider text-white animate-pulse">
        FarisRnr<span className="text-leaf">.</span>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default PreLoader;
