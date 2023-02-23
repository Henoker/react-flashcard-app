import React, {useState, useEffect, useRef} from "react";
import FlashcardList from "./components/FlashcardList";
import './app.css';
import axios from "axios";

function App() {
  const [flashcards, setflashcards] = useState([])
  const categoryEl = useRef()
  const [categories, setcategories] = useState([])
  const amountEl = useRef()

useEffect(()=> {
  axios
  .get('https://opentdb.com/api_category.php')
  .then(res =>{
    setcategories(res.data.trivia_categories)
  })
}, [])

useEffect(() => {
    
  }, [])

  function decodeString(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.value
  }

  function handleSubmit(e) {
    e.preventDefault()
    axios
      .get('https://opentdb.com/api.php', {
        params: {
          amount: amountEl.current.value,
          category: categoryEl.current.value
        }
      })
      .then(res => {
        setflashcards(res.data.results.map((questionItem, index) => {
        const answer = decodeString(questionItem.correct_answer)
        const options = [
          ...questionItem.incorrect_answers.map(a => decodeString(a)), 
          answer]
            return {
              id: `${index}-${Date.now()}`,
              question: decodeString(questionItem.question),
              answer: answer,
              options: options.sort(() => Math.random() - .5)
            }
          })
        )
        // console.log(res.data)
      })
  }

  return (
    <>
    <form className="header" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select id="category" ref={categoryEl}>
          {categories.map(category => {
            return <option value={category.id} key={category.id}>
              {category.name}
            </option>
          })}
          
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="amount">Number of Questions</label>
        <input type="number" id="amount" min="1" step="1" defaultValue={10}
        ref={amountEl} />
      </div>
      <div className="form-group">
        <button className="btn">Generate</button>
      </div>

    </form>
    <div className="container">
      <FlashcardList flashcards={flashcards}/>
    </div>
    </>
    
    
  );
}

// const SAMPLE_FLASHCARDS = [
//   {
//     id: 1,
//     question: 'what is 2 + 2?',
//     answer: '4',
//     options: [
//       '2',
//       '3',
//       '4',
//       '5'
//     ]

//   },
//   {
//     id: 2,
//     question: 'what is 3 + 2?',
//     answer: '5',
//     options: [
//       '2',
//       '3',
//       '4',
//       '5'
//     ]

//   },
//   {
//     id: 3,
//     question: 'what is 1 + 2?',
//     answer: '3',
//     options: [
//       '2',
//       '3',
//       '4',
//       '5'
//     ]

//   }
// ]

export default App;
