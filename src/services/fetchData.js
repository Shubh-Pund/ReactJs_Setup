const env = process.env.REACT_APP_ENV;


let apiUrl;
let imageUrl = process.env.REACT_APP_IMAGE_URL;

var baseUrlSocial = ""
var baseUrlUser = ""
var baseUrlCms = ""
var baseUrlAcademics = ""
var baseUrlChatfolder = ""

if (env == "testing") {
  apiUrl = process.env.REACT_APP_BARNBOOK_API;
  imageUrl = process.env.REACT_APP_IMAGE_URL;
  baseUrlSocial = apiUrl
  baseUrlUser = apiUrl
  baseUrlCms = apiUrl
  baseUrlAcademics = apiUrl
  baseUrlChatfolder = apiUrl
} else if (env === "staging") {
  console.log('staging');

  apiUrl = process.env.REACT_APP_GROWTH_API_STAGING;
  imageUrl = process.env.REACT_APP_IMAGE_URL;

  baseUrlSocial = apiUrl
  baseUrlUser = apiUrl
  baseUrlCms = apiUrl
  baseUrlAcademics = apiUrl
  baseUrlChatfolder = apiUrl
} else if (env == "production") {
  console.log('production');

  baseUrlSocial = process.env.REACT_APP_PROD_SOCIAL;
  baseUrlUser = process.env.REACT_APP_PROD_USER
  baseUrlCms = process.env.REACT_APP_PROD_CMS
  baseUrlAcademics = process.env.REACT_APP_PROD_ACADEMIC
  baseUrlChatfolder = process.env.REACT_APP_PROD_CHAT
}

export const api = apiUrl;
export const image_url = imageUrl;
export const academics = "academics/"
export const user = "user/"
export const chatfolder = "chatfolder/";
export const social = "social/";

export const academicexporturl = baseUrlAcademics + academics;

// import { useNavigate } from "react-router-dom";
export const fetchData = async (url, payload, service) => {
  try {
    // Fetch token from localStorage
    let access_token = JSON.parse(localStorage.getItem("logedin-user"))
      ? JSON.parse(localStorage.getItem("logedin-user"))[0].access_token
      : null;
    let azurADToken = access_token && access_token.azurADToken ? access_token.azurADToken : "";
    let api_url;
    
    if (service === academics) {
      api_url = baseUrlAcademics + service;
    } else if (service === user) {
      api_url = baseUrlUser + service;
    } else if (service === chatfolder) {
      api_url = baseUrlChatfolder + service;
    } else if (service === social) {
      api_url = baseUrlSocial + service;
    } else {
      api_url = baseUrlCms;
    }
    // Helper function to make API request
    const makeApiRequest = async (azurADToken) => {
      // console.log('makeApiRequest azurADToken');

      const response = await fetch(api_url + url, {
        method: "POST", // Use POST method
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${azurADToken}`,
        }, // Set content type
        body: JSON.stringify(payload), // Stringify the payload
      });
      return response.json();
    };
    let responseData = await makeApiRequest(azurADToken);

    // If token is invalid, generate a new token using refresh token
    if (responseData && responseData.message === "Token Not Valide!") {
      console.log("fetahcData Invalid token, trying to refresh token...");

      // Refresh token and get the new token
      // const newToken = await refreshAuthToken();
      // console.log("fetahcData here newToken", newToken);

      // if (newToken) {
      //   // Retry the original API call with the new token
      //   responseData = await makeApiRequest(newToken);
      // } else {
      //   return null; // If refresh failed, exit the function
      // }
    }

    return responseData;
  } catch (error) {
    console.error("fetahcData Error fetching data:", error);
    throw error; // Re-throw the error for further handling if needed
  }
};


// Function to handle refresh token logic
// export const refreshAuthToken = async () => {
//   try {
//     console.log("fetahcData refreshAuthToken here 1");

//     const refreshTokenResponse = await fetch(process.env.REACT_APP_REFRESH_TOKEN_URL,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//     const refreshTokenData = await refreshTokenResponse.json();
//     console.log("fetahcData refreshAuthToken here 2", refreshTokenData.code);

//     // If refresh token request is successful
//     if (refreshTokenData && refreshTokenData.code == 1) {
//       const newToken = refreshTokenData.data;
//       // Update the new token in localStorage
//       const logedinUser = await JSON.parse(localStorage.getItem("logedin-user")) || [];
//       logedinUser[0].access_token.azurADToken = newToken;
//       localStorage.setItem("logedin-user", JSON.stringify(logedinUser));

//       console.log("fetahcData Token successfully refreshed");
//       return newToken;
//     } else {
//       console.log("fetahcData Failed to refresh token, logging out...");
//       // Clear localStorage and redirect to login if refresh fails
//       if (localStorage.getItem("logedin-user")) {
//         localStorage.removeItem("logedin-user");
//         localStorage.removeItem("tenantId");
//       }
//       // window.location.href = "/";
//       return null;
//     }
//   } catch (error) {
//     console.error("fetahcData Error refreshing token:", error);
//     throw error;
//   }
// };


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

export const fileImport = async (url, formData, service) => {
  let access_token = JSON.parse(localStorage.getItem("logedin-user")) ? JSON.parse(localStorage.getItem("logedin-user"))[0].access_token : null;
  let azurADToken = access_token && access_token.azurADToken ? access_token.azurADToken : "";

  let api_url;
  if (service == academics) {
    api_url = baseUrlAcademics + service;
  } else if (service == user) {
    api_url = baseUrlUser + service;
  } else if (service == chatfolder) {
    api_url = baseUrlChatfolder + service;
  } else if (service == social) {
    api_url = baseUrlSocial + service;
  } else {
    api_url = baseUrlCms + "cms/";
  }
  const makeApiRequestForFileImport = async (azurADToken) => {
    const response = await fetch(api_url + url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${azurADToken}`,
      },
      body: formData,
    });
    return response.json();
  };

  let responseData = await makeApiRequestForFileImport(azurADToken);
  if (responseData && responseData.message === "Token Not Valide!") {
    console.log("Invalid token, trying to refresh token...");

    // Refresh token and get the new one
    // const newToken = await refreshAuthToken();

    // if (newToken) {
    //   // Retry the file import with the new token
    //   responseData = await makeApiRequestForFileImport(newToken);
    // } else {
    //   return null; // Exit if token refresh failed
    // }
  }

  return responseData.code;
};


export const downloadBlobData = async (service, lastSegment) => {
  const downloadurl = "downloadMediaUrl/" + lastSegment;
  let api_url;

  // Set the appropriate base URL based on the service
  if (service == academics) {
    api_url = baseUrlAcademics + service;
  } else if (service == user) {
    api_url = baseUrlUser + service;
  } else if (service == chatfolder) {
    api_url = baseUrlChatfolder + service;
  } else if (service == social) {
    api_url = baseUrlSocial + service;
  } else {
    api_url = baseUrlCms + "cms/";
  }

  // Fetch the blob data and download the file
  const response = await fetch(api_url + downloadurl);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const blob = await response.blob();
  const downloadUrl = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = downloadUrl;
  a.download = lastSegment; // Optional file name
  document.body.appendChild(a);
  a.click();
  a.remove();
};
