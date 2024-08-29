export const Login = () => {
  return (
    <div className="bg-black relative flex h-screen w-screen items-center justify-center overflow-hidden bg-center">
      <div className="z-10 flex flex-col items-center lg:flex-row">
        <img
          src={"/images/lightit-logo-violet.svg"}
          width={400}
          alt="Lightit logo"
        />

        <div className="flex flex-col items-center justify-center">
          <p className="text-white mb-2 text-2xl font-extrabold">
            Frontend Boilerplate Login!
          </p>
        </div>
      </div>
    </div>
  );
};
