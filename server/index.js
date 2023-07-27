import express from 'express';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

dotenv.config({ path: './server/.env' });

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
});


// OpenAI Configuration
const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Create express application
const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Function to interact with OpenAI API
async function createStory(answers) {
  try {
    return await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "system",
          "content": "You will be provided with a list of questions and answers from a conversation with children. Your task is to generate a fun, creative and child-friendly story based on the answers provided. The story should be no more than 100 words."
        },
        {
          "role": "user",
          "content": JSON.stringify(answers),
        },
      ],
      temperature: 0.5,
      max_tokens: 256,
    });
  } catch (error) {
    throw new Error('Error making request to OpenAI API');
  }
}

async function createVisualPromptFromStory(story) {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "system",
          "content": "You are a helpful assistant that translates stories into descriptive visual prompts for image generation. Please translate the following story into a visual prompt. Make sure the promt is succinct and descriptive, as it will be passed to an image generation model."
        },
        {
          "role": "user",
          "content": story,
        },
      ],
      temperature: 0.5,
      max_tokens: 256,
    });
    return response.data.choices[0].message.content;
  } catch (error) {
    throw new Error('Error making request to OpenAI API');
  }
}

async function createImage(visualPrompt) {
  try {
    const response = await openai.createImage({
      prompt: "a miyazaki style image with no text." +  visualPrompt,
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
    const completion = await createStory(req.body);
    const story = completion.data.choices[0].message.content;
    const visualPrompt = await createVisualPromptFromStory(story);
    console.log(visualPrompt);
    const image_url = await createImage(visualPrompt);
    res.send({story: story, image_url: image_url});
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
