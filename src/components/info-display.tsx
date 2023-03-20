import React from "react";
import { Card, Alert } from "react-bootstrap";
import { useStoreState } from "../store/hooks";
import { isParseError } from "../worker/errors";

export function NotesDisplay() {
    const parseError = useStoreState((state) => state.error);

    let notes = [<Card.Text key="default">No warnings</Card.Text>];

    if (parseError) {
        notes.length = 0;
    }
    if (parseError) {
        notes.push(
            <Alert variant="warning" key="parse">
                {isParseError(parseError) ? parseError.desc : parseError}
            </Alert>
        );
    }

    return <React.Fragment>{notes}</React.Fragment>;
}
