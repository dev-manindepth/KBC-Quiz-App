import "./styles.css";
import { prizeMoneyList, questions } from "./data";
import { useEffect, useMemo, useState } from "react";
import Quiz from "./components/Quiz";
import Timer from "./components/Timer";
import Start from "./components/Start";
export default function App() {
  const [username, setUsername] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("$ 0");

  const prizeMoney = useMemo(() => prizeMoneyList, []);

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(
        prizeMoney.find((money) => money.id === questionNumber - 1).amount
      );
    questionNumber === prizeMoney.length &&
      setEarned(prizeMoney[prizeMoney.length - 1].amount);
  }, [prizeMoney, questionNumber]);

  return (
    <div className="app">
      {username ? (
        <>
          <div className="main">
            {stop ? (
              <h1 className="gameEnd">You earned {earned}</h1>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer setStop={setStop} questionNumber={questionNumber} />
                  </div>
                </div>
                <div className="bottom">
                  <Quiz
                    data={questions}
                    setStop={setStop}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                    earned={earned}
                    setEarned={setEarned}
                    prizeMoney={prizeMoney}
                  />{" "}
                </div>
              </>
            )}
          </div>
          <div className="prize-container">
            <h1 className="username"> {username}</h1>
            <ul className="moneyList">
              {prizeMoney.map((moneyAmount) => {
                return (
                  <li
                    className={
                      questionNumber === moneyAmount.id
                        ? "moneyListItem active"
                        : "moneyListItem "
                    }
                  >
                    <span className="moneyListItemNumber">
                      {moneyAmount.id}
                    </span>
                    <span className="moneyListItemAmount">
                      {" "}
                      {moneyAmount.amount}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      ) : (
        <Start setUsername={setUsername} />
      )}
    </div>
  );
}
