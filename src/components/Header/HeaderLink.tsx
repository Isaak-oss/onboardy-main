import React from "react";
import Link from "next/link";

type HeaderLinkProps = {
  icon: React.ReactNode;
  title: string;
  url: string;
};

const HeaderLink = ({ icon, title, url }: HeaderLinkProps) => {
  return (
    <Link
      href={url}
      className="justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 flex items-center gap-1"
    >
      {icon}
      {title}
    </Link>
  );
};

export default HeaderLink;
