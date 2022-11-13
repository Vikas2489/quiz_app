import React from 'react';
import Loader from './Loader';

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allCategories: '',
    };
  }
  componentDidMount() {
    return fetch('https://opentdb.com/api_category.php')
      .then((res) => res.json())
      .then((data) => {
        return this.setState({
          allCategories: data.trivia_categories,
        });
      });
  }
  render() {
    let { categoryId, level } = this.props.state;
    return (
      <>
        {this.state.allCategories ? (
          <div className="container">
            <p className="underline basis-full decoration-black  text-2xl my-4 text-gray-700">
              Categories
            </p>
            <ul className=" flex items-center flex-wrap">
              {this.state.allCategories.map((category, i) => {
                return (
                  <li
                    className={
                      categoryId == category.id
                        ? 'm-2 text-sm border-[1px]  border-black border-solid  px-3 py-1 rounded-md'
                        : 'm-2 text-sm text-white  bg-[#21396A] px-3 py-1 rounded-md'
                    }
                    onClick={() => this.props.updateCategoryId(category.id)}
                    key={i}
                  >
                    <button>{category.name}</button>
                  </li>
                );
              })}
            </ul>
            <div className="py-5">
              <p className="underline text-2xl my-4 text-gray-700">
                Which Level You would like to start your quiz with ?
              </p>
              <div className="mx-2">
                <button
                  onClick={() => this.props.updateLevel('easy')}
                  className={
                    level == 'easy'
                      ? ' px-6 mx-3 border-[2px] border-black border-solid font-normal text-sm py-1 rounded-3xl'
                      : 'px-6 mx-3 font-thin text-sm py-1 bg-slate-900 text-white rounded-3xl'
                  }
                >
                  Easy
                </button>
                <button
                  onClick={() => this.props.updateLevel('medium')}
                  className={
                    level == 'medium'
                      ? ' px-6 mx-3 border-[2px] border-black border-solid font-normal text-sm py-1 rounded-3xl'
                      : 'px-6 mx-3 font-thin text-sm py-1 bg-slate-900 text-white rounded-3xl'
                  }
                >
                  Medium
                </button>
                <button
                  onClick={() => this.props.updateLevel('hard')}
                  className={
                    level == 'hard'
                      ? ' px-6 mx-3 border-[2px] border-black border-solid font-normal text-sm py-1 rounded-3xl'
                      : 'px-6 mx-3 font-thin text-sm py-1 bg-slate-900 text-white rounded-3xl'
                  }
                >
                  Hard
                </button>
              </div>
            </div>
            <hr />
            <div className="text-center py-5">
              <button
                onClick={this.props.handleStartQuiz}
                className="my-2 px-20 py-2 tracking-wide mx-3 font-bold text-sm  bg-slate-900 text-white rounded-3xl"
              >
                Start Quiz
              </button>
            </div>
          </div>
        ) : (
          <>
            <Loader />
          </>
        )}
      </>
    );
  }
}

export default Category;
