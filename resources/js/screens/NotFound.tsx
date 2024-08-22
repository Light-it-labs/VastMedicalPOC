import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <div className="mb-20">
        <img src={"/images/lightit-logo-violet.svg"} alt="logo" />
      </div>

      <p className="mb-10 text-2xl">
        Looks like the page you are trying to access does not exist.
      </p>

      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        Go Back
      </button>
    </main>
  );
};