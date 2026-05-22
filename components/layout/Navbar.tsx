'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Search, Heart, User, Menu, X } from 'lucide-react';
import { useCartStore, useUIStore, useWishlistStore } from '@/lib/store';
import { useSession, signOut } from 'next-auth/react';

const navLinks = [
  { label: 'Products', href: '/shop' },
  { label: 'About', href: '/#about' },
  { label: 'Benefits', href: '/#why' },
  { label: 'Reviews', href: '/#testimonials' },
  { label: 'Blog', href: '/blog' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const itemCount = useCartStore((s) => s.itemCount);
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const { setCartOpen, mobileMenuOpen, setMobileMenuOpen, setSearchOpen } = useUIStore();

  const isHero = pathname === '/';
  const isDark = isHero && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled ? 'bg-[#fdfcf8]/90 backdrop-blur-2xl shadow-[0_1px_0_rgba(61,107,79,0.08)] py-4'
                   : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className={`font-serif text-2xl font-light tracking-wide transition-colors duration-500 ${isDark ? 'text-white' : 'text-forest'}`}>
            Velveta Naturals
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={`nav-link text-xs tracking-[0.18em] uppercase font-light transition-colors duration-300 ${isDark ? 'text-white/80 hover:text-white' : 'text-muted hover:text-forest'}`}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <button onClick={() => setSearchOpen(true)} className={`p-2 rounded-full transition-all hover:bg-green-pale/40 ${isDark ? 'text-white/80' : 'text-muted'}`} aria-label="Search">
              <Search size={18} strokeWidth={1.5} />
            </button>

            {/* Wishlist */}
            <Link href="/account/wishlist" className={`relative p-2 rounded-full transition-all hover:bg-green-pale/40 ${isDark ? 'text-white/80' : 'text-muted'}`} aria-label="Wishlist">
              <Heart size={18} strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-gold text-white text-[9px] flex items-center justify-center font-medium">{wishlistCount}</span>
              )}
            </Link>

            {/* Cart */}
            <button onClick={() => setCartOpen(true)} className={`relative flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
              isDark ? 'border-white/30 text-white hover:bg-white/10' : 'border-green/30 text-green hover:bg-green hover:text-white'
            }`} aria-label="Cart">
              <ShoppingCart size={16} strokeWidth={1.5} />
              <span className="text-xs tracking-wider font-medium hidden sm:inline">Cart</span>
              {itemCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-green text-white text-[10px] flex items-center justify-center font-medium">{itemCount}</span>
              )}
            </button>

            {/* User */}
            <div className="relative">
              <button onClick={() => setUserMenuOpen(!userMenuOpen)} className={`p-2 rounded-full transition-all hover:bg-green-pale/40 ${isDark ? 'text-white/80' : 'text-muted'}`} aria-label="Account">
                <User size={18} strokeWidth={1.5} />
              </button>
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-52 glass-card p-2 z-50"
                  >
                    {session ? (
                      <>
                        <div className="px-3 py-2 border-b border-green-pale/30 mb-1">
                          <p className="text-xs font-medium text-forest">{session.user?.name}</p>
                          <p className="text-[10px] text-muted">{session.user?.email}</p>
                        </div>
                        <UserMenuItem href="/account/orders" label="My Orders" />
                        <UserMenuItem href="/account/wishlist" label="Wishlist" />
                        <UserMenuItem href="/account/profile" label="Profile" />
                        {(session.user as any)?.role === 'admin' && <UserMenuItem href="/admin/dashboard" label="Admin Panel" />}
                        <button onClick={() => { signOut(); setUserMenuOpen(false); }} className="w-full text-left px-3 py-2 text-xs text-red-500 rounded-xl hover:bg-red-50 transition-colors">Sign Out</button>
                      </>
                    ) : (
                      <>
                        <UserMenuItem href="/login" label="Sign In" />
                        <UserMenuItem href="/register" label="Create Account" />
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Hamburger */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`lg:hidden p-2 rounded-full transition-all hover:bg-green-pale/40 ${isDark ? 'text-white' : 'text-forest'}`} aria-label="Menu">
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-forest/60 backdrop-blur-sm z-[98] lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-[#fdfcf8] z-[99] flex flex-col shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-green-pale/30">
                <span className="font-serif text-xl text-forest">Menu</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-full hover:bg-green-pale/30">
                  <X size={20} className="text-forest" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto p-6">
                <ul className="space-y-1">
                  {navLinks.map((link, i) => (
                    <motion.li key={link.href} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                      <Link href={link.href} onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center py-3 px-4 rounded-2xl text-sm font-light text-forest hover:bg-green-pale/30 hover:text-green transition-colors tracking-wide">
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t border-green-pale/30 space-y-2">
                  {session ? (
                    <>
                      <Link href="/account/orders" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 text-sm text-muted hover:text-forest rounded-xl hover:bg-green-pale/20 transition-colors">My Orders</Link>
                      <button onClick={() => { signOut(); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm text-red-500 rounded-xl hover:bg-red-50 transition-colors">Sign Out</button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="btn-primary w-full justify-center">Sign In</Link>
                      <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="btn-outline w-full justify-center border-green text-green">Create Account</Link>
                    </>
                  )}
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function UserMenuItem({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="block px-3 py-2 text-xs text-forest rounded-xl hover:bg-green-pale/30 transition-colors">
      {label}
    </Link>
  );
}