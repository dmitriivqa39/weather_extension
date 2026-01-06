import React from "react";
import { createRoot } from "react-dom/client";
import './options.css'

const test = <img src='icon.png'></img>;

const root = document.createElement("div");
document.body.appendChild(root);

createRoot(root).render(test);
