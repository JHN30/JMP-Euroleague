import LoadingSpinner from "./LoadingSpinner";

const FallbackComponent = () => (
  <div className="flex items-center justify-center h-screen">
    <LoadingSpinner size="lg" />
  </div>
);

export default FallbackComponent;