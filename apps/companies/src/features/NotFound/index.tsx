import { useNavigate } from "react-router-dom";

export function NotFound() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="w-full h-screen grid place-content-center">
      <p className="text-display-05 mb-5 text-neutral-20">Page not Found</p>
      <button onClick={goBack} className="w-auto">
        Go Back
      </button>
    </div>
  );
}
