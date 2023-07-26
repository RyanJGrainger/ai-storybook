import React from 'react';
import { ArrowRightCircleIcon } from "@heroicons/react/20/solid";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  onButtonClick: () => void;
  theme: {
    textColor: string;
    inputBackground: string;
    iconColor: string;
    focusRing: string;
  };
}

function Input({ value, onChange, onButtonClick, theme }: InputProps) {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onButtonClick();
    }
  }
  return (
    <div className="relative rounded-md shadow-sm">
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
        aria-label="Answer"
        type="text"
        name="answer"
        id="answer"
        className={`transition-colors duration-1000 block w-full px-4 py-2 text-3xl text-center font-bold ${theme.textColor} ${theme.inputBackground} border-none rounded-3xl shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-offset-0 ${theme.focusRing}`}
        autoComplete="off"
        spellCheck={false}
      />
      <div onClick={onButtonClick} className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
        <ArrowRightCircleIcon className={`transition-colors duration-1000 h-10 w-10 ${theme.iconColor}`} aria-hidden="true" />
      </div>
    </div>
  );
}

export default Input;