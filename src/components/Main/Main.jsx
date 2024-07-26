import React, { useContext } from "react";
import { AuthContext } from "../../context/Context"; // Corrigir a importação para 'AuthContext'
import './Main.css';
import { assets } from "../../assets/assets";

const Main = () => {
  const { OnSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(AuthContext);

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p><span>hello, dev</span></p>
              <p>how can i help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>suggest a trip to a foreigner country</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Explain briefly about the sun</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Bonding moments with the team and how to do so</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Improve the code documentation</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input ? (
                <img onClick={() => OnSent()} src={assets.send_icon} alt="" />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            O Gemini pode apresentar informações imprecisas, inclusive sobre pessoas. Por isso, cheque as respostas. Sua privacidade e os apps do Gemini
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
