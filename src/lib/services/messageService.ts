import {getStrapiData, storeData} from '../../../api/strapiJSAPI';

export const fetchMessages = async (jwt: string, start = 0, limit = 25) => {
  return getStrapiData(`messages`, jwt);
};

export const sendMessage = async (content: string, userId: number, jwt: string) => {
  return storeData('messages', { content, sender: userId, status: 'sent' }, jwt);
};
