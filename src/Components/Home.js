import SearchAppBar from "./SearchAppBar";
import CssBaseline from "@mui/material/CssBaseline";
import { Pagination } from "@mui/material";
import { useState } from "react";
import JobsList from "./JobsList";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Outlet } from "react-router-dom";

import { jobData } from "../data/specificData";
function Home() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  // console.log(baseURL);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const handleChange = (event, value) => {
    setPage(value);
  };

  const searchHandler = (q) => {
    setQuery(q);
    setPage(1);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline enableColorScheme />
      <div
        className="App"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SearchAppBar onSearch={searchHandler} />
        <JobsList
          pageNum={page}
          data={jobData.filter((job) =>
            job.title.toLowerCase().includes(query.toLowerCase())
          )}
        />
        <Pagination
          page={page}
          onChange={handleChange}
          count={Math.ceil(
            jobData.filter((job) =>
              job.title.toLowerCase().includes(query.toLowerCase())
            ).length / 6
          )}
          color="primary"
          sx={{
            marginTop: "20px",
          }}
        />
        <Outlet />
      </div>
    </ThemeProvider>
  );
}

export default Home;
