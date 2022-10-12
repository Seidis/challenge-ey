import { Box, Typography } from "@mui/material";
import axios from "axios";
import Title from "components/Title";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function QuizPage() {

    const { category, difficulty } = useParams();
    const [req, setReq] = useState<any[]>([]);

    const [loading, setLoading] = useState(false);

    async function getQuiz() {
        setLoading(true);
        await axios.get(process.env.REACT_APP_QUIZ_URL + '&category=' + category + '&difficulty=' + difficulty + '&limit=1').then(async (response) => {
            setReq(response.data);
            setLoading(false);
            return response.data;
        });
    }

    const [questions, setQuestions] = useState<any[]>([]);

    useEffect(() => {
        getQuiz();
    }, []);

    return (
        <>
            <Title
                title={"Quiz " + category + " " + difficulty}
            />
            {
                req.map((item, index) => (
                    <Box key={index}>
                        <>
                            <Typography
                            >
                                {item.question}
                            </Typography>
                            {/* {
                            item['answers'].map((answers: any, index_answers: any) => (
                                <div key={index_answers}>
                                <input type="radio" name="answer" value={answers} />
                                <label>{answers}</label>
                                </div>
                                ))
                            } */}
                            {
                                console.log(item)
                            }
                        </>
                    </Box>
                ))
            }
        </>
    );
}