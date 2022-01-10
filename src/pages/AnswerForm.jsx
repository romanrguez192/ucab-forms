import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getForm } from "../api/forms";
import { getQuestions } from "../api/questions";
import { submitResponse } from "../api/responses";
import Question from "../components/Question";

const AnswerForm = () => {
  const { id: formId } = useParams();
  const [form, setForm] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loadingForm, setLoadingForm] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeForm = getForm(formId, (form) => {
      setForm(form);
      setLoadingForm(false);
    });

    const unsubscribeQuestions = getQuestions(formId, (questions) => {
      setQuestions(questions);
    });

    return () => {
      unsubscribeForm();
      unsubscribeQuestions();
    };
  }, [formId]);

  const submit = async (e) => {
    e.preventDefault();

    const { error } = await submitResponse(formId, answers);

    if (error) {
      alert(error.message);
    }

    alert("Encuesta enviada");
    navigate("/");
  };

  if (loadingForm) {
    return <Typography variant="h2">Loading...</Typography>;
  }

  if (!form) {
    return <Typography variant="h2">No se encontró la encuesta</Typography>;
  }

  return (
    <Box>
      <Typography variant="h1">Answer Form</Typography>
      <Typography variant="h2">{form.title}</Typography>
      <Typography variant="h3">{form.description}</Typography>
      <form onSubmit={submit}>
        {questions.map((question) => (
          <Question
            key={question.id}
            question={question}
            answers={answers}
            setAnswers={setAnswers}
          />
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </Box>
  );
};

export default AnswerForm;
