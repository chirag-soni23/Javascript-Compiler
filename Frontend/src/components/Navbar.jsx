import { SignInButton, SignOutButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="text-2xl font-bold">
        <Link to="/">AI Code Review</Link>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/review" className="hover:text-blue-400 transition">Review</Link>
        <Link to="/history" className="hover:text-blue-400 transition">History</Link>

        {/* Show Sign In if signed out */}
        <SignedOut>
          <SignInButton mode="modal">
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>

        {/* Show Avatar & Sign Out if signed in */}
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
          <SignOutButton>
            <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold">
              Sign Out
            </button>
          </SignOutButton>
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
