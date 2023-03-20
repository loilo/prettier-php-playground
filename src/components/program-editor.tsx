import React from "react";
import { basicSetup, useCodeMirror } from "@uiw/react-codemirror";
import { pegjs } from "@codemirror/legacy-modes/mode/pegjs";
import { Container, Card, Button, Navbar } from "react-bootstrap";
import { useStoreActions, useStoreState } from "../store/hooks";
import { HelpModal } from "./help-modal";
import { StreamLanguage } from "@codemirror/language";
import { NotesDisplay } from "./info-display";
import { EditorView } from "@codemirror/view";

export function GrammarEditor() {
    const hasRendered = React.useRef(false);
    const [helpShow, setHelpShow] = React.useState(false);
    const editorText = useStoreState((state) => state.editorText);
    const editorChange = useStoreActions((actions) => actions.editorChange);
    const editorRef = React.useRef<HTMLDivElement>(null);
    useCodeMirror({
        container: editorRef.current,
        value: editorText,
        onChange: (text) => editorChange(text),
        extensions: [basicSetup(), StreamLanguage.define(pegjs)],
        style: { height: "100%", overflow: "hidden" },
        theme: { extension: EditorView.theme({ "&": { fontSize: "10pt" } }) },
    });

    React.useEffect(() => {
        // This is a one time effect only, just to get an initial render.
        // So we purposely have no effect triggers.
        if (hasRendered.current) {
            return;
        }
        hasRendered.current = true;
        editorChange(editorText);
    }, [editorChange, editorText]);

    return (
        <Card>
            <Card.Header>
                <Navbar>
                    <Container>
                        <Navbar.Brand>PEGjs/Peggy Grammar</Navbar.Brand>
                        <Button
                            className="ms-auto"
                            variant="outline-secondary"
                            onClick={() => setHelpShow(true)}
                        >
                            Help
                        </Button>
                    </Container>
                </Navbar>
            </Card.Header>
            <Card.Body className="p-0">
                <div className="program-editor">
                    <div className="program-editor-inner" ref={editorRef} />
                </div>
            </Card.Body>
            <Card.Footer>
                <Container>
                    <NotesDisplay />
                </Container>
            </Card.Footer>
            <HelpModal show={helpShow} setShow={setHelpShow} />
        </Card>
    );
}
