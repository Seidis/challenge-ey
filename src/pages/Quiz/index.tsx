import Title from "components/Title";
import axios from "axios";
import { useState } from "react";
import { Button, Grid } from "@mui/material";
import CardQuiz from "./QuizCard";

export default function Quiz() {

    return (
        <>
            <Title
                title="Quiz"
            />
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                {
                    list.map((item, index) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            key={index}
                        >
                            <CardQuiz
                                category={item.category}
                                difficulty={item.difficulty}
                            />
                        </Grid>
                    ))
                }
            </Grid>
        </>
    );
}

const list = [{
    "category": "Linux",
    "difficulty": "Easy"
}, {
    "category": "Linux",
    "difficulty": "Medium"
}, {
    "category": "Linux",
    "difficulty": "Hard"
}];