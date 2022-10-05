export const fetchData = (access_token, description = "", location = "") => {
  return (dispatch) => {
    return fetch(
      "http://localhost:3000/getJob?description=" +
        description +
        "&location=" +
        location,
      {
        headers: {
          access_token,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error Detected");
        }
        return response.json();
      })
      .then((data) => {
        dispatch({
          type: "jobs/fetchData",
          data,
        });
      })
      .catch((err) => console.log(err));
  };
};
