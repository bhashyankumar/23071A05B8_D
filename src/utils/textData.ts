
export interface TextItem {
  id: number;
  text: string;
  level: 'easy' | 'medium' | 'hard';
}

const typingTexts: TextItem[] = [
  {
    id: 1,
    text: "The quick brown fox jumps over the lazy dog. This simple sentence contains every letter of the English alphabet at least once.",
    level: 'easy'
  },
  {
    id: 2,
    text: "Learning to type quickly and accurately is an essential skill in today's digital world. Regular practice can significantly improve your typing speed and efficiency.",
    level: 'easy'
  },
  {
    id: 3,
    text: "Typing practice helps develop muscle memory in your fingers. The more you type, the less you need to look at the keyboard, allowing you to focus on the screen.",
    level: 'easy'
  },
  {
    id: 4,
    text: "Python is a high-level programming language designed to be easy to read and simple to implement. It is widely used for web development, data analysis, artificial intelligence, and scientific computing.",
    level: 'medium'
  },
  {
    id: 5,
    text: "The invention of the QWERTY keyboard layout was actually designed to slow typists down. Early typewriters would jam if adjacent keys were pressed too quickly, so the layout was created to separate commonly used letter combinations.",
    level: 'medium'
  },
  {
    id: 6,
    text: "JavaScript is a versatile programming language primarily used for creating interactive effects within web browsers. It's an essential technology of the World Wide Web, alongside HTML and CSS.",
    level: 'medium'
  },
  {
    id: 7,
    text: "Neuroplasticity refers to the brain's ability to reorganize itself by forming new neural connections throughout life. This phenomenon allows the neurons in the brain to compensate for injury and disease and to adjust their activities in response to new situations or changes in their environment.",
    level: 'hard'
  },
  {
    id: 8,
    text: "Quantum computing is a type of computation that harnesses the collective properties of quantum states, such as superposition, interference, and entanglement, to perform calculations. The devices that perform quantum computations are known as quantum computers.",
    level: 'hard'
  },
  {
    id: 9,
    text: "Photosynthesis is the process used by plants, algae and certain bacteria to harness energy from sunlight and turn it into chemical energy. This process converts carbon dioxide and water into oxygen and energy-rich organic compounds.",
    level: 'hard'
  }
];

export const getRandomText = (level: 'easy' | 'medium' | 'hard'): TextItem => {
  const filteredTexts = typingTexts.filter(text => text.level === level);
  const randomIndex = Math.floor(Math.random() * filteredTexts.length);
  return filteredTexts[randomIndex];
};

export const getAllTexts = (): TextItem[] => {
  return typingTexts;
};
