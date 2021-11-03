import React, { useState } from "react";
import {Form, Button, ButtonGroup, ToggleButton} from 'react-bootstrap'

const SelfAssessment = () => {
  const [radioValue, setRadioValue] = useState('1');

  const radios = [
      { name: 'Yes', value: '1' },
      { name: 'No', value: '2' },
  ];
  return (
    <div class="container">
        <h3>Self-Assessment</h3>
        <Form>
            <Form.Group className="mb-3" controlId="question1">
                <Form.Label>question1 text goes here .. </Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="question1">
                <Form.Label>question1 text goes here .. </Form.Label>
                <ButtonGroup>
                    {radios.map((radio, idx) => (
                    <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        type="radio"
                        variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                        name="radio"
                        value={radio.value}
                        checked={radioValue === radio.value}
                        onChange={(e) => setRadioValue(e.currentTarget.value)}
                    >
                        {radio.name}
                    </ToggleButton>
                    ))}
                </ButtonGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="question1">
                <Form.Label>question1 text goes here .. </Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="question1">
                <Form.Label>question1 text goes here .. </Form.Label>
            </Form.Group>                   
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </div>
  );    
}
export default SelfAssessment;

