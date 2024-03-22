import {STRAPI_BASE_URL} from "@env";

interface PasswordDataObject {
  jwt: string
  password: string
  currentPassword: string
  passwordConfirm: string
}

const signUp = async (userData: any) => {
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
    const response = await fetch(`${STRAPI_BASE_URL}/auth/local/register`, options)
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error("In the try and catch",error);
  }
}

async function updateUser(id: number, jwt: string, data_: unknown) {
  // const payload = {
  //   // data: {
  //   //   ...(data_ as any)
  //   // }
  //   ..data_
  // };

  try {
    const response = await fetch(`${STRAPI_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type':'application/json',
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
    const response = await fetch(`${STRAPI_BASE_URL}/auth/local?populate=*`, options)
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error)
  }
}

const resetPassword = async (identifier: string, newPassword: string, code: string) => {
  const payload = {
    code,
    password: newPassword,
    passwordConfirmation: newPassword
  }
  try {
    const options = {
      method: 'POST',
      // headers: {
      //   'content-type':'appplication/json'
      // },
      body: JSON.stringify(payload)
    }
    const update = await
      fetch(`${STRAPI_BASE_URL}/auth/local/reset-password`, options)
        .then((response) => { console.log(response)})
        .catch(error => { });
  } catch (error) {
    
  }
}

const forgotRequest = async (identifier: string,) => {
  const payload = {
    email: identifier
  }
  const options = {
    method: 'POST',
    // headers: {
    //   'content-type': 'application/json'
    // },
    // body: JSON.stringify(payload)
  }
  try {
    const response = await fetch(`${STRAPI_BASE_URL}/auth/local/forgot-password`, options)
    // const data = await response.json()
    .then(response => response.json())
    .catch(error => console.error("Error message",error))
    // if (response) {
    //   console.log(data)
      return response;
    // }
    return;
  } catch (error) {}
}

const changePassword = async (passwordData: PasswordDataObject) => {
  const {currentPassword, password, passwordConfirm, jwt} = passwordData
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

const emailConfirmation = async (email: string) => {
  try {
    const payload = {
      email
    };

    const options = {
      method: 'POST',
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload)
    }

    const response = await fetch(`${STRAPI_BASE_URL}/auth/send-email-confirmation`, options);
    const data = await response.json();

    if (data?.data) {
      return true;
    } else {
      return false;
    }
  } catch (error) {return false}
};

export {signUp, login, resetPassword, forgotRequest, changePassword, emailConfirmation, updateUser}