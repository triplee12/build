const quizData = [{
        question: 'How old is Triplee12?',
        a: '10',
        b: '17',
        c: '26',
        d: '110',
        correct: 'c'
    },
    {
        question: 'What is the most used programming language in 2020?',
        a: 'Java',
        b: 'c',
        c: 'python',
        d: 'javascript',
        correct: 'd'
    },
    {
        question: 'Who is the president of USA?',
        a: 'Florin Pop',
        b: 'Donald Trump',
        c: 'Joe Baiden',
        d: 'Gorge Cliton',
        correct: 'b'
    },
    {
        question: 'What the full meaning of HTML?',
        a: 'Hypertext Markup Language',
        b: 'Hypercascding Markup Language',
        c: 'Highertext Modifier Language',
        d: 'Highercascading Modifier Language',
        correct: 'a'
    },
    {
        question: 'When was javascript launched?',
        a: '2000',
        b: '2019',
        c: '1995',
        d: 'none of the above',
        correct: 'c'
    }
];

const answerEls = document.querySelectorAll('.answer');
const quiz = document.getElementById('quiz');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const button = document.getElementById('btn');

let currentQuiz = 0;
let score = 0;

loadQuiz();

function getSelected() {
    let answer = undefined;

    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

function deselectAnswers() {
    answerEls.forEach(answerEl => {
        answerEl.checked = false;
    });
}

function loadQuiz() {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];

    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

button.addEventListener('click', () => {
    let answer = getSelected();
    console.log(answer);
    if (answer === quizData[currentQuiz].correct) {
        score++;
    }
    if (answer) {
        currentQuiz++;
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            quiz.innerHTML = `<h2 style="text-align: center; margin: 4px; align-content: center;">You answered correctly at ${score}/${quizData.length} questions.</h2><br><button onClick="location.reload()">Reload</button>`;
        }
    }
});