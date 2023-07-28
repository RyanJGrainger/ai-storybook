import express from 'express';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config({ path: './server/.env' });

// Configuration for OpenAI
const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Express application setup
const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
});


// Function to interact with OpenAI API
async function createStory(answers) {
  try {
    return await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "system",
          "content": "You will be provided with a list of questions and answers from a conversation with children. Your task is to generate a fun, creative and child-friendly story based on the answers provided."
        },
        {
          "role": "system",
          "content": "Please begin by providing the title for the story. Denote the title in between # #."
        },
        {
          "role": "system",
          "content": "After the title, please provide a descriptive visual prompt for the story. Denote the visual prompt in between * *."
        },
        {
          "role": "user",
          "content": JSON.stringify(answers),
        },
      ],
      temperature: 0.6,
      max_tokens: 1024,
    });
  } catch (error) {
    throw new Error('Error making request to OpenAI API');
  }
}


async function createImage(visualPrompt) {
  try {
    const response = await openai.createImage({
      prompt: "" +  visualPrompt,
      n: 1,
      size: "256x256",
    });
    return response.data.data[0].url;
  } catch (error) {
    throw new Error('Error making request to OpenAI Image API');
  }
}

// Route handler
app.post('/api/story', async (req, res) => {
  try {
    const completion = await createStory(req.body.answers);
    let story = completion.data.choices[0].message.content;
    let image_url = null; 
    console.log(story);

    // Extract title from the story
    const titleMatch = story.match(/#(.*?)#/);
    let title = titleMatch ? titleMatch[1] : 'Untitled';
    
    if (req.body.image) {
      const match = story.match(/\*(.*?)\*/);
      if (match) {
        const visualPrompt = match[1];
        image_url = await createImage(visualPrompt);
      }
    }

    // Remove title and visual prompts from the story
    story = story.replace(/#.*?#/, '').replace(/\*.*?\*/, '');
    
    res.send({title: title, story: story.trim(), image_url: image_url});
    console.log(completion);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});



// Server start
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
