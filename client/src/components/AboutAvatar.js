import { Avatar, Typography } from "@mui/material";
import React from "react";

const AboutAvatar = ({ avatar, name }) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Avatar
                sx={{ height: 150, width: 150 }}
                alt="Avatar"
                src={avatar}
            />
            <Typography
                variant="h6"
                sx={{
                    color: "#FC7300",
                    fontFamily: "Montserrat",
                    fontWeight: 700,
                    mt: "2%",
                }}
            >
                {name}
            </Typography>
        </div>
    );
};

export default AboutAvatar;
