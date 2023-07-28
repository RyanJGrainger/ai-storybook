import React from 'react';

interface QuestionProps {
  text: string;
}

const Question: React.FC<QuestionProps> = ({ text }) => {  
  return (
    <h1 className="px-6 pt-6 text-5xl font-bold tracking-tight text-center text-white sm:pt-0 sm:text-6xl">
      {text}
    </h1>
  );
}

export default Question;
