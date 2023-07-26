import { useState } from 'react';
import Question from './components/Question';
import Input from './components/Input';
import Story from './components/Story';
import questions from './data/questions';
import colorThemes from './data/themes';
import ProgressBar from 'react-top-loading-bar';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTheme = colorThemes[currentIndex % colorThemes.length];
  const [answers, setAnswers] = useState(questions);
  const [progress, setProgress] = useState(0);
  const [story, setStory] = useState(null);
  const [status, setStatus] = useState('asking');

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
      setProgress(((currentIndex + 1) / questions.length) * 100);
    } else if (currentIndex === questions.length - 1) {
      setProgress(100);
      setStatus('loading'); 
      fetch('http://localhost:5001/api/story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answers),
      })
      .then(response => response.json())
      .then(data => {
        setStory(data.content);
        setStatus('story'); 
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  }

  const handleChange = (value: string) => {
    setAnswers(prevAnswers => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentIndex].answer = value;
      return newAnswers;
    });
  }

  return (
    <div className={`h-screen transition-colors duration-1000 ${currentTheme.background} flex items-center justify-center`}>
      <div className="max-w-2xl mx-auto">
        <ProgressBar progress={progress} height={10} color={'pink'} onLoaderFinished={() => setProgress(0)}/>
        {status === 'asking' && ( 
          <>
            <Question text={questions[currentIndex].question} />
            <div className="flex justify-center mt-8">
              <Input
                value={answers[currentIndex].answer}
                onChange={handleChange}
                onButtonClick={nextQuestion}
                theme={currentTheme}
              />
            </div>
          </>
        )}
        {status === 'loading' && <p>Loading</p>}
        {status === 'story' && <Story text={story ? story : ''} />}
      </div>
    </div>
);

}

export default App;
