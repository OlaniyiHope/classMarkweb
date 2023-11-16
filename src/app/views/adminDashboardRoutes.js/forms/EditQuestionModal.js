import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const EditQuestionModal = ({ open, onClose, question, onUpdate }) => {
  const [editedQuestion, setEditedQuestion] = useState(question);

  useEffect(() => {
    setEditedQuestion(question);
  }, [open, question]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch(
        `http://localhost:3003/api/questions/${editedQuestion._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editedQuestion),
        }
      );

      if (response.ok) {
        console.log("Question updated successfully");
        onUpdate(editedQuestion);
      } else {
        console.error("Failed to update the question");
      }
    } catch (error) {
      console.error("An error occurred while updating the question:", error);
    }

    onClose();
  };

  const handleTitleChange = (e) => {
    setEditedQuestion({
      ...editedQuestion,
      questionTitle: e.target.value,
    });
  };

  const handleMarkChange = (e) => {
    setEditedQuestion({
      ...editedQuestion,
      mark: e.target.value,
    });
  };

  const handleOptionChange = (index, e) => {
    const updatedOptions = [...editedQuestion.options];
    updatedOptions[index] = e.target.value;
    setEditedQuestion({
      ...editedQuestion,
      options: updatedOptions,
    });
  };

  const handleCorrectAnswerChange = (option) => {
    setEditedQuestion({
      ...editedQuestion,
      correctAnswer: option,
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Question</DialogTitle>
      <DialogContent>
        <TextField
          label="Question Title"
          value={editedQuestion.questionTitle}
          onChange={handleTitleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Mark"
          type="number"
          value={editedQuestion.mark}
          onChange={handleMarkChange}
          fullWidth
          margin="normal"
        />

        {editedQuestion.questionType === "multiple_choice" && (
          <div>
            {editedQuestion.options &&
              editedQuestion.options.map((option, index) => (
                <div key={index}>
                  <TextField
                    label={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e)}
                    fullWidth
                    margin="normal"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={editedQuestion.correctAnswer === option}
                        onChange={() => handleCorrectAnswerChange(option)}
                        name={`correct${index + 1}`}
                      />
                    }
                    label="Correct"
                  />
                </div>
              ))}
          </div>
        )}

        {editedQuestion.questionType === "true_false" && (
          <FormControlLabel
            control={
              <Checkbox
                checked={editedQuestion.correctAnswer === "true"}
                onChange={(e) =>
                  handleCorrectAnswerChange(e.target.checked ? "true" : "false")
                }
                name="answer"
              />
            }
            label="True"
          />
        )}

        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Update Question
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditQuestionModal;
