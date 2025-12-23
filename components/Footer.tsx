'use client'

import Link from 'next/link'
import { Gamepad2, Twitter, MessageCircle, Send, Github, ChevronUp } from 'lucide-react'
import { SOCIAL_LINKS } from '@/lib/constants'
import { scrollToTop } from '@/lib/utils'
import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations('footer')
  const tSite = useTranslations('site')
  return (
    <footer className="bg-deep-space border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Gamepad2 className="w-8 h-8 text-bitcoin-orange" />
              <span className="text-xl font-heading font-bold gradient-text">
                GameFI
              </span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed mb-6 max-w-sm">
              {tSite('description')}
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-bitcoin-orange/50 hover:bg-white/10 transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-bitcoin-orange/50 hover:bg-white/10 transition-all"
                aria-label="Discord"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-bitcoin-orange/50 hover:bg-white/10 transition-all"
                aria-label="Telegram"
              >
                <Send className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-bitcoin-orange/50 hover:bg-white/10 transition-all"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-mono text-sm font-semibold text-white mb-4">{t('product')}</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/games"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {t('game_catalog')}
                </Link>
              </li>
              <li>
                <Link
                  href="/#featured"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {t('featured_games')}
                </Link>
              </li>
              <li>
                <Link
                  href="/games#categories"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {t('categories')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-mono text-sm font-semibold text-white mb-4">{t('resources')}</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/#about"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {t('about_gamefi')}
                </Link>
              </li>
              <li>
                <Link
                  href="/#how-it-works"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {t('how_it_works')}
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {t('faq')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-mono text-sm font-semibold text-white mb-4">{t('legal')}</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {t('terms')}
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {t('disclaimer')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-white/40">
            <p>© {new Date().getFullYear()} GameFI Catalog. All rights reserved.</p>
            <p className="text-xs mt-1">Not financial advice. Always DYOR.</p>
          </div>
          
          <button
            onClick={() => scrollToTop()}
            className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors group"
          >
            <span>{t('back_to_top')}</span>
            <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  )
}
