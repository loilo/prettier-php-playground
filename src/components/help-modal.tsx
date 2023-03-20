import React from "react";
import { Modal } from "react-bootstrap";

export function HelpModal({
    show,
    setShow,
}: {
    show: boolean;
    setShow: (state: boolean) => void;
}) {
    return (
        <Modal show={show} onHide={() => setShow(false)} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Help</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    PEGjs/<a href="https://peggyjs.org/">Peggy</a> defines a
                    syntax for generating parsers with Javascript.{" "}
                </p>
                <p>
                    This library demonstrates the{" "}
                    <code>prettier-plugin-pegjs</code> formatting of a
                    PEGjs/Peggy grammar. It can be used with a standard{" "}
                    <a href="https://prettier.io/">Prettier</a> installation by
                    running <code>npm i -D prettier-plugin-pegjs</code> and then
                    using Prettier.
                </p>
            </Modal.Body>
        </Modal>
    );
}
