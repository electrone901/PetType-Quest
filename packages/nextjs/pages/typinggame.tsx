import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
// import CreateProfile from "~~/components/CreateProfile";
// import ProfileVerification from "~~/components/ProfileVerification";
/*
- show one sentence at a time
- at the end of game ask user to save score to chain
- use that score to create a user activty history
- respesent that as a char, pie or dashboard analytics
- mint an nft is the beat the clock give a certificate of participation =>   https://ethglobal.b0bd725bc77a3ea7cd3826627d01fcb6.r2.cloudflarestorage.com/certificates/101808/certificate.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=e9298b2da83ffa813f14ac76357a2b58%2F20231114%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231114T172003Z&X-Amz-Expires=900&X-Amz-Signature=9933a163ac4a78af61230f445b5a32214ae3396c7b0af0d8fd0922f0fb1412f4&X-Amz-SignedHeaders=host
-

 */
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import TyingSpeedFeedback from "~~/components/TyingSpeedFeedback";
const words = [
  "came",
  "come",
  "letter",
  "end",
  "I",
  "all",
  "number",
  "oil",
  "within",
  "now",
  "right",
  "feet",
  "leave",
  "what",
  "now",
  "fall",
  "came",
  "live",
  "year",
  "about",
  "got",
  "came",
  "set",
  "were",
  "follow",
  "study",
  "day",
  "eye",
  "over",
  "why",
  "why",
  "talk",
  "soon",
  "because",
  "eye",
  "watch",
  "year",
  "her",
  "any",
  "by",
  "I",
  "both",
  "around",
  "book",
  "line",
  "mother",
  "open",
  "now",
  "that",
  "mile",
  "go",
  "by",
  "found",
  "said",
  "eye",
  "come",
  "so",
  "place",
  "food",
  "got",
  "city",
  "always",
  "these",
  "any",
  "use",
  "been",
  "was",
  "read",
  "their",
  "without",
  "as",
  "change",
  "leave",
  "can",
  "they",
  "those",
  "eat",
  "never",
  "no",
  "eat",
  "story",
];

// TypingGame
function TypingGame() {
  const { address } = useAccount();
  const [randomWord, setRandomWord] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [typedWord, setTypedWord] = useState("");
  const [score, setScore] = useState(10);
  const [petImage, setPetImage] = useState("/assets/mood/sad1.png");
  const [time, setTime] = useState(0);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [text, setText] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [typingSpeed, setTypingSpeed] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

  const [timeRemaining, setTimeRemaining] = useState("");
  const [timeRemaining1, setTimeRemaining1] = useState(0);
  console.log("🚀 ~ file: typinggame.tsx:121 ~ TypingGame ~ timeRemaining1:", timeRemaining1);

  const startGame = () => {
    setRandomWord(getRandomWord());
    setTypedWord("");
    setScore(0);
    setTime(time);
    setGameOver(false);
  };

  const handleInputChange = (e: { target: { value: any } }) => {
    const insertedText = e.target.value;
    if (insertedText === randomWord) {
      setScore(score + 1);
      setRandomWord(getRandomWord());
      setText(insertedText);
      if (!startTime) {
        // Start measuring typing speed when the user starts typing
        setStartTime(new Date());
      }
      setTypedWord("");
    } else {
      setTypedWord(insertedText);
    }
  };

  useEffect(() => {
    if (time > 0 && !gameOver) {
      const timer = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timer);
    } else if (time === 0 && !gameOver) {
      setGameOver(true);
      setShowResults(true);
    }
  }, [time, gameOver]);

  const { data: profile } = useScaffoldContractRead({
    contractName: "UserProfile",
    functionName: "profiles",
    args: [address],
  });

  useEffect(() => {
    const formatDate = async () => {
      const timestamp = profile[7].toString();
      const date = new Date(timestamp * 1000);
      const formattedDate = date.toLocaleString();
      setTimeRemaining1(formattedDate);
      return formattedDate;
    };

    if (profile) {
      const calculateTime = formatDate();
      console.log("calculateTime:", calculateTime);
    }
  }, [profile]);
  console.log("🚀 ~ file: typinggame.tsx:159 ~ TypingGame ~ profile:", profile);

  //  ['0x4D59AA69166BbA3F26C3860414a5D873e867380a', 'type1', 'Moon', 20n, 20n, 120n, 0n]
  //  <span className="ml-2 font-light"> {profile ? profile[6].toString() : ""} games</span>

  //                         formula:
  //                         calories = 120 / profile ? profile[4].toString() : 0

  //                         120/20

  // const [caloriesAvailable, setCaloriesAvailable] = useState(10);
  const [caloriesAvailable, setCaloriesAvailable] = useState(profile ? profile[4].toString() : 0);

  const calculateTimeRemaining = () => {
    // setCaloriesAvailable(profile ? profile[4].toString() : 0);
    // const caloriesNeededPerDay = 120;
    // const hoursLeft = Number(caloriesAvailable) / (caloriesNeededPerDay / 24);
    // const minutesLeft = hoursLeft * 60;

    // return {
    //   hours: Math.floor(hoursLeft),
    //   minutes: Math.floor(minutesLeft % 60),
    //   seconds: Math.floor((minutesLeft * 60) % 60),
    // };

    // const now = new Date().getTime();
    // const distance = countDownDate - now;

    // const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    // const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    // const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    // const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    // return {
    //   days,
    //   hours,
    //   minutes,
    //   seconds,
    //   expired: distance < 0,
    // };

    // old
    const countDownDate = new Date(timeRemaining1).getTime();
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    return {
      days,
      hours,
      minutes,
      seconds,
      expired: distance < 0,
    };
  };

  useEffect(() => {
    const tempCal = profile ? profile[4].toString() : 0;
    setCaloriesAvailable(tempCal);
    if (Number(caloriesAvailable) < 100) {
      setPetImage("/assets/mood/sad2.png");
    } else if (Number(caloriesAvailable) < 120) {
      setPetImage("/assets/mood/confu.png");
    } else {
      setPetImage("/assets/mood/happy.png");
    }
  }, [petImage, caloriesAvailable, setCaloriesAvailable, profile]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);
    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  const getDate = () => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Months are zero-indexed
    const year = currentDate.getFullYear();
    // Format the date as "MM/DD/YYYY"
    const formattedDate = `${month}/${day}/${year}`;

    return formattedDate;
  };

  const { writeAsync: saveResults, isLoading, isMining } = useScaffoldContractWrite({
    contractName: "UserProfile",
    functionName: "saveGamePlayed",
    args: [address, BigInt(score), getDate()],
    // For payable functions, expressed in ETH
    // value: "0.01",
    // The number of block confirmations to wait for before considering transaction to be confirmed (default : 1).
    blockConfirmations: 1,
    // The callback function to execute when the transaction is confirmed.
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
      // router.push("/typinggame");
    },
  });

  function calculateTimeLeft() {
    const calories = 15;
    const caloriesNeededPerDay = 120;
    const secondsPerDay = 24 * 60 * 60;

    const timeToNextFeeding = (calories / caloriesNeededPerDay) * secondsPerDay;
    // This has to be safe
    console.log("🚀seconds", timeToNextFeeding);

    // Convert seconds to hours and minutes
    const hoursLeft = Math.floor(timeToNextFeeding / 3600);
    const minutesLeft = Math.floor((timeToNextFeeding % 3600) / 60);
    console.log("hoursLeft, minutesLeft", hoursLeft, minutesLeft);

    return { hoursLeft, minutesLeft };
  }

  return (
    <div className="h-full">
      <div className="grid grid-cols-3 gap-[0.8px] ">
        {/* Pet's Stats*/}
        <div className="bg-gray-800 text-white">
          <div className=" rounded overflow-hidden shadow-lg bg-blue-600 text-white">
            <img className="w-[100%] h-full object-cover" src={petImage} alt="Game Image" />

            {timeRemaining.expired ? (
              <p className="text-sm font-bold  text-right m-0 mt-2 mr-2">EXPIRED</p>
            ) : (
              <p className="text- font-bold  text-right m-0 mt-2 pr-4 w-full">
                Time left: {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m {timeRemaining.seconds}{" "}
                s
              </p>
            )}
            <div className="px-6 pb-20">
              <p className="font-bold text-2xl mb-2">{profile ? profile[2] : "loading"}</p>
              <p className="text-sm">
                Your pet has a lifecycle, and if it doesn't receive the required calories within 24 hours, it "dies."
              </p>
              <div className="grid grid-cols-2 gap-4">
                {/* Stacts */}
                <div className="overflow-x-auto">
                  <p className="font-bold text-lg mb-2">General info</p>
                  <table className="  border border-gray-200 text-left">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-b font-light">Name</th>
                        <th className="py-2 px-4 border-b font-light">{profile ? profile[2] : "loading"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2 px-4 border-b font-light">Calories p/day</td>
                        <td className="py-2 px-4 border-b font-light">120</td>
                      </tr>

                      <tr>
                        <td className="py-2 px-4 border-b font-light">Breed</td>
                        <td className="py-2 px-4 border-b font-light">Persian cat</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b font-light">Weight</td>
                        <td className="py-2 px-4 border-b font-light">20 Pounds</td>
                      </tr>
                    </tbody>
                  </table>

                  <p className="font-bold text-lg mb-2 mt-8">Analysis</p>
                  <div className="flex items-center">
                    <span className="font-medium">Games played:</span>
                    <span className="ml-2 font-light"> {profile ? profile[6].toString() : ""} games</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium">Last games :</span>
                    <span className="ml-2 font-light">November 30 2023</span>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="overflow-x-auto">
                  <p className="font-bold text-lg mb-2">Current Status</p>
                  <table className="  border border-gray-200 text-left">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-b font-light">Last Available calories</th>
                        <th className="py-2 px-4 border-b font-light">{profile ? profile[4].toString() : "0"} </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2 px-4 border-b font-light">Good until</td>
                        <td className="py-2 px-4 border-b font-light">{timeRemaining1 ? timeRemaining1 : 0}</td>
                      </tr>

                      <tr>
                        <td className="py-2 px-4 border-b font-light">Pet Mood </td>
                        <td className="py-2 px-4 border-b font-light">Happy </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Typing Game*/}
        <div className="bg-gray-800 text-white  h-full">
          {showResults ? (
            <div className="flex items-center justify-center  mt-64">
              <div className="text-center">
                <h2 className="text-3xl mb-4 bg-gray-800 p-2 rounded-md">Game Over</h2>
                <p>Your final score is: {score}</p>

                <div className="flex">
                  <button
                    onClick={() => setShowResults(false)}
                    className="ml-4 px-6 py-1.5 bg-blue-500 text-white rounded-md"
                  >
                    Play Again
                  </button>
                  <button onClick={() => saveResults()} className="ml-4 px-6 py-1.5 bg-green-500 text-white rounded-md">
                    Save Score
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-800 text-white min-h-screen flex items-center justify-center">
              <button
                id="settings-btn"
                className="fixed bottom-24  bg-green-300 text-white py-2 px-4 rounded-full cursor-pointer"
                onClick={() => {
                  setSettingsVisible(!settingsVisible);
                }}
              >
                ⚙️
              </button>

              <div
                id="settings"
                className={` fixed top-12 left-0 w-full  text-white flex items-center justify-center transform transition-transform ease-in-out ${
                  settingsVisible ? "" : "hidden"
                }`}
              >
                <form id="settings-form" className="flex items-center justify-center h-full py-4">
                  <div>
                    <label htmlFor="difficulty" className="block mb-2 text-white pt-4">
                      Settings
                    </label>
                    <select
                      id="difficulty"
                      onChange={e => {
                        const selectedTime = parseInt(e.target.value);
                        setTime(selectedTime);
                      }}
                      disabled={!gameOver}
                      className="w-26 p-2 appearance-none border-none rounded-sm bg-blue-500 rounded-md"
                    >
                      <option>select one</option>
                      <option value="10">10 seconds</option>
                      <option value="30">30 seconds</option>
                      <option value="90">1 Minute</option>
                      <option value="180">2 Minute</option>
                    </select>
                    <button
                      onClick={startGame}
                      disabled={!gameOver}
                      className="ml-4 p-2 bg-green-500 text-white rounded-md"
                    >
                      Start Game ➤
                    </button>
                  </div>
                </form>
              </div>

              <div className=" p-8 rounded-md shadow-lg text-center">
                <h2 className="text-3xl mb-4 bg-gray-800 p-2 rounded-md">👩‍💻 Typing Game 👨‍💻</h2>
                <small className="text-3xl mb-4 bg-gray-800 p-2 rounded-md">Type the following:</small>

                <h1 id="word" className="text-4xl font-bold mb-4">
                  {randomWord}{" "}
                </h1>

                <input
                  type="text"
                  id="text"
                  value={typedWord}
                  className="border border-white p-2 mb-4 w-64 text-black"
                  autoComplete="off"
                  onChange={handleInputChange}
                  placeholder="Type the word here..."
                />

                <p className="text-xl mb-4">
                  Time left: <span id="time">{time}s</span>
                </p>
                <p className="score-container text-xl mb-4">
                  Score: <span id="score">{score}</span>
                </p>
                <div id="end-game-container" className="end-game-container"></div>
              </div>
            </div>
          )}
        </div>

        {/* Display Speed reaction*/}
        <TyingSpeedFeedback
          text={text}
          startTime={startTime}
          typingSpeed={typingSpeed}
          setTypingSpeed={setTypingSpeed}
        />
      </div>
    </div>
  );
}

export default TypingGame;
