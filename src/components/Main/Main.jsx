import React, { useContext } from "react"; // Importing React and the useContext hook
import { context } from "../../context/Context.jsx"; // Importing the context from Context.jsx
import './Main.css'; // Importing the CSS stylesheet for this component
import { assets } from "../../assets/assets"; // Importing image assets from the specified path

const Main = () => {
  // Destructuring values from the context
  const { OnSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(context);

  return (
    <div className="main"> {/* Main container */}
      <div className="nav"> {/* Navigation bar */}
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" /> {/* User icon */}
      </div>
      <div className="main-container"> {/* Main content container */}
        {!showResult ? ( // Conditional rendering: Show greeting and cards if 'showResult' is false
          <>
            <div className="greet"> {/* Greeting section */}
              <p><span>hello, dev</span></p>
              <p>how can i help you today?</p>
            </div>
            <div className="cards"> {/* Cards section */}
              <div className="card"> {/* Card with text and image */}
                <p>suggest a trip to a foreigner country</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card"> {/* Card with text and image */}
                <p>Explain briefly about the sun</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card"> {/* Card with text and image */}
                <p>Bonding moments with the team and how to do so</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card"> {/* Card with text and image */}
                <p>Improve the code documentation</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : ( // If 'showResult' is true, show the result section
          <div className="result">
            <div className="result-title"> {/* Result title with user icon and prompt */}
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data"> {/* Result data with gemini icon and response */}
              <img src={assets.gemini_icon} alt="" />
              {loading ? ( // Conditional rendering: Show loader if loading, otherwise show result data
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p> // Render the result data
              )}
            </div>
          </div>
        )}
        <div className="main-bottom"> {/* Bottom section with input box */}
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)} // Set input value on change
              value={input} // Bind input value to state
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="" /> {/* Gallery icon */}
              <img src={assets.mic_icon} alt="" /> {/* Microphone icon */}
              {input ? ( // Conditional rendering: Show send icon if there is input
                <img onClick={() => OnSent()} src={assets.send_icon} alt="" /> // Send icon with click handler to send prompt
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            O Gemini pode apresentar informações imprecisas, inclusive sobre pessoas. Por isso, cheque as respostas. Sua privacidade e os apps do Gemini
          </p> {/* Information text */}
        </div>
      </div>
    </div>
  );
};

export default Main; // Exporting the Main component
