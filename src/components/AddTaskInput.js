import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function BasicTextFields() {
  return (
    <Box
      component="form"
      sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
    >
      <button>إضافة</button>
      <TextField id="outlined-basic" label="عنوان المهمة" variant="outlined" />
    </Box>
  );
}
