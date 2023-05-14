export const sendToken = (
    res,
    organisation,
    member,
    message,
    statusCode = 200
) => {
    let token = null;

    if (organisation) {
        token = organisation.getJwtToken();
    } else {
        token = member.getJwtToken();
    }

    const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 DAYS
        httpOnly: true,
        // secure: true,
        // sameSite: "None",
    };

    if (organisation) {
        res.status(statusCode).cookie("token", token, options).json({
            success: true,
            message,
            organisation,
        });
        return;
    } else {
        res.status(statusCode).cookie("token", token, options).json({
            success: true,
            message,
            member,
        });
        return;
    }
};
