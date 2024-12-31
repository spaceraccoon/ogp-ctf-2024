/*======================= ChatGPT Generated =======================*/
export function generateRandomNricFromUnixTime(): [string, number] {
    // Get current Unix timestamp and round down to nearest 10 seconds
    const unixTime = Math.floor(Date.now() / 10000) * 10000;
  
    // Use Unix time to seed the random number generator
    let seed = unixTime;
    const seededRandom = () => {
        seed = (seed * 1664525 + 1013904223) % 4294967296;
        return seed / 4294967296;
    };
  
    // Generate a random birth year between 1920 and 2024
    const birthYear = Math.floor(seededRandom() * (2024 - 1920 + 1)) + 1920;
  
    // Determine the prefix based on the birth year
    const prefix: string = birthYear >= 2000 ? 'T' : 'S';
    
    // Generate the first two digits based on birth year
    const yearDigits: string = birthYear.toString().slice(-2);
    
    // Generate the remaining 5 digits randomly
    const remainingDigits: string = Array(5).fill(0).map(() => Math.floor(seededRandom() * 10)).join('');
    
    // Combine to form the 7-digit unique number
    const uniqueNum: string = yearDigits + remainingDigits;
    
    // Calculate the checksum
    const weights: number[] = [2, 7, 6, 5, 4, 3, 2];
    const products: number[] = uniqueNum.split('').map((digit, index) => parseInt(digit) * weights[index]);
    let total: number = products.reduce((sum, product) => sum + product, 0);
    
    if (prefix === 'T') {
        total += 4;
    }
    
    const remainder: number = total % 11;
    
    // Determine the check letter
    const checkLetters: string[] = ['J', 'Z', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];
    const checkLetter: string = checkLetters[remainder];
    
    // Construct the NRIC
    const nric: string = prefix + uniqueNum + checkLetter;
    
    return [nric, birthYear];
  }


export function maskNric(nric: string): string {
  if (nric.length !== 9) {
      throw new Error("Invalid NRIC: must be 9 characters long");
  }

  const maskedPart = 'X'.repeat(5);
  const unmaskedPart = nric.slice(5);

  return maskedPart + unmaskedPart;
}
