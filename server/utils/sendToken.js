export const sendToken = (
    res,
    organisation,
    user,
    message,
    statusCode = 200
) => {
    let token = null;

    if (organisation) {
        token = organisation.getJwtToken();
    } else {
        token = user.getJwtToken();
    }

    const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 DAYS
        httpOnly: true,
    };

    if (organisation) {
        res.status(statusCode).cookie("token", token, options).json({
            success: true,
            message,
            organisation,
        });
    } else {
        res.status(statusCode).cookie("token", token, options).json({
            success: true,
            message,
            user,
        });
    }
};
