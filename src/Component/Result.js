import React from 'react';

export default class Result extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { allQuestions, answerByUser } = this.props.state;
    let correct_answer_count = allQuestions.reduce((acc, cv, i) => {
      if (cv.correct_answer == answerByUser[i]) {
        acc += 1;
      }
      return acc;
    }, 0);
    return (
      <div className="container">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-[#E64471]">
            Result of the quiz
          </h3>
          <button
            onClick={this.props.resetTheQuiz}
            className="bg-[#5cb668] text-white py-2 px-8 rounded font-bold"
          >
            Retake the quiz
          </button>
        </div>
        <table className="my-9">
          <thead>
            <tr>
              <th className="text-xl font-semibold">Question</th>
              <th className="text-xl font-semibold">Correct Answers</th>
              <th className="text-xl font-semibold">You Selected</th>
              <th className="text-xl font-semibold">Right Or Wrong</th>
            </tr>
          </thead>
          <tbody>
            {allQuestions.map((q, i) => {
              return (
                <tr key={q.question}>
                  <td> {q.question}</td>
                  <td> {q.correct_answer}</td>
                  <td>{answerByUser[i]}</td>
                  <td>
                    {q.correct_answer == answerByUser[i] ? (
                      <div className="flex justify-center">
                        <svg
                          width="24"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          stroke="#38A169"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        <svg
                          fill="none"
                          width="24"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          stroke="#E53E3E"
                          viewBox="0 0 24 24"
                        >
                          <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <th className="text-left px-5" colSpan="2">
                Total Correct
              </th>
              <td colSpan="2" className="text-center">
                {correct_answer_count}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}
