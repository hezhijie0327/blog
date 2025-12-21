'use client'

import { useState } from 'react'

export default function MobileMenuButton() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    const header = document.getElementById('header')
    const overlay = document.getElementById('mobile-overlay')
    if (header && overlay) {
      if (isOpen) {
        header.classList.add('-translate-x-full')
        overlay.classList.add('hidden')
      } else {
        header.classList.remove('-translate-x-full')
        overlay.classList.remove('hidden')
      }
      setIsOpen(!isOpen)
    }
  }

  return (
    <button
      className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
      onClick={toggleMenu}
    >
      <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {isOpen ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        )}
      </svg>
    </button>
  )
}