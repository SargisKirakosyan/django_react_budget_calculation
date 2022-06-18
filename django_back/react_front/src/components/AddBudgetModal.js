import { Form, Modal, Button } from "react-bootstrap";
import { useRef } from "react";
import { useBudgets } from "../containers/BudgetsManipulation";

export default function AddBudgetModal({ show, handleClose }) {
    const titleRef = useRef();
    const amountRef = useRef();
    const { addBudget } = useBudgets();

    function handleSubmit(e) {
        e.preventDefault();
        addBudget({
            budget_title: titleRef.current.value,
            budget_amount: parseFloat(amountRef.current.value),
        });
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>New Budget</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Name</Form.Label>
                        <Form.Control ref={titleRef} type="text" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="amount">
                        <Form.Label>Maximum spending</Form.Label>
                        <Form.Control
                            ref={amountRef}
                            type="number"
                            required
                            min={0}
                            step={0.01}
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button variant="success" type="submit">
                            Add
                        </Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    );
}
