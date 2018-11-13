import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, withRouter} from 'react-router-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import AddAuthorForm from './AddAuthorForm';
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore';


const authors = [
    {
        name: 'Mark Twan',
        imageUrl: 'images/authors/MarkTwain.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['The adventure of Huckleberry Finn'],
    },
    {
        name: 'Joseph Conrad',
        imageUrl: 'images/authors/JosephConrad.png',
        imageSource: 'Wikimedia Commons',
        books: ['Heart of Darkness'],
    },
    {
        name: 'J.K. Rowling',
        imageUrl: 'images/authors/JKrowling.jpg',
        imageSource: 'Wikimedia Commons',
        imageAttribution: 'Daniel Ogren',
        books: ['Harry Potter and the Sorcerers Stone'],
    },
    {
        name: 'Stephen King',
        imageUrl: 'images/authors/StephenKing.jpg',
        imageSource: 'Wikimedia Commons',
        imageAttribution: 'Pinguino',
        books: ['The Shining', 'IT'],
    },
    {
        name: 'Charles Dickens',
        imageUrl: 'images/authors/CharlesDickens.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['David Copperfield', 'A Tale of Two Cities'],
    },
    {
        name: 'William Shakespeare',
        imageUrl: 'images/authors/WilliamShakespeare.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['Hamlet', 'Macbeth', 'Romeo and Juliet'],
    }
];

function getTurnData(authors) {
    const allBooks = authors.reduce(function (p, c, i) {
        return p.concat(c.books);
    }, []);
    
    const fourRandomBooks = shuffle(allBooks).slice(0,4);
    const answer = sample(fourRandomBooks);

    return {
        books: fourRandomBooks,
        author: authors.find((author) => 
            author.books.some((title) => 
                title === answer))
    }
}

function resetState() {
    return {
        turnData: getTurnData(authors),
        highlight: ''
    };
}

let state = resetState();

function onAnswerSelected(answer) {
    const isCorrect = state.turnData.author.books.some((book) => book === answer);
    state.highlight = isCorrect ? 'correct' : 'wrong';
    render();
}

function App() {  
    return <AuthorQuiz {...state} 
        onAnswerSelected={onAnswerSelected}
        onContinue={() => {
            state = resetState();
            render();
        }} />;
}

const AuthorWrapper = withRouter(({history}) =>
    <AddAuthorForm onAddAuthor={(author) => {
        authors.push(author);
        history.push("/");
    }} />
); 
function render() {
    ReactDOM.render(
    <BrowserRouter>
        <React.Fragment>
            <Route exact path="/" component={App}/>
            <Route path="/Add" component={AuthorWrapper}/>
        </React.Fragment>
    </BrowserRouter>, document.getElementById('root'));
}

render();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
