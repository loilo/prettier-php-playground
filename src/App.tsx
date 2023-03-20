import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { GrammarEditor } from "./components/program-editor";
import { ResultsDisplay } from "./components/results-display";

function App() {
    return (
        <div className="App">
            <Container className="outer-container">
                <GrammarEditor />
                <ResultsDisplay />
            </Container>
        </div>
    );
}

export default App;
