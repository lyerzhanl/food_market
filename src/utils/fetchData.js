export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(endpoint);
    if (response.ok) {
      return await response.json();
    } else {
      console.error('Server responded with an error');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
