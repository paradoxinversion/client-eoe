import { Box, Divider, Toolbar, Typography } from "@mui/material";
import { ReactElement } from "react";

interface ScreenLayoutProps {
  children: ReactElement;
  title?: string;
}

const ScreenLayout = ({ children, title }: ScreenLayoutProps) => {
  return (
    <Box component="main">
      <Toolbar />
      {title && (
        <>
          <Box id="home-greeting" component="header" padding="1rem">
            <Typography variant="h3">{title}</Typography>
          </Box>
          <Divider />
        </>
      )}
      {children}
    </Box>
  );
};

export default ScreenLayout;
