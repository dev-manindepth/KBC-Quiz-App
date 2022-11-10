import { useEffect, useState } from "react";
import useSound from "use-sound";
import { useReward } from "react-rewards";
import play from "../assets/sounds_play.mp3";
import correct from "../assets/sounds_correct.mp3";
import wrong from "../assets/sounds_wrong.mp3";

export default function Quiz({
  data,
  setStop,
  questionNumber,
  setQuestionNumber,
  earned,
  setEarned,
  prizeMoney
}) {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [className, setClassName] = useState("answer");
  const [letsplay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);
  const { reward: confettiReward } = useReward("confettiReward", "confetti");

  useEffect(() => {
    letsplay();
  }, [letsplay]);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [questionNumber, data]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (option) => {
    setSelectedAnswer(option);
    setClassName("answer active");
    delay(3000, () =>
      setClassName(option.correct ? "answer correct" : "answer wrong")
    );
    delay(5000, () => {
      if (option.correct) {
        confettiReward();
        correctAnswer();

        delay(1000, () => {
          if (questionNumber >= prizeMoney.length) {
            setStop(true);
          }
          setQuestionNumber((prev) => prev + 1);
          setSelectedAnswer(null);
        });
      } else {
        wrongAnswer();
        delay(1000, () => {
          setStop(true);
        });
      }
    });
  };
  return (
    <div className="quiz">
      {/* {prizeMoney[prizeMoney.length - 1].amount === earned ? (
        setStop(true)
      ) : (
        <>
          <div className="question">{question?.question}</div>
          <span id="confettiReward"></span>
          <div className="answers">
            {question?.answers.map((option) => (
              <div
                className={selectedAnswer === option ? className : "answer"}
                onClick={() => handleClick(option)}
              >
                {option.text}
              </div>
            ))}
          </div>{" "}
        </>
      )} */}
      <div className="question">{question?.question}</div>
      <span id="confettiReward"></span>
      <div className="answers">
        {question?.answers.map((option) => (
          <div
            className={selectedAnswer === option ? className : "answer"}
            onClick={() => handleClick(option)}
          >
            {option.text}
          </div>
        ))}
      </div>
    </div>
  );
}
