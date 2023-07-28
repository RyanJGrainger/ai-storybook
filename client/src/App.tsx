import { useState } from 'react';
import Question from './components/Question';
import Input from './components/Input';
import Story from './components/Story';
import GridSelect from './components/GridSelect';
import questions from './data/questions';
import colorThemes from './data/themes';
import ProgressBar from 'react-top-loading-bar';
import loading from './assets/loading.gif';
import { motion } from 'framer-motion';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTheme = colorThemes[currentIndex % colorThemes.length];
  const [answers, setAnswers] = useState(questions);
  const [progress, setProgress] = useState(0);
  const [story, setStory] = useState(null);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('asking');
  const [imageUrl, setImageUrl] = useState('');
  const currentQuestion = questions[currentIndex];

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
      setProgress(((currentIndex + 1) / questions.length) * 100);
    } else if (currentIndex === questions.length - 1) {
      setProgress(100);
      setStatus('loading');
      const answersToSend = answers.map(({ question, answer }) => ({ question, answer }));
      fetchStory(answersToSend).then(data => {        
        setStory(data.story);
        setTitle(data.title);
        setImageUrl(data.image_url);
        setStatus('story'); 
      });
    }
  }

  const fetchStory = (answersToSend: { question: string, answer: string }[]) => {
    return fetch(`${import.meta.env.VITE_APP_API_URL}/api/story`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        answers: answersToSend,
        image: true   
      }),
    })
    .then(response => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  const handleChange = (value: string) => {
    setAnswers(prevAnswers => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentIndex].answer = value;
      return newAnswers;
    });
  }

  const handleOptionClick = (name: string) => {
    handleChange(name);
    setTimeout(nextQuestion, 400);
  };

  const renderContent = () => {
    switch (status) {
      case 'asking':
        return (
          <div className={`h-screen transition-colors duration-1000 ${currentTheme.background} sm:flex sm:items-center`}>
            <div className="max-w-6xl mx-auto">
              <div className='max-w-3xl'>
                <ProgressBar progress={progress} height={10} color={'pink'} onLoaderFinished={() => setProgress(0)}/>
                <Question text={ currentQuestion.question} />
                <div className="flex justify-center mt-8">
                  { currentQuestion.gridSelect ? (
                    <motion.div 
                      key={currentIndex} 
                      initial={{ opacity: 0, y: 5 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      transition={{ duration: 0.5 }}
                    >
                      <GridSelect
                        options={ currentQuestion.options || []}
                        cols={ currentQuestion.cols || 4}
                        showLabel={ currentQuestion.showLabel || false}
                        onOptionClick={handleOptionClick}
                      />
                    </motion.div>
                  ) : (
                    <Input
                      value={answers[currentIndex].answer}
                      onChange={handleChange}
                      onButtonClick={nextQuestion}
                      theme={currentTheme}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      case 'loading':
        return (
          <div className={`h-screen transition-colors duration-1000 ${currentTheme.background} sm:flex sm:items-center`}>
            <div className="max-w-6xl mx-auto">
              <img src={loading} alt='loading' className="object-cover w-64 h-64 rounded-full" />
            </div>
          </div>
        );
      case 'story':
        return (
          <Story story={story ? story : ''} image_url={imageUrl} title={title ? title : ''} />
        );
      default:
        return null;
    }
  }

  return (
    <>
      {renderContent()}
    </>
  );
}

export default App;
