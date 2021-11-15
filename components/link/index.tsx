// import React from 'react'
// import Link, { LinkProps } from 'next/link'
// import { useRouter } from 'next/router'

// export interface NavLinkProps extends LinkProps {
//   children: React.ReactElement
// }

// export function NavLink({ children, href, ...props }: NavLinkProps) {
//   const router = useRouter()
//   return (
//     <Link href={href} {...props}>
//       {router.pathname === href ? React.cloneElement(children, { className: 'active-link' }) : children}
//     </Link>
//   )
// }


import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

export const NavLink = ({ fuzzy = false, href, children }) => {
const router = useRouter();
let className = children.props.className || '';

const hrefTokens = href.substr(1).split('/');
const pathTokens = router.asPath.substr(1).split('/');

let matched = false;
for (let i = 0; i < hrefTokens.length; i++) {
    if (hrefTokens[i] === pathTokens[i]) {
    matched = true;
    break;
    }
 }

 if ((!fuzzy && router.asPath === href) || (fuzzy && matched)) {
    className = `${className} active-link`;
  }

  return (
    <NextLink href={href}>
      {React.cloneElement(children, { className })}
    </NextLink>
  );
};