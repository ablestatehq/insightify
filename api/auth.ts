import {BASE_URL} from "@env";
import {environments} from "../src/constants/environments";

const {STRAPI_BASE_URL} = environments;

const signUp = async (userData: any) => {
  const payload = {
    username: userData.email,
    email: userData.email,
    password: userData.password,
  }

  const options = {
    method: 'POST',
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload)
  }

  try {
    const response = await fetch(`${STRAPI_BASE_URL}/auth/local/register`, options)
    const data = await response.json();
    
    return data;
  } catch (error) {}
}

async function updateUser(id: number, jwt: string, data_: unknown) {
  try {
    const response = await fetch(`${STRAPI_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      },
      body: JSON.stringify(data_)
    });

    const data = await response.json();
    
    if (response.ok && data) {
      return {
        error: null,
        success: true, 
        data
      }
    } else {
      return {
        error: data,
        success: false,
        data: null
      }
    }
  } catch (error) {
    return {
      error: error,
      success: false
    }
  }
}

async function setUserPhotoNULL(userId: number, jwt: string) {
  try {
    const options =  {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      },
    body: JSON.stringify({photo: null})
  }
  const response = fetch(`${STRAPI_BASE_URL}/users/${userId}`, options)
    .then(response => response.json())
    .then(storedData => storedData)
    .catch(error => {});
  } catch (error) {}
}

const login = async (identifier:string, password:string) => {
  const payload = {
    "identifier": identifier,
    "password": password
  };

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(payload)
  };

  try {
    const response = await fetch(`${STRAPI_BASE_URL}/auth/local?populate=*`, options)
    const data = await response.json();
    if (data?.jwt) {
      const url = `${STRAPI_BASE_URL}/users/me?populate=*`;
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${data.jwt}`
        }
      }
      const response = await fetch(url, options);
      const userData = await response.json();
      return {
        jwt: data.jwt,
        user: userData
      }
    }
    return {
      jwt: null,
      user: null,
    };
  } catch (error) {}
}

const resetPassword = async (newPassword: string, code: string) => {
  const payload = {
    code,
    password: newPassword,
    passwordConfirmation: newPassword
  }
  try {
    const options = {
      method: 'POST',
      headers: {
        'content-type':'application/json'
      },
      body: JSON.stringify(payload)
    }
    const update = await
      fetch(`${BASE_URL}/api/auth/reset-password`, options);
    return update.json();
  } catch (error) {
    
  }
}

const forgotRequest = async (identifier: string,) => {
  const payload = {
    email: identifier
  }

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(payload)
  }

  try {
    const response = await fetch(`${BASE_URL}/api/auth/forgot-password`, options)
    const data = await response.json();
    return data;
  } catch (error) {}
}

const changePassword = async (currentPassword: string, password: string, passwordConfirm: string, jwt: string) => {
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${jwt}`
    },
    body: JSON.stringify({currentPassword, password, passwordConfirm})
  }

  try {
    const response = await fetch(`${STRAPI_BASE_URL}/auth/change-password`, options);
    const data = await response.json();
    return data;
  } catch (error) {}
}

const emailConfirmation = async (confirmation:string) => {
  try {
    const options = {
      method: 'GET',
    }

    const response = await fetch(`${STRAPI_BASE_URL}/auth/email-confirmation?confirmation=${confirmation}`, options)
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('text/html')) {
      return true;
    }
    return false
  } catch (error) {
    return false
  }
};

export {signUp, login, resetPassword, forgotRequest, changePassword, emailConfirmation, updateUser, setUserPhotoNULL}