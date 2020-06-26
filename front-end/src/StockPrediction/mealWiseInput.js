import React, { useState } from 'react';
//import './App.css';
import { Form, Input, Button } from "semantic-ui-react";


export const MealWiseInput= () => {
            
    const [id, setId] = useState("");
    const [week, setWeek] = useState("");

    return(
        <div>
            <Form>
                <Form.Field>
                    <Input
                    placeholder="Meal ID"
                    value={id}
                    onChange={e => setId(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <Input
                    placeholder="Weeks"
                    value={week}
                    onChange={e1 => setWeek(e1.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <Button
                    onClick={async () => {
                            const data = { id, week };
                            const response = await fetch('/input', {
                            method: "POST",
                            //mode: "no-cors",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(data)
                            })

                            
                            if (response.ok) {
                            console.log("response worked!");
                            setId("");
                            setWeek("");
                            //window.location.reload();

                            }
                    
                        }   
                    }>
                    submit
                </Button>
                </Form.Field>
            </Form>
        </div>
    );
    
    

};



