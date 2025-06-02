const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const totalScore = document.getElementById('right-answers')

const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions,currentQuestionIndex;
let quizScore = 0;


startButton.addEventListener('click',startGame)

nextButton.addEventListener('click',()=>{
    currentQuestionIndex++
    setNextQuestion()
})

function startGame(){
    startButton.classList.add('hide')
    shuffledQuestions=question.sort(()=>Math.random()-0.5)
    currentQuestionIndex=0;
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
    quizScore=0
    totalScore.innerText = `Total Score: ${quizScore}`;
}

function setNextQuestion(){
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question){
    questionElement.innerText=question.question;
    question.answers.forEach((answer)=>{
        const button = document.createElement('button')
        button.innerText=answer.text;
        button.classList.add('btn')
        if(answer.correct){
            button.dataset.correct=answer.correct
        }
        button.addEventListener('click',selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e){
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct

    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach((button) => {
        setStatusClass(button, button.dataset.correct)
    })

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide")
    } else {
        startButton.innerText = "Restart"
        startButton.classList.remove("hide")
    }

    if (correct === "true") {
        quizScore++
    }

    totalScore.innerText = `Total Score: ${quizScore}`;
}


function setStatusClass(element, correct){
    clearStatusClass(element)
    if(correct){
        element.classList.add("correct")
    }else{
        element.classList.add("wrong")
    }
}



function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}
const question = [
    {
        question:'which one of these is a JavaScript framework?',
        answers:[
            {text:'Python',correct:false},
            {text:'Django',correct:false},
            {text:'React',correct:true},
            {text:'Eclipse',correct:false},
        ]
    },
    {
        question:'who is the prime minister of India?',
        answers:[
            {text:'Narendra modi',correct:true},
            {text:'Rahul Gandhi',correct:false},
            {text:'Indira Gnadhi',correct:false},
            {text:'Pranam Mukarji',correct:false},
        ]
    },
    {
        question:'what is 4/19',
        answers:[
            {text:'1.77',correct:false},
            {text:'0.2105',correct:true},
            {text:'9.567',correct:false},
            {text:'0.2479',correct:false},
        ]
    }
]