import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  LinearProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { WhiteBackgroundSVG } from "../../assets";
import AssignmentIcon from '@mui/icons-material/Assignment';
import toast from "react-hot-toast";
import LockIcon from "@mui/icons-material/Lock";
import { useCreateQuizSessionMutation } from "../../Redux/API/Quiz.Api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetQuiz } from "../../Redux/Slice/QuizSlice/QuizSlice";

const LevelCard = ({ level, onSelect, active,examUnlocked,Index }) => {
  console.log("index",Index)
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const [isFinalTest,setisFinalTest] = useState(true);
  const [CreateQuizSession] = useCreateQuizSessionMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(level)
  const cardStyles = active
    ? {}
    : {
      filter: "grayscale(100%)",
      backgroundImage: `url(${WhiteBackgroundSVG})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    };
    const handleQuizCraetion = () => {
      try {
        dispatch(resetQuiz());
        toast.promise(
          CreateQuizSession({
            levelid:"679d3fd96aeede5b160420a7",
            lessonid:"679d3fd96aeede5b160420ac",
            topicId:"678ba5c339053772c9f93053",
            questionCount: 60,
          }).unwrap(),
          {
            loading: "Creating Session...",
            success: (res) => {
              sessionStorage.setItem("QuizSessionID", res.sessionId);
              navigate(`/quiz/${res.sessionId}`, { replace: true });
              return "Session Created Successfully!";
            },
            error: (e) => {
              console.error(e);
              return "Failed to create session. Please try again later.";
            },
          }
        );
      } catch (error) {
        console.error("Failed to update quiz session:", error);
        toast.error("sorry session not save");
      }
    };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "#fff",
        mb: "16px",
        mr: isSm ? null : "30px",
        border: "2px solid",
        borderColor: "#02216F",
        gap: "20px",
        position: "relative",
        overflow: "hidden",
        ...cardStyles,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isSm ? "column-reverse" : "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          width: "100%",
          mb: isSm ? "40px" : "20px",
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "100%",
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#02216F",

             }}
          >{`Level ${Index}`} : {level.name}</Typography>
          <Typography variant="body2" sx={{ color: "black",
            fontSize: {
              xs: "0.70rem", 
              sm: "0.75rem", 
              md: "0.80rem", 
              lg: "0.875rem", 
              xl: "0.875rem", 
            },
            }}>
            {level.description}
          </Typography>
          <Box sx={{display:'flex', flexDirection:'row', gap:'10px'}}>
            <Button
              variant="contained"
              onClick={onSelect}
              disabled={!active}
              sx={{
                height: "50px",
                ...!isFinalTest && {width: "50%"},
                fontWeight: "bold",
                fontSize:'12px',
                backgroundColor: "#1A49BA",
                color: "#fff",
                borderRadius: "50px",
                textTransform: "none",
                px:"30px",
                "&:hover": {
                  color: "#1A49BA",
                  backgroundColor: "#FFDA55",
                },
               
              }}
            >
              Continue
            </Button>
              {active && <Button
              variant="contained"
              onClick={() => {
                if (examUnlocked) {
                  handleQuizCraetion();
                } else {
                  toast.error(
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <LockIcon
                        style={{
                          marginRight: "8px",
                          color: "inherit",
                        }}
                      />
                      Complete all lesson
                    </Box>,
                    {
                      icon: false,
                    }
                  );
                }
              }}
              // disabled
              startIcon={<AssignmentIcon />}
              sx={{
                height: "50px",
                width: "50%",
                fontWeight: "bold",
                backgroundColor: "#1A49BA",
                color: "#fff",
                borderRadius: "50px",
                fontSize:'12px',
                textTransform: "none",
                "&:hover": {
                  color:!examUnlocked?"none": "#1A49BA",
                  backgroundColor:!examUnlocked?"none": "#FFDA55",
                },
              }}
              >
              Final Test
            </Button>}
            
          </Box>
        </Box>
        <Box  
          sx={{
            marginLeft: "16px",
            width: "30%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={level.image}
            alt={`Level ${level.level}`}
            style={{ width: "150px", height: "150px" }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <Typography
          variant="body"
          sx={{
            fontWeight: "bold",
            color: "WHITE",
            px: "20px",
            py: "6px",
            bgcolor: "#1A49BA",
            borderRadius: "20px 0px 0px 0px",
            alignSelf: "flex-end",
          }}
        >
          {`${level.progress}/${level.total}`} {/* Display as fraction */}
        </Typography>
        {/* Remove this section if no progress bar is required */}
        <LinearProgress
          variant="determinate"
          value={(level.progress / level.total) * 100}
          sx={{
            height: "10px",
            bgcolor: "#FFDA55",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#1A49BA",
              borderRadius: "20px",
            },
          }}
        />

      </Box>
    </Box>
  );
};

export default LevelCard;
