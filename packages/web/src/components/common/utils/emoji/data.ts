const emojis = [
  {
    label: "笑脸",
    emojis: [
      {
        "codes": "1F600",
        "char": "😀",
        "name": "grinning face",
        "category": "Smileys & Emotion (face-smiling)",
        "group": "Smileys & Emotion",
        "subgroup": "face-smiling"
      },
      {
        "codes": "1F603",
        "char": "😃",
        "name": "grinning face with big eyes",
        "category": "Smileys & Emotion (face-smiling)",
        "group": "Smileys & Emotion",
        "subgroup": "face-smiling"
      },
      {
        "codes": "1F604",
        "char": "😄",
        "name": "grinning face with smiling eyes",
        "category": "Smileys & Emotion (face-smiling)",
        "group": "Smileys & Emotion",
        "subgroup": "face-smiling"
      },
      {
        "codes": "1F601",
        "char": "😁",
        "name": "beaming face with smiling eyes",
        "category": "Smileys & Emotion (face-smiling)",
        "group": "Smileys & Emotion",
        "subgroup": "face-smiling"
      },
      {
        "codes": "1F606",
        "char": "😆",
        "name": "grinning squinting face",
        "category": "Smileys & Emotion (face-smiling)",
        "group": "Smileys & Emotion",
        "subgroup": "face-smiling"
      },
      {
        "codes": "1F605",
        "char": "😅",
        "name": "grinning face with sweat",
        "category": "Smileys & Emotion (face-smiling)",
        "group": "Smileys & Emotion",
        "subgroup": "face-smiling"
      },
      {
        "codes": "1F923",
        "char": "🤣",
        "name": "rolling on the floor laughing",
        "category": "Smileys & Emotion (face-smiling)",
        "group": "Smileys & Emotion",
        "subgroup": "face-smiling"
      },
      {
        "codes": "1F602",
        "char": "😂",
        "name": "face with tears of joy",
        "category": "Smileys & Emotion (face-smiling)",
        "group": "Smileys & Emotion",
        "subgroup": "face-smiling"
      },
      {
        "codes": "1F642",
        "char": "🙂",
        "name": "slightly smiling face",
        "category": "Smileys & Emotion (face-smiling)",
        "group": "Smileys & Emotion",
        "subgroup": "face-smiling"
      },
      {
        "codes": "1F643",
        "char": "🙃",
        "name": "upside-down face",
        "category": "Smileys & Emotion (face-smiling)",
        "group": "Smileys & Emotion",
        "subgroup": "face-smiling"
      },
      {
        "codes": "1F609",
        "char": "😉",
        "name": "winking face",
        "category": "Smileys & Emotion (face-smiling)",
        "group": "Smileys & Emotion",
        "subgroup": "face-smiling"
      },
      {
        "codes": "1F60A",
        "char": "😊",
        "name": "smiling face with smiling eyes",
        "category": "Smileys & Emotion (face-smiling)",
        "group": "Smileys & Emotion",
        "subgroup": "face-smiling"
      },
      {
        "codes": "1F607",
        "char": "😇",
        "name": "smiling face with halo",
        "category": "Smileys & Emotion (face-smiling)",
        "group": "Smileys & Emotion",
        "subgroup": "face-smiling"
      },
      {
        "codes": "1F970",
        "char": "🥰",
        "name": "smiling face with hearts",
        "category": "Smileys & Emotion (face-affection)",
        "group": "Smileys & Emotion",
        "subgroup": "face-affection"
      },
      {
        "codes": "1F60D",
        "char": "😍",
        "name": "smiling face with heart-eyes",
        "category": "Smileys & Emotion (face-affection)",
        "group": "Smileys & Emotion",
        "subgroup": "face-affection"
      },
      {
        "codes": "1F929",
        "char": "🤩",
        "name": "star-struck",
        "category": "Smileys & Emotion (face-affection)",
        "group": "Smileys & Emotion",
        "subgroup": "face-affection"
      },
      {
        "codes": "1F618",
        "char": "😘",
        "name": "face blowing a kiss",
        "category": "Smileys & Emotion (face-affection)",
        "group": "Smileys & Emotion",
        "subgroup": "face-affection"
      },
      {
        "codes": "1F619",
        "char": "😙",
        "name": "kissing face with smiling eyes",
        "category": "Smileys & Emotion (face-affection)",
        "group": "Smileys & Emotion",
        "subgroup": "face-affection"
      },
      {
        "codes": "1F60B",
        "char": "😋",
        "name": "face savoring food",
        "category": "Smileys & Emotion (face-tongue)",
        "group": "Smileys & Emotion",
        "subgroup": "face-tongue"
      },
      {
        "codes": "1F61D",
        "char": "😝",
        "name": "squinting face with tongue",
        "category": "Smileys & Emotion (face-tongue)",
        "group": "Smileys & Emotion",
        "subgroup": "face-tongue"
      },
      {
        "codes": "1F911",
        "char": "🤑",
        "name": "money-mouth face",
        "category": "Smileys & Emotion (face-tongue)",
        "group": "Smileys & Emotion",
        "subgroup": "face-tongue"
      },
      {
        "codes": "1F917",
        "char": "🤗",
        "name": "hugging face",
        "category": "Smileys & Emotion (face-hand)",
        "group": "Smileys & Emotion",
        "subgroup": "face-hand"
      },
      {
        "codes": "1F92D",
        "char": "🤭",
        "name": "face with hand over mouth",
        "category": "Smileys & Emotion (face-hand)",
        "group": "Smileys & Emotion",
        "subgroup": "face-hand"
      },
      {
        "codes": "1F92B",
        "char": "🤫",
        "name": "shushing face",
        "category": "Smileys & Emotion (face-hand)",
        "group": "Smileys & Emotion",
        "subgroup": "face-hand"
      },
      {
        "codes": "1F914",
        "char": "🤔",
        "name": "thinking face",
        "category": "Smileys & Emotion (face-hand)",
        "group": "Smileys & Emotion",
        "subgroup": "face-hand"
      },
      {
        "codes": "1F928",
        "char": "🤨",
        "name": "face with raised eyebrow",
        "category": "Smileys & Emotion (face-neutral-skeptical)",
        "group": "Smileys & Emotion",
        "subgroup": "face-neutral-skeptical"
      },
      {
        "codes": "1F610",
        "char": "😐",
        "name": "neutral face",
        "category": "Smileys & Emotion (face-neutral-skeptical)",
        "group": "Smileys & Emotion",
        "subgroup": "face-neutral-skeptical"
      },
      {
        "codes": "1F60E",
        "char": "😎",
        "name": "smiling face with sunglasses",
        "category": "Smileys & Emotion (face-glasses)",
        "group": "Smileys & Emotion",
        "subgroup": "face-glasses"
      },
      {
        "codes": "1F611",
        "char": "😑",
        "name": "expressionless face",
        "category": "Smileys & Emotion (face-neutral-skeptical)",
        "group": "Smileys & Emotion",
        "subgroup": "face-neutral-skeptical"
      },
      {
        "codes": "1F612",
        "char": "😒",
        "name": "unamused face",
        "category": "Smileys & Emotion (face-neutral-skeptical)",
        "group": "Smileys & Emotion",
        "subgroup": "face-neutral-skeptical"
      },
      {
        "codes": "1F635",
        "char": "😵",
        "name": "knocked-out face",
        "category": "Smileys & Emotion (face-unwell)",
        "group": "Smileys & Emotion",
        "subgroup": "face-unwell"
      },
      {
        "codes": "1F644",
        "char": "🙄",
        "name": "face with rolling eyes",
        "category": "Smileys & Emotion (face-neutral-skeptical)",
        "group": "Smileys & Emotion",
        "subgroup": "face-neutral-skeptical"
      },
      {
        "codes": "1F62C",
        "char": "😬",
        "name": "grimacing face",
        "category": "Smileys & Emotion (face-neutral-skeptical)",
        "group": "Smileys & Emotion",
        "subgroup": "face-neutral-skeptical"
      },
      {
        "codes": "1F614",
        "char": "😔",
        "name": "pensive face",
        "category": "Smileys & Emotion (face-sleepy)",
        "group": "Smileys & Emotion",
        "subgroup": "face-sleepy"
      },
      {
        "codes": "1F62A",
        "char": "😪",
        "name": "sleepy face",
        "category": "Smileys & Emotion (face-sleepy)",
        "group": "Smileys & Emotion",
        "subgroup": "face-sleepy"
      },
      {
        "codes": "1F924",
        "char": "🤤",
        "name": "drooling face",
        "category": "Smileys & Emotion (face-sleepy)",
        "group": "Smileys & Emotion",
        "subgroup": "face-sleepy"
      },
      {
        "codes": "1F634",
        "char": "😴",
        "name": "sleeping face",
        "category": "Smileys & Emotion (face-sleepy)",
        "group": "Smileys & Emotion",
        "subgroup": "face-sleepy"
      },
      {
        "codes": "1F637",
        "char": "😷",
        "name": "face with medical mask",
        "category": "Smileys & Emotion (face-unwell)",
        "group": "Smileys & Emotion",
        "subgroup": "face-unwell"
      },
      {
        "codes": "1F92E",
        "char": "🤮",
        "name": "face vomiting",
        "category": "Smileys & Emotion (face-unwell)",
        "group": "Smileys & Emotion",
        "subgroup": "face-unwell"
      },
      {
        "codes": "1F920",
        "char": "🤠",
        "name": "cowboy hat face",
        "category": "Smileys & Emotion (face-hat)",
        "group": "Smileys & Emotion",
        "subgroup": "face-hat"
      },
      {
        "codes": "1F973",
        "char": "🥳",
        "name": "partying face",
        "category": "Smileys & Emotion (face-hat)",
        "group": "Smileys & Emotion",
        "subgroup": "face-hat"
      },
      {
        "codes": "1F641",
        "char": "🙁",
        "name": "slightly frowning face",
        "category": "Smileys & Emotion (face-concerned)",
        "group": "Smileys & Emotion",
        "subgroup": "face-concerned"
      },
      {
        "codes": "1F62E",
        "char": "😮",
        "name": "face with open mouth",
        "category": "Smileys & Emotion (face-concerned)",
        "group": "Smileys & Emotion",
        "subgroup": "face-concerned"
      },
    ]
  },
  {
    label:"情感",
    emojis: [
      {
        "codes": "2764",
        "char": "❤️",
        "name": "red heart",
        "category": "Smileys & Emotion (emotion)",
        "group": "Smileys & Emotion",
        "subgroup": "emotion"
      },
      {
        "codes": "1F494",
        "char": "💔",
        "name": "broken heart",
        "category": "Smileys & Emotion (emotion)",
        "group": "Smileys & Emotion",
        "subgroup": "emotion"
      },
      {
        "codes": "1F48B",
        "char": "💋",
        "name": "kiss mark",
        "category": "Smileys & Emotion (emotion)",
        "group": "Smileys & Emotion",
        "subgroup": "emotion"
      },
      {
        "codes": "1F48C",
        "char": "💌",
        "name": "love letter",
        "category": "Smileys & Emotion (emotion)",
        "group": "Smileys & Emotion",
        "subgroup": "emotion"
      },
      {
        "codes": "1F498",
        "char": "💘",
        "name": "heart with arrow",
        "category": "Smileys & Emotion (emotion)",
        "group": "Smileys & Emotion",
        "subgroup": "emotion"
      },
      {
        "codes": "1F49D",
        "char": "💝",
        "name": "heart with ribbon",
        "category": "Smileys & Emotion (emotion)",
        "group": "Smileys & Emotion",
        "subgroup": "emotion"
      },
      {
        "codes": "1F496",
        "char": "💖",
        "name": "sparkling heart",
        "category": "Smileys & Emotion (emotion)",
        "group": "Smileys & Emotion",
        "subgroup": "emotion"
      },
      {
        "codes": "1F497",
        "char": "💗",
        "name": "growing heart",
        "category": "Smileys & Emotion (emotion)",
        "group": "Smileys & Emotion",
        "subgroup": "emotion"
      },
      {
        "codes": "1F493",
        "char": "💓",
        "name": "beating heart",
        "category": "Smileys & Emotion (emotion)",
        "group": "Smileys & Emotion",
        "subgroup": "emotion"
      },
      {
        "codes": "1F49E",
        "char": "💞",
        "name": "revolving hearts",
        "category": "Smileys & Emotion (emotion)",
        "group": "Smileys & Emotion",
        "subgroup": "emotion"
      },
      {
        "codes": "1F495",
        "char": "💕",
        "name": "two hearts",
        "category": "Smileys & Emotion (emotion)",
        "group": "Smileys & Emotion",
        "subgroup": "emotion"
      },
      {
        "codes": "1F48D",
        "char": "💍",
        "name": "ring",
        "category": "Objects (clothing)",
        "group": "Objects",
        "subgroup": "clothing"
      },
      {
        "codes": "1F48E",
        "char": "💎",
        "name": "gem stone",
        "category": "Objects (clothing)",
        "group": "Objects",
        "subgroup": "clothing"
      },
      {
        "codes": "1F31D",
        "char": "🌝",
        "name": "full moon face",
        "category": "Travel & Places (sky & weather)",
        "group": "Travel & Places",
        "subgroup": "sky & weather"
      },
      {
        "codes": "1F31E",
        "char": "🌞",
        "name": "sun with face",
        "category": "Travel & Places (sky & weather)",
        "group": "Travel & Places",
        "subgroup": "sky & weather"
      },
      {
        "codes": "1F319",
        "char": "🌙",
        "name": "crescent moon",
        "category": "Travel & Places (sky & weather)",
        "group": "Travel & Places",
        "subgroup": "sky & weather"
      },
      {
        "codes": "1F315",
        "char": "🌕",
        "name": "full moon",
        "category": "Travel & Places (sky & weather)",
        "group": "Travel & Places",
        "subgroup": "sky & weather"
      },
    ]
  },
  {
    label: "动物",
    emojis: [
      {
        "codes": "1F43C",
        "char": "🐼",
        "name": "panda",
        "category": "Animals & Nature (animal-mammal)",
        "group": "Animals & Nature",
        "subgroup": "animal-mammal"
      },
      {
        "codes": "1F436",
        "char": "🐶",
        "name": "dog face",
        "category": "Animals & Nature (animal-mammal)",
        "group": "Animals & Nature",
        "subgroup": "animal-mammal"
      },
      {
        "codes": "1F415",
        "char": "🐕",
        "name": "dog",
        "category": "Animals & Nature (animal-mammal)",
        "group": "Animals & Nature",
        "subgroup": "animal-mammal"
      },
      {
        "codes": "1F43A",
        "char": "🐺",
        "name": "wolf",
        "category": "Animals & Nature (animal-mammal)",
        "group": "Animals & Nature",
        "subgroup": "animal-mammal"
      },
      {
        "codes": "1F98A",
        "char": "🦊",
        "name": "fox",
        "category": "Animals & Nature (animal-mammal)",
        "group": "Animals & Nature",
        "subgroup": "animal-mammal"
      },
      {
        "codes": "1F99D",
        "char": "🦝",
        "name": "raccoon",
        "category": "Animals & Nature (animal-mammal)",
        "group": "Animals & Nature",
        "subgroup": "animal-mammal"
      },
      {
        "codes": "1F431",
        "char": "🐱",
        "name": "cat face",
        "category": "Animals & Nature (animal-mammal)",
        "group": "Animals & Nature",
        "subgroup": "animal-mammal"
      },
      {
        "codes": "1F408",
        "char": "🐈",
        "name": "cat",
        "category": "Animals & Nature (animal-mammal)",
        "group": "Animals & Nature",
        "subgroup": "animal-mammal"
      },
      {
        "codes": "1F981",
        "char": "🦁",
        "name": "lion",
        "category": "Animals & Nature (animal-mammal)",
        "group": "Animals & Nature",
        "subgroup": "animal-mammal"
      },
      {
        "codes": "1F42F",
        "char": "🐯",
        "name": "tiger face",
        "category": "Animals & Nature (animal-mammal)",
        "group": "Animals & Nature",
        "subgroup": "animal-mammal"
      },
      {
        "codes": "1F40E",
        "char": "🐎",
        "name": "horse",
        "category": "Animals & Nature (animal-mammal)",
        "group": "Animals & Nature",
        "subgroup": "animal-mammal"
      },
      {
        "codes": "1F984",
        "char": "🦄",
        "name": "unicorn",
        "category": "Animals & Nature (animal-mammal)",
        "group": "Animals & Nature",
        "subgroup": "animal-mammal"
      },
      {
        "codes": "1F993",
        "char": "🦓",
        "name": "zebra",
        "category": "Animals & Nature (animal-mammal)",
        "group": "Animals & Nature",
        "subgroup": "animal-mammal"
      },
      {
        "codes": "1F98C",
        "char": "🦌",
        "name": "deer",
        "category": "Animals & Nature (animal-mammal)",
        "group": "Animals & Nature",
        "subgroup": "animal-mammal"
      },
      {
        "codes": "1F402",
        "char": "🐂",
        "name": "ox",
        "category": "Animals & Nature (animal-mammal)",
        "group": "Animals & Nature",
        "subgroup": "animal-mammal"
      },
      {
        "codes": "1F404",
        "char": "🐄",
        "name": "cow",
        "category": "Animals & Nature (animal-mammal)",
        "group": "Animals & Nature",
        "subgroup": "animal-mammal"
      },
      {
        "codes": "1F437",
        "char": "🐷",
        "name": "pig face",
        "category": "Animals & Nature (animal-mammal)",
        "group": "Animals & Nature",
        "subgroup": "animal-mammal"
      },
      {
        "codes": "1F416",
        "char": "🐖",
        "name": "pig",
        "category": "Animals & Nature (animal-mammal)",
        "group": "Animals & Nature",
        "subgroup": "animal-mammal"
      },
      {
        "codes": "1F986",
        "char": "🦆",
        "name": "duck",
        "category": "Animals & Nature (animal-bird)",
        "group": "Animals & Nature",
        "subgroup": "animal-bird"
      },
      {
        "codes": "1F9A2",
        "char": "🦢",
        "name": "swan",
        "category": "Animals & Nature (animal-bird)",
        "group": "Animals & Nature",
        "subgroup": "animal-bird"
      },
      {
        "codes": "1F40F",
        "char": "🐏",
        "name": "ram",
        "category": "Animals & Nature (animal-mammal)",
        "group": "Animals & Nature",
        "subgroup": "animal-mammal"
      },
      {
        "codes": "1F411",
        "char": "🐑",
        "name": "ewe",
        "category": "Animals & Nature (animal-mammal)",
        "group": "Animals & Nature",
        "subgroup": "animal-mammal"
      },
      {
        "codes": "1F410",
        "char": "🐐",
        "name": "goat",
        "category": "Animals & Nature (animal-mammal)",
        "group": "Animals & Nature",
        "subgroup": "animal-mammal"
      },
      {
        "codes": "1F42A",
        "char": "🐪",
        "name": "camel",
        "category": "Animals & Nature (animal-mammal)",
        "group": "Animals & Nature",
        "subgroup": "animal-mammal"
      },
      {
        "codes": "1F999",
        "char": "🦙",
        "name": "llama",
        "category": "Animals & Nature (animal-mammal)",
        "group": "Animals & Nature",
        "subgroup": "animal-mammal"
      },
      {
        "codes": "1F418",
        "char": "🐘",
        "name": "elephant",
        "category": "Animals & Nature (animal-mammal)",
        "group": "Animals & Nature",
        "subgroup": "animal-mammal"
      },
      {
        "codes": "1F401",
        "char": "🐁",
        "name": "mouse",
        "category": "Animals & Nature (animal-mammal)",
        "group": "Animals & Nature",
        "subgroup": "animal-mammal"
      },
      {
        "codes": "1F427",
        "char": "🐧",
        "name": "penguin",
        "category": "Animals & Nature (animal-bird)",
        "group": "Animals & Nature",
        "subgroup": "animal-bird"
      },
      {
        "codes": "1F407",
        "char": "🐇",
        "name": "rabbit",
        "category": "Animals & Nature (animal-mammal)",
        "group": "Animals & Nature",
        "subgroup": "animal-mammal"
      },
    ]
  },
  {
    label: "食物",
    emojis: [
      {
        "codes": "1F347",
        "char": "🍇",
        "name": "grapes",
        "category": "Food & Drink (food-fruit)",
        "group": "Food & Drink",
        "subgroup": "food-fruit"
      },
      {
        "codes": "1F348",
        "char": "🍈",
        "name": "melon",
        "category": "Food & Drink (food-fruit)",
        "group": "Food & Drink",
        "subgroup": "food-fruit"
      },
      {
        "codes": "1F349",
        "char": "🍉",
        "name": "watermelon",
        "category": "Food & Drink (food-fruit)",
        "group": "Food & Drink",
        "subgroup": "food-fruit"
      },
      {
        "codes": "1F34A",
        "char": "🍊",
        "name": "tangerine",
        "category": "Food & Drink (food-fruit)",
        "group": "Food & Drink",
        "subgroup": "food-fruit"
      },
      {
        "codes": "1F34B",
        "char": "🍋",
        "name": "lemon",
        "category": "Food & Drink (food-fruit)",
        "group": "Food & Drink",
        "subgroup": "food-fruit"
      },
      {
        "codes": "1F34C",
        "char": "🍌",
        "name": "banana",
        "category": "Food & Drink (food-fruit)",
        "group": "Food & Drink",
        "subgroup": "food-fruit"
      },
      {
        "codes": "1F34D",
        "char": "🍍",
        "name": "pineapple",
        "category": "Food & Drink (food-fruit)",
        "group": "Food & Drink",
        "subgroup": "food-fruit"
      },
      {
        "codes": "1F96D",
        "char": "🥭",
        "name": "mango",
        "category": "Food & Drink (food-fruit)",
        "group": "Food & Drink",
        "subgroup": "food-fruit"
      },
      {
        "codes": "1F34E",
        "char": "🍎",
        "name": "red apple",
        "category": "Food & Drink (food-fruit)",
        "group": "Food & Drink",
        "subgroup": "food-fruit"
      },
      {
        "codes": "1F34F",
        "char": "🍏",
        "name": "green apple",
        "category": "Food & Drink (food-fruit)",
        "group": "Food & Drink",
        "subgroup": "food-fruit"
      },
      {
        "codes": "1F350",
        "char": "🍐",
        "name": "pear",
        "category": "Food & Drink (food-fruit)",
        "group": "Food & Drink",
        "subgroup": "food-fruit"
      },
      {
        "codes": "1F351",
        "char": "🍑",
        "name": "peach",
        "category": "Food & Drink (food-fruit)",
        "group": "Food & Drink",
        "subgroup": "food-fruit"
      },
      {
        "codes": "1F352",
        "char": "🍒",
        "name": "cherries",
        "category": "Food & Drink (food-fruit)",
        "group": "Food & Drink",
        "subgroup": "food-fruit"
      },
      {
        "codes": "1F353",
        "char": "🍓",
        "name": "strawberry",
        "category": "Food & Drink (food-fruit)",
        "group": "Food & Drink",
        "subgroup": "food-fruit"
      },
      {
        "codes": "1F95D",
        "char": "🥝",
        "name": "kiwi fruit",
        "category": "Food & Drink (food-fruit)",
        "group": "Food & Drink",
        "subgroup": "food-fruit"
      },
      {
        "codes": "1F345",
        "char": "🍅",
        "name": "tomato",
        "category": "Food & Drink (food-fruit)",
        "group": "Food & Drink",
        "subgroup": "food-fruit"
      },
      {
        "codes": "1F965",
        "char": "🥥",
        "name": "coconut",
        "category": "Food & Drink (food-fruit)",
        "group": "Food & Drink",
        "subgroup": "food-fruit"
      },
      {
        "codes": "1F951",
        "char": "🥑",
        "name": "avocado",
        "category": "Food & Drink (food-vegetable)",
        "group": "Food & Drink",
        "subgroup": "food-vegetable"
      },
      {
        "codes": "1F346",
        "char": "🍆",
        "name": "eggplant",
        "category": "Food & Drink (food-vegetable)",
        "group": "Food & Drink",
        "subgroup": "food-vegetable"
      },
      {
        "codes": "1F954",
        "char": "🥔",
        "name": "potato",
        "category": "Food & Drink (food-vegetable)",
        "group": "Food & Drink",
        "subgroup": "food-vegetable"
      },
      {
        "codes": "1F955",
        "char": "🥕",
        "name": "carrot",
        "category": "Food & Drink (food-vegetable)",
        "group": "Food & Drink",
        "subgroup": "food-vegetable"
      },
      {
        "codes": "1F33D",
        "char": "🌽",
        "name": "ear of corn",
        "category": "Food & Drink (food-vegetable)",
        "group": "Food & Drink",
        "subgroup": "food-vegetable"
      },
      {
        "codes": "1F336",
        "char": "🌶️",
        "name": "hot pepper",
        "category": "Food & Drink (food-vegetable)",
        "group": "Food & Drink",
        "subgroup": "food-vegetable"
      },
      {
        "codes": "1F952",
        "char": "🥒",
        "name": "cucumber",
        "category": "Food & Drink (food-vegetable)",
        "group": "Food & Drink",
        "subgroup": "food-vegetable"
      },
      {
        "codes": "1F96C",
        "char": "🥬",
        "name": "leafy green",
        "category": "Food & Drink (food-vegetable)",
        "group": "Food & Drink",
        "subgroup": "food-vegetable"
      },
      {
        "codes": "1F966",
        "char": "🥦",
        "name": "broccoli",
        "category": "Food & Drink (food-vegetable)",
        "group": "Food & Drink",
        "subgroup": "food-vegetable"
      },
      {
        "codes": "1F9C4",
        "char": "🧄",
        "name": "garlic",
        "category": "Food & Drink (food-vegetable)",
        "group": "Food & Drink",
        "subgroup": "food-vegetable"
      },
      {
        "codes": "1F9C5",
        "char": "🧅",
        "name": "onion",
        "category": "Food & Drink (food-vegetable)",
        "group": "Food & Drink",
        "subgroup": "food-vegetable"
      },
      {
        "codes": "1F344",
        "char": "🍄",
        "name": "mushroom",
        "category": "Food & Drink (food-vegetable)",
        "group": "Food & Drink",
        "subgroup": "food-vegetable"
      },
      {
        "codes": "1F95C",
        "char": "🥜",
        "name": "peanuts",
        "category": "Food & Drink (food-vegetable)",
        "group": "Food & Drink",
        "subgroup": "food-vegetable"
      },
      {
        "codes": "1F330",
        "char": "🌰",
        "name": "chestnut",
        "category": "Food & Drink (food-vegetable)",
        "group": "Food & Drink",
        "subgroup": "food-vegetable"
      },
      {
        "codes": "1F36C",
        "char": "🍬",
        "name": "candy",
        "category": "Food & Drink (food-sweet)",
        "group": "Food & Drink",
        "subgroup": "food-sweet"
      },
      {
        "codes": "1F36D",
        "char": "🍭",
        "name": "lollipop",
        "category": "Food & Drink (food-sweet)",
        "group": "Food & Drink",
        "subgroup": "food-sweet"
      },
      {
        "codes": "1F35E",
        "char": "🍞",
        "name": "bread",
        "category": "Food & Drink (food-prepared)",
        "group": "Food & Drink",
        "subgroup": "food-prepared"
      },
      {
        "codes": "1F950",
        "char": "🥐",
        "name": "croissant",
        "category": "Food & Drink (food-prepared)",
        "group": "Food & Drink",
        "subgroup": "food-prepared"
      },
      {
        "codes": "1F956",
        "char": "🥖",
        "name": "baguette bread",
        "category": "Food & Drink (food-prepared)",
        "group": "Food & Drink",
        "subgroup": "food-prepared"
      },
      {
        "codes": "1F355",
        "char": "🍕",
        "name": "pizza",
        "category": "Food & Drink (food-prepared)",
        "group": "Food & Drink",
        "subgroup": "food-prepared"
      },
      {
        "codes": "1F32D",
        "char": "🌭",
        "name": "hot dog",
        "category": "Food & Drink (food-prepared)",
        "group": "Food & Drink",
        "subgroup": "food-prepared"
      },
    ]
  },
  {
    label: "植物",
    emojis: [
      {
        "codes": "1F490",
        "char": "💐",
        "name": "bouquet",
        "category": "Animals & Nature (plant-flower)",
        "group": "Animals & Nature",
        "subgroup": "plant-flower"
      },
      {
        "codes": "1F338",
        "char": "🌸",
        "name": "cherry blossom",
        "category": "Animals & Nature (plant-flower)",
        "group": "Animals & Nature",
        "subgroup": "plant-flower"
      },
      {
        "codes": "1F4AE",
        "char": "💮",
        "name": "white flower",
        "category": "Animals & Nature (plant-flower)",
        "group": "Animals & Nature",
        "subgroup": "plant-flower"
      },
      {
        "codes": "1F339",
        "char": "🌹",
        "name": "rose",
        "category": "Animals & Nature (plant-flower)",
        "group": "Animals & Nature",
        "subgroup": "plant-flower"
      },
      {
        "codes": "1F940",
        "char": "🥀",
        "name": "wilted flower",
        "category": "Animals & Nature (plant-flower)",
        "group": "Animals & Nature",
        "subgroup": "plant-flower"
      },
      {
        "codes": "1F33A",
        "char": "🌺",
        "name": "hibiscus",
        "category": "Animals & Nature (plant-flower)",
        "group": "Animals & Nature",
        "subgroup": "plant-flower"
      },
      {
        "codes": "1F33B",
        "char": "🌻",
        "name": "sunflower",
        "category": "Animals & Nature (plant-flower)",
        "group": "Animals & Nature",
        "subgroup": "plant-flower"
      },
      {
        "codes": "1F33C",
        "char": "🌼",
        "name": "blossom",
        "category": "Animals & Nature (plant-flower)",
        "group": "Animals & Nature",
        "subgroup": "plant-flower"
      },
      {
        "codes": "1F337",
        "char": "🌷",
        "name": "tulip",
        "category": "Animals & Nature (plant-flower)",
        "group": "Animals & Nature",
        "subgroup": "plant-flower"
      },
      {
        "codes": "1F332",
        "char": "🌲",
        "name": "evergreen tree",
        "category": "Animals & Nature (plant-other)",
        "group": "Animals & Nature",
        "subgroup": "plant-other"
      },
      {
        "codes": "1F333",
        "char": "🌳",
        "name": "deciduous tree",
        "category": "Animals & Nature (plant-other)",
        "group": "Animals & Nature",
        "subgroup": "plant-other"
      },
      {
        "codes": "1F334",
        "char": "🌴",
        "name": "palm tree",
        "category": "Animals & Nature (plant-other)",
        "group": "Animals & Nature",
        "subgroup": "plant-other"
      },
      {
        "codes": "1F335",
        "char": "🌵",
        "name": "cactus",
        "category": "Animals & Nature (plant-other)",
        "group": "Animals & Nature",
        "subgroup": "plant-other"
      },
      {
        "codes": "1F33E",
        "char": "🌾",
        "name": "sheaf of rice",
        "category": "Animals & Nature (plant-other)",
        "group": "Animals & Nature",
        "subgroup": "plant-other"
      },
      {
        "codes": "1F33F",
        "char": "🌿",
        "name": "herb",
        "category": "Animals & Nature (plant-other)",
        "group": "Animals & Nature",
        "subgroup": "plant-other"
      },
      {
        "codes": "2618",
        "char": "☘️",
        "name": "shamrock",
        "category": "Animals & Nature (plant-other)",
        "group": "Animals & Nature",
        "subgroup": "plant-other"
      },
      {
        "codes": "1F340",
        "char": "🍀",
        "name": "four leaf clover",
        "category": "Animals & Nature (plant-other)",
        "group": "Animals & Nature",
        "subgroup": "plant-other"
      },
      {
        "codes": "1F341",
        "char": "🍁",
        "name": "maple leaf",
        "category": "Animals & Nature (plant-other)",
        "group": "Animals & Nature",
        "subgroup": "plant-other"
      },
      {
        "codes": "1F342",
        "char": "🍂",
        "name": "fallen leaf",
        "category": "Animals & Nature (plant-other)",
        "group": "Animals & Nature",
        "subgroup": "plant-other"
      },
      {
        "codes": "1F343",
        "char": "🍃",
        "name": "leaf fluttering in wind",
        "category": "Animals & Nature (plant-other)",
        "group": "Animals & Nature",
        "subgroup": "plant-other"
      },
    ]
  },
  {
    label:"运动",
    emojis: [
      {
        "codes": "26BD",
        "char": "⚽",
        "name": "soccer ball",
        "category": "Activities (sport)",
        "group": "Activities",
        "subgroup": "sport"
      },
      {
        "codes": "26BE",
        "char": "⚾",
        "name": "baseball",
        "category": "Activities (sport)",
        "group": "Activities",
        "subgroup": "sport"
      },
      {
        "codes": "1F94E",
        "char": "🥎",
        "name": "softball",
        "category": "Activities (sport)",
        "group": "Activities",
        "subgroup": "sport"
      },
      {
        "codes": "1F3C0",
        "char": "🏀",
        "name": "basketball",
        "category": "Activities (sport)",
        "group": "Activities",
        "subgroup": "sport"
      },
      {
        "codes": "1F3D0",
        "char": "🏐",
        "name": "volleyball",
        "category": "Activities (sport)",
        "group": "Activities",
        "subgroup": "sport"
      },
      {
        "codes": "1F3C8",
        "char": "🏈",
        "name": "american football",
        "category": "Activities (sport)",
        "group": "Activities",
        "subgroup": "sport"
      },
      {
        "codes": "1F3C9",
        "char": "🏉",
        "name": "rugby football",
        "category": "Activities (sport)",
        "group": "Activities",
        "subgroup": "sport"
      },
      {
        "codes": "1F3BE",
        "char": "🎾",
        "name": "tennis",
        "category": "Activities (sport)",
        "group": "Activities",
        "subgroup": "sport"
      },
      {
        "codes": "1F94F",
        "char": "🥏",
        "name": "flying disc",
        "category": "Activities (sport)",
        "group": "Activities",
        "subgroup": "sport"
      },
      {
        "codes": "1F3B3",
        "char": "🎳",
        "name": "bowling",
        "category": "Activities (sport)",
        "group": "Activities",
        "subgroup": "sport"
      },
      {
        "codes": "1F3CF",
        "char": "🏏",
        "name": "cricket game",
        "category": "Activities (sport)",
        "group": "Activities",
        "subgroup": "sport"
      },
      {
        "codes": "1F3D1",
        "char": "🏑",
        "name": "field hockey",
        "category": "Activities (sport)",
        "group": "Activities",
        "subgroup": "sport"
      },
      {
        "codes": "1F3D2",
        "char": "🏒",
        "name": "ice hockey",
        "category": "Activities (sport)",
        "group": "Activities",
        "subgroup": "sport"
      },
      {
        "codes": "1F94D",
        "char": "🥍",
        "name": "lacrosse",
        "category": "Activities (sport)",
        "group": "Activities",
        "subgroup": "sport"
      },
      {
        "codes": "1F3D3",
        "char": "🏓",
        "name": "ping pong",
        "category": "Activities (sport)",
        "group": "Activities",
        "subgroup": "sport"
      },
      {
        "codes": "1F3F8",
        "char": "🏸",
        "name": "badminton",
        "category": "Activities (sport)",
        "group": "Activities",
        "subgroup": "sport"
      },
      {
        "codes": "1F94A",
        "char": "🥊",
        "name": "boxing glove",
        "category": "Activities (sport)",
        "group": "Activities",
        "subgroup": "sport"
      },
      {
        "codes": "1F94B",
        "char": "🥋",
        "name": "martial arts uniform",
        "category": "Activities (sport)",
        "group": "Activities",
        "subgroup": "sport"
      },
      {
        "codes": "1F945",
        "char": "🥅",
        "name": "goal net",
        "category": "Activities (sport)",
        "group": "Activities",
        "subgroup": "sport"
      },
      {
        "codes": "26F3",
        "char": "⛳",
        "name": "flag in hole",
        "category": "Activities (sport)",
        "group": "Activities",
        "subgroup": "sport"
      },
      {
        "codes": "26F8",
        "char": "⛸️",
        "name": "ice skate",
        "category": "Activities (sport)",
        "group": "Activities",
        "subgroup": "sport"
      },
      {
        "codes": "1F3A3",
        "char": "🎣",
        "name": "fishing pole",
        "category": "Activities (sport)",
        "group": "Activities",
        "subgroup": "sport"
      },
    ]
  },
  {
    label: "其它",
    emojis: [
      {
        "codes": "1F507",
        "char": "🔇",
        "name": "muted speaker",
        "category": "Objects (sound)",
        "group": "Objects",
        "subgroup": "sound"
      },
      {
        "codes": "1F508",
        "char": "🔈",
        "name": "speaker low volume",
        "category": "Objects (sound)",
        "group": "Objects",
        "subgroup": "sound"
      },
      {
        "codes": "1F509",
        "char": "🔉",
        "name": "speaker medium volume",
        "category": "Objects (sound)",
        "group": "Objects",
        "subgroup": "sound"
      },
      {
        "codes": "1F50A",
        "char": "🔊",
        "name": "speaker high volume",
        "category": "Objects (sound)",
        "group": "Objects",
        "subgroup": "sound"
      },
      {
        "codes": "1F4E2",
        "char": "📢",
        "name": "loudspeaker",
        "category": "Objects (sound)",
        "group": "Objects",
        "subgroup": "sound"
      },
      {
        "codes": "1F37A",
        "char": "🍺",
        "name": "beer mug",
        "category": "Food & Drink (drink)",
        "group": "Food & Drink",
        "subgroup": "drink"
      },
      {
        "codes": "1F37B",
        "char": "🍻",
        "name": "clinking beer mugs",
        "category": "Food & Drink (drink)",
        "group": "Food & Drink",
        "subgroup": "drink"
      },
    ]
  }
]

export default emojis;
