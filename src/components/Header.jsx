import React from 'react'
import Icon from './Icon.jsx'
import { Button } from '@/components/ui/button'

export default function Header({ 
  title, 
  leftIcon, 
  onLeftClick, 
  rightIcon, 
  rightLabel, 
  onRightClick,
  rightNode,
  sticky = true,
  className = '',
  variant = 'main'
}) {
  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-neutral-200 ${className}`}>
        <div className="w-full max-w-[820px] mx-auto px-4 sm:px-6 h-[60px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            {leftIcon && (
              <button 
                onClick={onLeftClick} 
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-100 transition-colors"
              >
                <Icon name={leftIcon} className="text-[20px] text-neutral-600" />
              </button>
            )}
            <h1 className="text-[20px] font-bold tracking-tight text-neutral-900">
              {title}
            </h1>
          </div>

          <div>
            {rightNode ? (
              rightNode
            ) : rightIcon && !rightLabel ? (
              <button 
                onClick={onRightClick} 
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-100 transition-colors"
              >
                <Icon name={rightIcon} className="text-[20px] text-neutral-600" />
              </button>
            ) : rightIcon && rightLabel ? (
              <Button
                variant="outline"
                size="sm"
                onClick={onRightClick}
                className="h-8 gap-2 font-medium"
              >
                <Icon name={rightIcon} className="text-[16px]" />
                {rightLabel}
              </Button>
            ) : null}
          </div>
        </div>
      </header>
      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-[60px] shrink-0 w-full" />
    </>
  )
}
