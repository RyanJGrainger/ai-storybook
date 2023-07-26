import React, { Fragment } from 'react';

interface StoryProps {
  text: string;
}

const Story: React.FC<StoryProps> = ({ text }) => {
  const NewlineText: React.FC<StoryProps> = ({ text }) => {
    return (
      <>
        {text.split('\n').map((str, index) => (
          <Fragment key={index}>
            {str}
            <br />
          </Fragment>
        ))}
      </>
    );
  };

  return (
    <div className="mt-4 text-lg font-semibold text-center text-white">
      <NewlineText text={text ? text : ''} />
    </div>
  );
};

export default Story;