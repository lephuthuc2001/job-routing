import React, { useEffect } from "react";
import { Dialog, ListSubheader } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useLocation } from "react-router-dom";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PaidIcon from "@mui/icons-material/Paid";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import { useNavigate } from "react-router-dom";

function JobDetail() {
  const { state } = useLocation();
  const data = state.data;
  const navigate = useNavigate();

  useEffect(() => {
    document.body.addEventListener("click", (event) => {
      if (event.path[0].tagName !== "BUTTON") navigate("/", { replace: true });
    });

    return () =>
      document.body.removeEventListener("click", (event) => {
        if (event.path[0].tagName !== "BUTTON")
          navigate("/", { replace: true });
      });
  }, []);

  return (
    <Dialog open={true}>
      <List
        sx={{ width: "300px" }}
        subheader={
          <ListSubheader
            sx={{ textAlign: "center", fontSize: "1.2rem", color: "white" }}
          >
            Details
          </ListSubheader>
        }
      >
        <ListItem>
          <ListItemIcon>
            <LocationCityIcon />
          </ListItemIcon>
          <ListItemText primary={data.city} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PaidIcon />
          </ListItemIcon>
          <ListItemText
            primary={`${data.salaryLow / 1000}K- ${data.salaryHigh / 1000}K`}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <WorkHistoryIcon />
          </ListItemIcon>
          <ListItemText primary={`over ${data.yrsXPExpected} years`} />
        </ListItem>
      </List>
    </Dialog>
  );
}

export default JobDetail;
