import { useState } from 'react';
import Question from './components/Question';
import Input from './components/Input';
import Story from './components/Story';
import GridSelect from './components/GridSelect';
import questions from './data/questions';
import colorThemes from './data/themes';
import ProgressBar from 'react-top-loading-bar';
import loading from './assets/loading.gif';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTheme = colorThemes[currentIndex % colorThemes.length];
  const [answers, setAnswers] = useState(questions);
  const [progress, setProgress] = useState(0);
  const [story, setStory] = useState(null);
  const [status, setStatus] = useState('asking');
  const [imageUrl, setImageUrl] = useState('');

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
      setProgress(((currentIndex + 1) / questions.length) * 100);
    } else if (currentIndex === questions.length - 1) {
      setProgress(100);
      setStatus('loading'); 
      const answersToSend = answers.map(({ question, answer }) => ({ question, answer }));
      fetch(`${import.meta.env.VITE_APP_API_URL}/api/story`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answersToSend),
      })
      .then(response => response.json())
      .then(data => {        
        setStory(data.story);
        setImageUrl(data.image_url);
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

  const handleOptionClick = (name: string) => {
    handleChange(name);
    setTimeout(() => {
      nextQuestion();
    } , 500);
  };

  return (
    <>
      <div className={`h-screen transition-colors duration-1000 ${currentTheme.background} flex items-center`}>
        <div className="max-w-6xl mx-auto">
          {status === 'asking' && ( 
            <>
              <ProgressBar progress={progress} height={10} color={'pink'} onLoaderFinished={() => setProgress(0)}/>
              <Question text={questions[currentIndex].question} />
              <div className="flex justify-center mt-8">
                {questions[currentIndex].gridSelect ? (
                  <GridSelect
                    options={questions[currentIndex].options || []}
                    cols={questions[currentIndex].cols || 4}
                    showLabel={questions[currentIndex].showLabel || false}
                    onOptionClick={handleOptionClick}
                  />
                ) : (
                  <Input
                    value={answers[currentIndex].answer}
                    onChange={handleChange}
                    onButtonClick={nextQuestion}
                    theme={currentTheme}
                  />
                )}
              </div>
            </>
          )}
          {status === 'loading' && 
            <img src={loading} alt='loading' className="object-cover w-64 h-64 rounded-full" />
          }
          {status === 'story' && <Story story={story ? story : ''} image_url={imageUrl} />}
        </div>
      </div>
    </>
  );
}

export default App;
