import { CircularProgress, Box, Typography } from "@mui/material";

function CircularProgressWithLabel({ size, total, completed }) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress size={size} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          fontSize="1rem"
          variant="caption"
          component="div"
          color="text.secondary"
        >
          {`${completed}/${total}`}
        </Typography>
      </Box>
    </Box>
  );
}

export default function LoaderWithLabel({ size, total, completed }) {
  return (
    <CircularProgressWithLabel
      size={size}
      total={total}
      completed={completed}
    />
  );
}
