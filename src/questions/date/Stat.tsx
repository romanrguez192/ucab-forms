import { Typography } from "@mui/material";
import { DateStatProps } from "./types";
import { stringify } from "./utils";

const Stat = ({ answers, question }: DateStatProps) => {
  return (
    <>
      {answers.map((answer, i) => (
        <Typography key={i} variant="body2">
          {stringify(answer[question.id])}
        </Typography>
      ))}
    </>
  );
};

export default Stat;