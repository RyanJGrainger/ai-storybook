import { useState } from 'react';

type Option = {emoji: string, name: string};

function GridSelect({options, cols, showLabel, onOptionClick}: {options: Option[], cols: number, showLabel: boolean, onOptionClick: (name: string) => void}) {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
  }

  const handleClick = (option: Option) => {
    setSelectedOption(option);
    onOptionClick(option.name);
  }

  return (
    <div className="">
      <div className="px-6 mx-auto lg:px-8">
        <div className={`-mx-6 grid gap-0.5 overflow-hidden sm:mx-0 sm:rounded-2xl ${columnClasses[cols as keyof typeof columnClasses]}`}>
          {options.map((option, index) => (
            <div 
              key={index} 
              className={`p-6 cursor-pointer bg-white/10 sm:p-4 hover:bg-white/30 transition-all duration-500 
                ${selectedOption === option ? 'transform scale-90 text-white' : ''} flex flex-col items-center`} 
              onClick={() => handleClick(option)}
            >
              <span className="text-7xl">{option.emoji}</span>
              {showLabel && (
                <span className="inline-flex items-center px-8 py-1 mt-2 text-lg font-light text-gray-100 rounded-md bg-gray-800/5 ring-1 ring-inset ring-gray-500/10">
                    {option.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GridSelect;
