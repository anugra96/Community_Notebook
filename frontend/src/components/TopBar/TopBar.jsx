import React from "react";
import "./TopBar.scss";
import BorderlineLogo from "../../resources/borderlinelogo_white.png";

export default function TopBar({}) {
    return (
        <div className={"topbar"}>

            <div className="left">
                <div className="header">Borderline Community Notebook</div>
            </div>

            <div className="center">
                <div className="header">Port Hope, Ontario</div>
            </div>

            <div className="right">
                <a href="https://twitter.com/borderlineslab?lang=en" target="_blank"><div className="logo"><img src="/twitter_white.png" alt="" /></div></a>
                <a href="https://borderlineproject.ca/borderline-port-hope" target="_blank"><div className="logo"><img src={BorderlineLogo}></img></div></a>
                
            </div>



        </div>
    )
}