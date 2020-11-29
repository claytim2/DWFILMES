const tryGettingUser = async () => {
    const auth = `Bearer ${localStorage.getItem("authToken")}`;

    try {
        const response = await fetch(
            "https://DWFilmes-api.herokuapp.com/user/me",
            {
                method: "get",
                headers: {
                    "Content-type": "application/json",
                    Authorization: auth
                }
            }
        );

        let data = await response.json();

        if (response.status === 200) {
            return [true, data];
        }

        if (response.status !== 200) {
            const data = {name: ""};
            return [false, data];
        }
    } catch (error) {
        return [false];
    }
};

export default tryGettingUser;
