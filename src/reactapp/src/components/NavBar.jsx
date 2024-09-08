import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Button,
} from "@fluentui/react-components";

export const NavBar = () => {
    const navigate = useNavigate();
    return (
        <>
            <ul>
                <li>
                    <Button appearance="secondary" onClick={() => navigate('/')} >Home</Button>
                </li>
            </ul>
            <ul className="navMenuFull">
                <li>
                    <Button appearance="secondary" onClick={() => navigate('/ca')} >CA Documenter</Button>
                </li>
                <li>
                    <Button appearance="secondary" onClick={() => window.open('https://entra.news/p/entra-mind-maps', '_blank')} >Mind Map</Button>
                </li>
            </ul>
        </>
    );
}