import React, {useState} from "react";
import FlashcardList from "./components/FlashcardList";
import './app.css'

function App() {
  const [flashcards, setflashcards] = useState(SAMPLE_FLASHCARDS)
  return (
    <FlashcardList flashcards={flashcards}/>
  );
}

const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: 'what is 2 + 2?',
    answer: '4',
    options: [
      '2',
      '3',
      '4',
      '5'
    ]

  },
  {
    id: 2,
    question: 'what is 3 + 2?',
    answer: '5',
    options: [
      '2',
      '3',
      '4',
      '5'
    ]

  },
  {
    id: 3,
    question: 'what is 1 + 2?',
    answer: '3',
    options: [
      '2',
      '3',
      '4',
      '5'
    ]

  }
]

export default App;
