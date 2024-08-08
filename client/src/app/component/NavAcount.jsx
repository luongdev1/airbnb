"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CgProfile, CgMenuMotion } from "react-icons/cg";
import { FaRegBuilding } from "react-icons/fa";

const NavAcount = () => {
  const crNav = usePathname();
  const listNav = [
    {
      nameNav: "My profile",
      icon: <CgProfile />,
      href: "/account/profile",
    },
    {
      nameNav: "My bookings",
      icon: <CgMenuMotion />,
      href: "/account/bookings",
    },
    {
      nameNav: "My accommodations",
      icon: <FaRegBuilding />,
      href: "/account/places",
    },
  ];
  return (
    <div className="w-full ">
      <div className="flex justify-center gap-2">
        {listNav?.map((nav, index) => (
          <Link
            href={nav?.href}
            key={index}
            className={`${
              crNav.includes(nav?.href) ? "primary" : ""
            } flex items-center gap-3 bg-gray-300 px-3 py-2 rounded-full`}>
            {nav?.icon}
            <h2>{nav?.nameNav}</h2>
          </Link>
        ))}
      </div>
    </div>
  )
};

export default NavAcount;
