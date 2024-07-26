import React, { useContext, useState } from 'react';
import './SideBar.css';
import { assets } from '../../assets/assets';
import { AuthContext } from '../../context/Context';  // Corrigir a importação para 'AuthContext'

const SideBar = () => {
    const [extended, setExtended] = useState(false);
    const { OnSent, prevPrompt, setRecentPrompt, newChat } = useContext(AuthContext);  // Corrigir o uso de AuthContext

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await OnSent(prompt);
    }

    return (
        <div className="sidebar">
            <div className="top">
                <img onClick={() => setExtended(prev => !prev)} className="menu" src={assets.menu_icon} alt="Menu Icon" />
                <div onClick={() => newChat()} className="new-chat">
                    <img src={assets.plus_icon} alt="New Chat Icon" />
                    {extended ? <p>new chat</p> : null}
                </div>
                {extended ? (
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {prevPrompt.map((item, index) => (
                            <div onClick={() => loadPrompt(item)} className="recent-entry" key={index}>
                                <img src={assets.message_icon} alt="Message Icon" />
                                <p>{item.slice(0, 18)}...</p>
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="Question Icon" />
                    <p>Help</p>
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="History Icon" />
                    <p>Activity</p>
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="Settings Icon" />
                    <p>Settings</p>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
