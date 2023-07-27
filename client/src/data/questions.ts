const animals = [
  { emoji: '🐶', name: 'Dog' },
  { emoji: '🐱', name: 'Cat' },
  { emoji: '🐭', name: 'Mouse' },
  { emoji: '🐹', name: 'Hamster' },
  { emoji: '🐰', name: 'Rabbit' },
  { emoji: '🦊', name: 'Fox' },
  { emoji: '🐻', name: 'Bear' },
  { emoji: '🐼', name: 'Panda' },
  { emoji: '🐨', name: 'Koala' },
  { emoji: '🐯', name: 'Tiger' },
  { emoji: '🦁', name: 'Lion' },
  { emoji: '🐮', name: 'Cow' },
  { emoji: '🐷', name: 'Pig' },
  { emoji: '🐸', name: 'Frog' },
  { emoji: '🐵', name: 'Monkey' },
  { emoji: '🦉', name: 'Owl' },
  { emoji: '🐧', name: 'Penguin' },
  { emoji: '🦄', name: 'Unicorn' },
];

const colors = [
  { emoji: '🟥', name: 'Red' },
  { emoji: '🟧', name: 'Orange' },
  { emoji: '🟨', name: 'Yellow' },
  { emoji: '🟩', name: 'Green' },
  { emoji: '🟦', name: 'Blue' },
  { emoji: '🟪', name: 'Purple' },
  { emoji: '🟫', name: 'Brown' },
  { emoji: '⬛', name: 'Black' },
];

const superPowers = [
  { emoji: '💪', name: 'Super strength' },
  { emoji: '🕊️', name: 'Flight' },
  { emoji: '🕵️', name: 'Invisibility'},
  { emoji: '🔥', name: 'Pyrokinesis' },
  { emoji: '💨', name: 'Super speed' },
  { emoji: '🧠', name: 'Telepathy' },
  { emoji: '⏳', name: 'Time travel' },
  { emoji: '🔄', name: 'Shape shifting' },
  { emoji: '🐾', name: 'Talk to animals' },
  { emoji: '💫', name: 'Teleportation' },
  { emoji: '👁️', name: 'X-ray vision' },
  { emoji: '🧲', name: 'Magnetism' },
];



const questions = [
  { question: "What is your name? 😊", answer: "" },
  { question: "How old are you? 🎂", answer: "" },
  { question: "What is your favourite color? 🌈", answer: "", options: colors, gridSelect: true, cols: 4, showLabel: false},
  { question: "What is your favourite animal? 🐾", answer: "", options: animals, gridSelect: true, cols: 6, showLabel: false},
  { question: "If you had a superpower, what would it be?", answer: "", options: superPowers, gridSelect: true, cols: 4, showLabel: true},
  { question: "Who is your best friend? 👫", answer: "" },
  // { question: "Where is your favourite place to go on holiday? ✈️", answer: "" },
  // { question: "What is your favourite thing to learn about? 📚", answer: "" },
  // { question: "Do you have a pet? If so, what is its name? 🐶", answer: "" },
  // { question: "What's your favourite thing about school? 🏫", answer: "" },
  // { question: "If you could be any animal, what would you be? 🦄", answer: "" },
  // { question: "What's your favourite thing to do on the weekend? 🎉", answer: "" },
  // { question: "If you could go anywhere in the world, where would you go? 🌍", answer: "" },
];

export default questions;
