const tryUploadDP = async file => {
    try {
        const formData = new FormData();

        formData.append("avatar", file);
        let response = await fetch(
            "https://DWFilmes-api.herokuapp.com/user/me/avatar",
            {
                method: "post",
                body: formData
            }
        );

        if (response.status === 200) {
            return true;
        }

        if (response.status !== 200) {
            return false;
        }
    } catch (error) {
        return false;
    }
};

export default tryUploadDP;
