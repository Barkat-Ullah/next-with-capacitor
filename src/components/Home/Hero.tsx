"use client"
import { useUser } from "@/src/context/UserContext";
import { logout } from "@/src/services/auth.index";

const Hero = () => {
  const { user, isLoading, setIsLoading } = useUser();
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }
  // console.log({ user });

  const handleLogout = () => {
    logout();
    setIsLoading(true);
  };
  return (
    <section className="relative overflow-hidden border-b border-border py-24 sm:py-32">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-balance text-5xl font-bold tracking-tight sm:text-7xl mb-6">
          The Future of <span className="text-primary">Insights</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty">
          Expertly curated stories on engineering, design, and the modern web
          ecosystem.
        </p>
      </div>

      <div className="mx-auto px-5">
        {user ? (
          <button
            onClick={handleLogout}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 mt-4 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => (window.location.href = "/login")}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 mt-4 rounded-md font-medium transition-colors"
          >
            Go to Login
          </button>
        )}
      </div>
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </section>
  );
};

export default Hero;
