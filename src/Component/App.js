import React from 'react';
import Header from './Header.';
import Category from './Category';
import Question from './Question';
import Result from './Result';

export default class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      categoryId: '',
      level: '',
      allQuestions: '',
      questionNumber: 0,
      answerByUser: [],
      hasNotSelectedAnyAnswer: null,
    };
  }

  handleLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(this.state));
  };

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleLocalStorage);
  }

  componentDidMount() {
    if (localStorage.state) {
      let parsedState = JSON.parse(localStorage.state);
      this.setState({
        categoryId: parsedState.categoryId || '',
        level: parsedState.level || '',
        allQuestions: parsedState.allQuestions || '',
        questionNumber: parsedState.questionNumber || 0,
        answerByUser: parsedState.answerByUser || [],
        hasNotSelectedAnyAnswer: parsedState.hasNotSelectedAnyAnswer || null,
      });
    }
    window.addEventListener('beforeunload', this.handleLocalStorage);
  }

  updateAnswerByUser = (answer) => {
    let { answerByUser } = this.state;
    if (answerByUser.length > 0) {
      if (answerByUser[this.state.questionNumber]) {
        this.setState({
          answerByUser: this.state.answerByUser.map((a, i) => {
            if (i == this.state.questionNumber) {
              return (a = answer);
            } else {
              return a;
            }
          }),
          hasNotSelectedAnyAnswer: false,
        });
      } else {
        this.setState({
          answerByUser: this.state.answerByUser.concat(answer),
          hasNotSelectedAnyAnswer: false,
        });
      }
    } else {
      this.setState({
        answerByUser: this.state.answerByUser.concat(answer),
        hasNotSelectedAnyAnswer: false,
      });
    }
  };

  updateCategoryId = (id) => {
    this.setState({
      categoryId: id,
    });
  };

  updateLevel = (level) => {
    this.setState({
      level,
    });
  };

  handleStartQuiz = () => {
    let { categoryId, level } = this.state;
    if (!categoryId && !level) {
      alert('Please select category and difficulty level for quiz');
    } else if (categoryId && !level) {
      alert('Please select difficulty level for quiz');
    } else if (!categoryId && level) {
      alert('Please select category for quiz');
    } else {
      let { categoryId, level } = this.state;

      // fetching questions
      return fetch(
        `https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=${level}`
      )
        .then((res) => res.json())
        .then((questions) => {
          return this.setState({
            allQuestions: questions.results,
          });
        })
        .catch((err) => console.log(err));
    }
  };

  updateCurrentQuestion = () => {
    if (this.state.answerByUser[this.state.questionNumber]) {
      this.setState({
        questionNumber: this.state.questionNumber + 1,
        hasNotSelectedAnyAnswer: null,
      });
    } else if (!this.state.answerByUser[this.state.questionNumber]) {
      this.setState({
        hasNotSelectedAnyAnswer: true,
      });
    }
  };

  resetTheQuiz = () => {
    return this.setState({
      categoryId: '',
      level: '',
      allQuestions: '',
      questionNumber: 0,
      answerByUser: [],
      hasNotSelectedAnyAnswer: null,
    });
  };

  returnComponent = () => {
    if (this.state.questionNumber > 9) {
      return <Result resetTheQuiz={this.resetTheQuiz} state={this.state} />;
    } else if (
      this.state.questionNumber >= 0 &&
      this.state.questionNumber <= 9 &&
      this.state.allQuestions.length > 0
    ) {
      return (
        <Question
          hasNotSelectedAnyAnswer={this.state.hasNotSelectedAnyAnswer}
          answerByUser={this.state.answerByUser}
          updateAnswerByUser={this.updateAnswerByUser}
          questionNumber={this.state.questionNumber}
          allQuestions={this.state.allQuestions}
          updateCurrentQuestion={this.updateCurrentQuestion}
        />
      );
    } else {
      return (
        <Category
          updateCategoryId={this.updateCategoryId}
          updateLevel={this.updateLevel}
          state={this.state}
          handleStartQuiz={this.handleStartQuiz}
        />
      );
    }
  };

  render() {
    return (
      <>
        <Header />
        {this.returnComponent()}
      </>
    );
  }
}
