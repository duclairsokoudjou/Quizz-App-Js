import './style.css'
import { Questions } from "./questions";

const app = document.querySelector("#app");

const startButton = document.querySelector("#start");

startButton.addEventListener("click", startQuiz);

/*let i = 0;
startButton.addEventListener("click", () => {
    //const title = app.querySelector("h1");
    const question = 
        document.querySelector("#question") ?? document.createElement("p");
    question.id = "question"
    question.innerText = Questions[i].question;
    app.insertBefore(question, startButton);

    i++;
    if(i> Questions.length - 1){
      question.remove();
      i=0;
    }


})*/

function startQuiz(){
  let currentQuestion = 0;
  let score = 0;

  clean();
  displayQuestion(currentQuestion)

  //reset

 

  function clean(){
    while(app.firstElementChild){
      app.firstElementChild.remove();
    }
    const progress = displayProgressBar(Questions.length , currentQuestion);
    app.appendChild(progress);
  }

  
  function displayQuestion(index){
    clean();
    const question = Questions[index];
    if (!question){
      // fin du quiz
      Terminer();
      return;
    }

  

    const title = getTitleElement(question.question)
    app.appendChild(title);
    const answersrDiv = createAnswers(question.answers);
    app.appendChild(answersrDiv);

    const submitButton = getSubmitButton();
    app.appendChild(submitButton);
    submitButton.addEventListener("click", submit)
    

  }

  function Terminer(){
    const h1 = document.createElement("h1");
    h1.innerText = "Bravoo!!! Tu as terminé le quiz";
    const p = document.createElement('p');
    p.innerText = `Tu as eu ${score} sur ${Questions.length} points`;
    app.appendChild(h1)
    app.appendChild(p)
  }

  function submit(){
    const selectedAnswer = app.querySelector('input[name="answer"]:checked');
    //const selectedAnswer = app.querySelector('input[name="answer"]:checked');

    const value = selectedAnswer.value;
    const question = Questions[currentQuestion]
    const isCorrect = question.correct === value;

    if(isCorrect){
      score++;
    }

    showFeedback(isCorrect, question.correct, value)
    const feedback = getFeedBackMessage(isCorrect, question.correct);
    app.appendChild(feedback);
    displayNextQuestionButton();
    
  }

  function displayNextQuestionButton(){
    const timeout = 3000;
    let raimainingTimeout = timeout;

    app.querySelector("button").remove();

    const getButtonText = () => `Next (${raimainingTimeout / 1000}s)`;

    const nextButton = document.createElement("button");
    nextButton.innerText = getButtonText();

    app.appendChild(nextButton);

    const interval = setInterval(() => {
      raimainingTimeout -= 1000;
      nextButton.innerText = getButtonText();

    }, 1000);

    const timeout1 = setTimeout(() => {
      handleNextQuestion();
    }, timeout)

    const handleNextQuestion = () => {
      currentQuestion++;
      clearInterval(interval);
      clearTimeout(timeout1);
      displayQuestion(currentQuestion);
    }

    nextButton.addEventListener("click", () => {
      handleNextQuestion()
    })
  }
  

  function createAnswers(answers){
  const answersrDiv = document.createElement("div"); 
  answersrDiv.classList.add("answers");
  for (const answer of answers){
      const label = getAnswerElement(answer);
      answersrDiv.appendChild(label);

  }
  return answersrDiv;
}
  
}

function getTitleElement(text){
  const title = document.createElement("h3");
  title.innerText = text;
  return title;
}

function formatId(text){
  return text.replaceAll(/[^a-zA-Z0-9]/g, '_').toLowerCase();

}

function getAnswerElement(text){
  const label = document.createElement("label");
  label.innerText = text;
  const input = document.createElement("input");
  const id = formatId(text);
  input.id = id
  label.htmlFor = id
  input.setAttribute("type", "radio");
  input.setAttribute("name", "answer");
  input.setAttribute("value", text)

  label.appendChild(input);
  return label;
}

function getSubmitButton(){
  const submitButton = document.createElement("button");
  submitButton.innerHTML = 'submit';

  return submitButton;

}

function showFeedback(isCorrect, correct, answer){
  const correctAnswersId = formatId(correct);
  const correctElement = document.querySelector(`label[for="${correctAnswersId}"]`);

  const selectedAnswersId = formatId(answer);
  const selectedElement = document.querySelector(`label[for="${selectedAnswersId}"]`);

  correctElement.classList.add("correct");
  selectedElement.classList.add(isCorrect ? "correct" : "incorrect");

}

function getFeedBackMessage(isCorrect, correct){

  const paragraph = document.createElement("p");
  paragraph.innerText = isCorrect ? "Bravooo !!! :)  Tu as trouvé la bonne reponse" : `Desolé.... la bonne reponse etait ${correct}`

  return paragraph;
}

function displayProgressBar(max, value){
  const progress = document.createElement("progress");
  progress.setAttribute("max", max);
  progress.setAttribute("value", value);
  return progress;
}


