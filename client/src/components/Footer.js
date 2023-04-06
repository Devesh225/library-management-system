import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";

export default function Footer() {
    const [value, setValue] = React.useState(0);

    return (
        <Box sx={{ width: 500, ml: 60, mt: 30, p: 2 }}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction
                    label="Instagram"
                    icon={<InstagramIcon />}
                    style={{ background: "#FC7300", fontWeight: "bold" }}
                />
                <BottomNavigationAction
                    label="Facebook"
                    icon={<FacebookIcon />}
                    style={{ background: "#FC7300", fontWeight: "bold" }}
                />
                <BottomNavigationAction
                    label="LinkedIn"
                    icon={<LinkedInIcon />}
                    style={{ background: "#FC7300", fontWeight: "bold" }}
                />
            </BottomNavigation>
        </Box>
    );
}
