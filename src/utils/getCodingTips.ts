export default async function getTips() {
  const apiUrl = 'https://devhints.io/api/languages/typescript';

  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const tipsData = await response.json();
    // Process the tips data here
    console.log('Typescript Tips:', tipsData);
    return tipsData
    // You can then handle the data accordingly (display, manipulate, etc.)
  } catch (error) {
    console.error('There was a problem fetching the data:', error);
    // Handle errors here
  }
}