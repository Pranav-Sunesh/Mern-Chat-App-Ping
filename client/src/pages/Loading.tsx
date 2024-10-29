
const Loading = () => {
  return (
    <div className="w-screen h-screen justify-center items-center text-3xl animate-pulse flex">
        <div className="space-x-1">
        <span className="text-yellow-500">P</span>
        <span>i</span>
        <span className="text-yellow-500">n</span>
        <span>g</span>
        </div>
        <div className="space-x-2">
            <span className="dot">.</span>
            <span className="dot">.</span>
            <span className="dot">.</span></div>
        </div>
  );
};

export default Loading;