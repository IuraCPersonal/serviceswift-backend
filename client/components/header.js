import Link from "next/link";

const Header = ({ currentUser }) => {
  const links = [
    { label: "Services", href: "/" },
    !currentUser && { label: "Sign Up", href: "/auth/signup" },
    !currentUser && { label: "Sign In", href: "/auth/signin" },
    currentUser && { label: "History", href: "/orders" },
    currentUser && { label: "Profile", href: "/profile" },
    currentUser && { label: "Sign Out", href: "/auth/signout" },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li
          key={href}
          className="block py-2 px-3 text-white bg-slate-700 rounded md:bg-transparent md:text-slate-700 md:p-0"
        >
          <Link href={href}>{label}</Link>
        </li>
      );
    });

  return (
    <nav className="bg-white border border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/">
          <img src="/logo_small.svg" alt="logo" width={50} height={50} />
        </Link>
        <div className="hidden w-full md:block md:w-auto">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
            {links}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
