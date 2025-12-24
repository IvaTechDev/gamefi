'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Gamepad2, Menu, X } from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const t = useTranslations('header')

  const navLinks = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.catalog'), href: '/games' },
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.buy_tokens'), href: '/buy_tokens' },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 bg-cosmic-void/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Gamepad2 className="w-8 h-8 text-bitcoin-orange group-hover:scale-110 transition-transform" />
            <span className="text-xl font-heading font-bold gradient-text">
              GameFI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-mono text-sm transition-colors ${
                  isActive(link.href)
                    ? 'text-bitcoin-orange font-semibold'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side - CTA and Language Switcher */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <Link
              href="/games"
              className="btn-primary text-sm"
            >
              {t('cta')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-cosmic-void/95 backdrop-blur-lg">
          <nav className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 font-mono transition-colors ${
                  isActive(link.href)
                    ? 'text-bitcoin-orange font-semibold'
                    : 'text-white/70'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex justify-center pt-4">
              <LanguageSwitcher />
            </div>
            <Link
              href="/games"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center btn-primary"
            >
              {t('cta')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
