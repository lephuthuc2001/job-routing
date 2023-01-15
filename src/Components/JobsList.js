import React from "react";
import { Box } from "@mui/system";
import Job from "./Job";
import Data from "../Data";
export const jobsListLength = Data.length;

function JobsList({ pageNum, data }) {
  const fromJob = (pageNum - 1) * 6;
  const toJob = fromJob + 6;

  return (
    <>
      <Box
        sx={{
          width: "1080px",
          maxWidth: "95%",
          height: "auto",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        {data.slice(fromJob, toJob).map((job) => (
          <Job
            // title={job.title}
            // description={job.description}
            // skills={job.skills.length > 3 ? job.skills.slice(0, 3) : job.skills}
            key={Math.random().toString(36).substring(6)}
            data={job}
          />
        ))}
      </Box>
    </>
  );
}

export default JobsList;
