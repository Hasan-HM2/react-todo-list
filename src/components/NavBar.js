import { Link } from "react-router-dom";
import "../App.css";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function NavBar() {
  return (
    <>
      <div className="div-title">
        <h1>مهامي</h1>
        <hr />
      </div>
      <div className="flex">
        <Stack
          className="nav"
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={1}
        >
          <Link className="link">
            <Item sx={{ fontSize: "18px" }}>غير منجز</Item>
          </Link>

          <Link className="link">
            <Item sx={{ fontSize: "18px" }}>منجز</Item>
          </Link>

          <Link className="link">
            <Item sx={{ fontSize: "18px" }}>الكل</Item>
          </Link>
        </Stack>
      </div>
    </>
  );
}
