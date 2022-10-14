import Title from "components/Title";
import { Grid } from "@mui/material";
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
                sx={{
                    marginTop: 2,
                    marginBottom: 2
                }}
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
                                image={item.image}
                            />
                        </Grid>
                    ))
                }
            </Grid>
        </>
    );
}

const list = [{
    "image": "quiz/Linux.png",
    "category": "Linux",
    "difficulty": "Easy",
    "badge": 1
}, {
    "image": "quiz/Linux.png",
    "category": "Linux",
    "difficulty": "Medium",
    "badge": 2
}, {
    "image": "quiz/Linux.png",
    "category": "Linux",
    "difficulty": "Hard",
    "badge": 3
}, {
    "image": "quiz/bash.png",
    "category": "Bash",
    "difficulty": "Easy",
    "badge": 4
}, {
    "image": "quiz/bash.png",
    "category": "Bash",
    "difficulty": "Medium",
    "badge": 5
}, {
    "image": "quiz/php.png",
    "category": "Php",
    "difficulty": "Easy",
    "badge": 6
}, {
    "image": "quiz/php.png",
    "category": "Php",
    "difficulty": "Medium",
    "badge": 7
}, {
    "image": "quiz/php.png",
    "category": "Php",
    "difficulty": "Hard",
    "badge": 8
}];