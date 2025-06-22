import React from "react";
import "./style.css";

function App() {
  return (
    <div>
      <header>
        <nav>
          <h1>Pradeep</h1>
          <ul className="navbar">
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#resume">Resume</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section id="hero">
          <h2>Hi, I'm Pradeep 👋</h2>
          <p>Cybersecurity Graduate | Penetration Tester | SOC Analyst in Training</p>
        </section>

        {/* Placeholder sections */}
        <section id="about"></section>
        <section id="projects"></section>
        <section id="skills"></section>
        <section id="resume"></section>
        <section id="contact"></section>
      </main>
    </div>
  );
}

export default App;
