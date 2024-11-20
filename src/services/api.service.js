const env = process.env.REACT_APP_ENV;


let apiUrl;
let imageUrl = process.env.REACT_APP_IMAGE_URL;

if (env == "testing") {
  apiUrl = process.env.REACT_APP_BARNBOOK_API;
  imageUrl = process.env.REACT_APP_IMAGE_URL;
} else if (env === "staging") {
  apiUrl = process.env.REACT_APP_BARNBOOK_API;
  imageUrl = process.env.REACT_APP_IMAGE_URL;
} else if (env == "production") {
  apiUrl = process.env.REACT_APP_BARNBOOK_API;
  imageUrl = process.env.REACT_APP_IMAGE_URL;
}
export const api = apiUrl;

// import { useNavigate } from "react-router-dom";
export const saveRecords = async (payload) => {
  try {
    // Fetch token from localStorage
    const response = await fetch(apiUrl + 'api/masters/saveRecords', {
      method: "POST", // Use POST method
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload), // Stringify the payload
    });
    return response.json();
  } catch (error) {
    console.error("fetahcData Error fetching data:", error);
    throw error; // Re-throw the error for further handling if needed
  }
};

export const getRecords = async (payload) => {
  try {
    // Fetch token from localStorage
    const response = await fetch(apiUrl + 'api/masters/getRecords', {
      method: "POST", // Use POST method
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload), // Stringify the payload
    });
    return response.json();
  } catch (error) {
    console.error("fetahcData Error fetching data:", error);
    throw error; // Re-throw the error for further handling if needed
  }
};

export const dropdownData = async (
  responseData,
  fieldName,
  type,
  master_name
) => {
  try {
    var options = [];
    responseData.forEach((element) => {
      if (type == "user_access") {
        options.push({
          label: element[fieldName],
          value: element.id,
          type: element.type,
        });
      } else if (type == "join") {
        options.push({
          label: element[master_name][fieldName],
          value: element[master_name].id,
        });
      } else {
        options.push({ label: element[fieldName], value: element.id });
      }
    });
    const dropdownResponseData = [
      {
        options: options,
      },
    ];
    return dropdownResponseData;
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle errors appropriately (throw error, display error message, etc.)
    throw error; // Re-throw the error for further handling if needed
  }
};

