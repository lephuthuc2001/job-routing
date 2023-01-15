import React from "react";
import { Paper } from "@mui/material";
import { Divider } from "@mui/material";
import { Chip, Button } from "@mui/material";

import { useAuth } from "./Auth";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
function Job({ data }) {
  const Auth = useAuth();
  const navigate = useNavigate();
  const clickHandler = () => {
    if (!Auth.user) {
      navigate("login", {
        state: {
          url: `/detail/${data.id}`,
          data: data,
        },
      });
    } else {
      navigate(`detail/${data.id}`, {
        state: { data: data },
      });
    }
  };

  return (
    <Paper
      sx={{
        height: "350px",
        width: "350px",
        padding: "10px",
        position: "relative",
        backgroundColor: "#212529",
      }}
    >
      <h2 style={{ textAlign: "center" }}>{data.title}</h2>
      <Divider />
      <div
        className="info"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          className="job-properties"
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          {(data.skills.length > 3 ? data.skills.slice(0, 3) : data.skills).map(
            (skill) => (
              <Chip
                sx={{ backgroundColor: "#962727" }}
                key={Math.random().toString(36).substring(5)}
                label={skill}
              />
            )
          )}
        </div>

        <p
          style={{
            marginTop: "20px",
          }}
        >
          {data.description.length > 200
            ? data.description.slice(
                0,
                data.description.slice(0, 200).lastIndexOf(".") + 1
              )
            : data.description}
        </p>
        <Button
          onClick={clickHandler}
          sx={{
            position: "absolute",
            bottom: "15px",
            left: "0",
            right: "0",
            width: "fit-content",
            m: "auto",
            backgroundColor: "#f08c00",
            color: "#000000",
          }}
        >
          {" "}
          Learn More
        </Button>
      </div>
    </Paper>
  );
}

export default Job;
