import { Box, TextField } from "@mui/material";

const SearchArea = () => {
  return (
    <Box maxWidth="md" sx={{ margin: "0 auto" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          padding: 2,
          borderRadius: 44,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
        }}
      >
        <TextField
          label="Where"
          variant="standard"
          sx={{
            width: "30%",
            bgcolor: "transparent",
            input: { color: "rgba(0, 0, 0, 0.87)" },
          }}
        />
        <TextField
          label="Date"
          variant="standard"
          type="date"
          InputLabelProps={{ shrink: true }}
          sx={{
            width: "30%",
            bgcolor: "transparent",
            input: { color: "rgba(0, 0, 0, 0.87)" },
          }}
        />
        <TextField
          label="Service"
          variant="standard"
          sx={{
            width: "30%",
            bgcolor: "transparent",
            input: { color: "rgba(0, 0, 0, 0.87)" },
          }}
        />
      </Box>
    </Box>
  );
};

export default SearchArea;
