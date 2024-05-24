import React, { useContext, useState } from 'react'; // Imports React and the hooks useContext and useState
import './SideBar.css'; // Imports the CSS stylesheet for this component
import { assets } from '../../assets/assets'; // Imports image assets from the specified path
import { context } from '../../context/Context';  // Imports the context from Context.jsx

const SideBar = () => {
    const [extended, setExtended] = useState(false); // Initializes the state 'extended' with default value false
    const { OnSent, prevPrompt, setRecentPrompt, newChat } = useContext(context);  // Destructures the values from context

    // Function to load a prompt when a recent entry is clicked
    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt); // Sets the recent prompt in the context
        await OnSent(prompt); // Sends the prompt
    }

    return (
        <div className="sidebar"> {/* Sidebar container */}
            <div className="top"> {/* Top section of the sidebar */}
                <img onClick={() => setExtended(prev => !prev)} className="menu" src={assets.menu_icon} alt="Menu Icon" /> {/* Menu icon with click handler to toggle 'extended' state */}
                <div onClick={() => newChat()} className="new-chat"> {/* New chat button with click handler to start a new chat */}
                    <img src={assets.plus_icon} alt="New Chat Icon" /> {/* Plus icon for new chat */}
                    {extended ? <p>new chat</p> : null} {/* Conditional rendering: 'new chat' text only if 'extended' is true */}
                </div>
                {extended ? ( // Conditional rendering: Recent prompts section only if 'extended' is true
                    <div className="recent">
                        <p className="recent-title">Recent</p> {/* Title for the recent prompts section */}
                        {prevPrompt.map((item, index) => ( // Maps over previous prompts to create a list of recent entries
                            <div onClick={() => loadPrompt(item)} className="recent-entry" key={index}> {/* Click handler to load the prompt */}
                                <img src={assets.message_icon} alt="Message Icon" /> {/* Message icon */}
                                <p>{item.slice(0, 18)}...</p> {/* Displays first 18 characters of the prompt */}
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
            <div className="bottom"> {/* Bottom section of the sidebar */}
                <div className="bottom-item recent-entry"> {/* Help item */}
                    <img src={assets.question_icon} alt="Question Icon" /> {/* Question icon */}
                    <p>Help</p> {/* Help text */}
                </div>
                <div className="bottom-item recent-entry"> {/* Activity item */}
                    <img src={assets.history_icon} alt="History Icon" /> {/* History icon */}
                    <p>Activity</p> {/* Activity text */}
                </div>
                <div className="bottom-item recent-entry"> {/* Settings item */}
                    <img src={assets.setting_icon} alt="Settings Icon" /> {/* Settings icon */}
                    <p>Settings</p> {/* Settings text */}
                </div>
            </div>
        </div>
    );
};

export default SideBar; // Exports the SideBar component
