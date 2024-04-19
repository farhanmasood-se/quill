import Link from 'next/link';
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/server';

import MaxWidthWrapper from './MaxWidthWrapper';
import { buttonVariants } from './ui/button';
import { ArrowRight } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-orange-500 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-orange-500">
          <Link href="/" className="flex z-40 font-bold">
            <p className="text-orange-500 text-2xl">
              quill<span className="text-black">.</span>
            </p>
          </Link>

          <div className="hidden items-center space-x-4 sm:flex">
            <>
              <Link
                href="/pricing"
                className={buttonVariants({
                  variant: 'ghost',
                  size: 'sm',
                })}
              >
                Pricing
              </Link>
              <LoginLink
                className={buttonVariants({
                  variant: 'ghost',
                  size: 'sm',
                })}
              >
                Sign In
              </LoginLink>
              <RegisterLink
                className={buttonVariants({
                  size: 'sm',
                  className:
                    '!bg-orange-500 !text-white hover:!bg-white hover:!text-orange-500 hover:!border hover:!border-orange-500',
                })}
              >
                Get Started <ArrowRight className="ml-1.5 h-5 ww-5" />
              </RegisterLink>
            </>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
