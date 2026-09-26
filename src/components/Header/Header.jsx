import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

import Container from "../container/Container";
import Logo from "../Logo";
import LogoutBtn from "./LogoutBtn";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const authStatus = useSelector((state) => state.auth.status);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-violet-400/20 bg-slate-950/85 shadow-[0_10px_30px_rgba(15,23,42,0.65)] backdrop-blur-xl">
      <Container>
        <div className="flex min-h-25 items-center justify-between gap-4">
       
          <Link
            to="/"
            className="group flex items-center gap-3"
          >
            <Logo width="60px" />

            <div className="hidden sm:block">
              <h1 className="bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-clip-text text-xl font-extrabold tracking-wide text-transparent">
                MegaBlog
              </h1>

              <p className="text-x tracking-[0.20em] text-slate-200">
                WRITE • SHARE • GROW
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) =>
              item.active ? (
                <NavLink
                  key={item.name}
                  to={item.slug}
                  className={({ isActive }) =>
                    `relative rounded-xl px-4 mx-2 py-2 text-xl font-medium transition duration-300 ${
                      isActive
                        ? "bg-violet-500/20 text-cyan-200 shadow-[0_0_18px_rgba(139,92,246,0.35)]"
                        : "text-slate-300 hover:bg-white/10 hover:text-cyan-200"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.name}

                      {isActive && (
                        <span className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 shadow-[0_0_10px_rgba(34,211,238,1)]" />
                      )}
                    </>
                  )}
                </NavLink>
              ) : null
            )}

            {authStatus && (
              <div className="ml-2 border-l border-white/10 pl-3">
                <LogoutBtn />
              </div>
            )}
          </nav>

         
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl border border-violet-400/30 bg-white/5 px-4 py-3 text-xl text-cyan-200 transition hover:bg-violet-500/20 lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

       
        {mobileMenuOpen && (
          <nav className="mb-4 flex flex-col gap-2 rounded-2xl border border-violet-400/20 bg-slate-900/90 p-3 shadow-2xl lg:hidden">
            {navItems.map((item) =>
              item.active ? (
                <NavLink
                  key={item.name}
                  to={item.slug}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-xl font-medium transition ${
                      isActive
                        ? "bg-gradient-to-r from-violet-500/30 to-cyan-500/20 text-cyan-200"
                        : "text-slate-200 hover:bg-white/10"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ) : null
            )}

            {authStatus && (
              <div className="mt-1 border-t border-white/10 pt-2">
                <LogoutBtn />
              </div>
            )}
          </nav>
        )}
      </Container>
    </header>
  );
}

export default Header;