import Icon from './Icon.jsx'
import React from 'react'

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
  variant = 'main' // 'main' | 'sub' (left for compatibility)
}) {
  return (
    <header 
      className={`w-full max-w-[820px] mx-auto flex items-center justify-between bg-neutral-50 ${sticky ? 'sticky top-0 z-30' : ''} ${className}`}
      style={{ padding: '20px' }}
    >
      <div className="flex items-center gap-4">
        {leftIcon && (
          <button 
            onClick={onLeftClick} 
            className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-sm border border-neutral-100 shrink-0 active:scale-95 transition-all"
          >
            <Icon name={leftIcon} className="text-neutral-900"  />
          </button>
        )}
        <h1 className="text-[24px] font-semibold text-neutral-900 font-['Open_Sans'] leading-none tracking-tight">
          {title}
        </h1>
      </div>

      <div>
        {rightNode ? (
          rightNode
        ) : rightIcon && !rightLabel ? (
          <button 
            onClick={onRightClick} 
            className={`w-11 h-11 bg-white flex items-center justify-center shadow-sm border border-neutral-100 shrink-0 active:scale-95 transition-all ${
              rightIcon === 'person' ? 'rounded-[14px]' : 'rounded-full'
            }`}
          >
            <Icon name={rightIcon} className="text-neutral-900"  />
          </button>
        ) : rightIcon && rightLabel ? (
          <button 
            onClick={onRightClick} 
            className="flex items-center gap-2 px-4 h-10 rounded-[12px] bg-neutral-300 text-neutral-900 hover:bg-neutral-300 active:scale-95 transition-all"
          >
            <Icon name={rightIcon} className="text-[20px]"  />
            <span className="text-[14px] font-semibold font-['Open_Sans']">{rightLabel}</span>
          </button>
        ) : null}
      </div>
    </header>
  )
}
