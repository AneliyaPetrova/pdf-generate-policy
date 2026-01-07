// Roboto font with Cyrillic support - base64 encoded
// This is a subset of Roboto Regular that includes Cyrillic characters

export const loadRobotoFont = async (): Promise<string> => {
  // Fetch the font from Google Fonts CDN
  const fontUrl = 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf';
  
  try {
    const response = await fetch(fontUrl);
    const arrayBuffer = await response.arrayBuffer();
    const base64 = btoa(
      new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    return base64;
  } catch (error) {
    console.error('Failed to load font:', error);
    throw error;
  }
};
