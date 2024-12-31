import axios from "axios";

export async function fetchListings(filter) {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/all-places?filter=${filter}`
  );
  return response.data;
}
/******  7ba113a1-c7bb-415f-b926-99f8f08a506b  *******/
