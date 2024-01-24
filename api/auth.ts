import { STRAPI_BASE_URL } from "@env";

interface UserData{
  email: string
  phone: string
  password: string
  username: string
  lastName: string
  firstName: string
}

const signUp = async (userData: any) => {
  console.log(userData)
  const payload = {
    username: userData.email,
    email: userData.email,
    password: userData.password,
    // firstName: userData?.firstName,
    // lastName: userData?.lastName,
    // phone:userData?.phonenumber
  }

  const options = {
    method: 'POST',
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload)
  }

  try {
    const response = await
      fetch(`${STRAPI_BASE_URL}auth/local/register`, options)
        .then(response => {
          return response.json();
        })
        .catch(error => console.log("This is the error",error));
    
    return response;
  } catch (error) {
    console.error("In the try and catch",error);
  }
}

const login = async (identifier:string, password:string) => {
  const payload = {
  "identifier": identifier,
  "password":password
}

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(payload)
  }

  try {
    const response = await fetch(`${STRAPI_BASE_URL}auth/local`, options)
      .then(response => response.json())
      .then(response => response)
      .catch(error => console.error("Login error ",error))
    // console.log("This is the response",response)
    return response;
  } catch (error) {
    console.error(error)
  }
};

export {signUp, login}