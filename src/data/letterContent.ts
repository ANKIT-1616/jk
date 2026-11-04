/**
 * PERSONALIZATION CONFIGURATION
 * 
 * Edit this file to customize the names, messages, letter text,
 * song choice, and details throughout the entire romantic experience.
 */

export interface LetterConfig {
  recipientName: string;
  senderSignature: string;
  dateText?: string;
  centralMotto: string;

  // Screen 1: Envelope
  envelope: {
    label: string;
    sublabel: string;
    cardMessage: string;
    buttonText: string;
  };

  // Screen 2: Connect The Dots
  connectTheDots: {
    heading: string;
    subheading: string;
    surroundingWords: {
      topLeft: string;
      bottomLeft: string;
      topRight: string;
      bottomRight: string;
    };
    completionMessage: string;
    nextButtonText: string;
  };

  // Screen 3: The Little Message
  littleMessage: {
    heading: string;
    revealedText: string;
    buttonText: string;
  };

  // Screen 4: The Music
  music: {
    songTitle: string;
    artist: string;
    year: string;
    quote: string;
    lyricsSnippet: string;
    youtubeVideoId: string;
    spotifyUrl: string;
    youtubeUrl: string;
    buttonText: string;
  };

  // Screen 5: The Personal Love Letter
  letter: {
    salutation: string;
    paragraphs: string[];
    signoff: string;
    buttonText: string;
  };

  // Screen 6: The Final Surprise
  finalSurprise: {
    headline: string;
    subheadline: string;
    signature: string;
    keepsakeTitle: string;
  };
}

export const defaultLetterConfig: LetterConfig = {
  recipientName: "My Love",
  senderSignature: "With all my heart, ♡",
  dateText: "Handcrafted for you",
  centralMotto: "If you ever receive something handmade from me, that's when you know you're loved.",

  envelope: {
    label: "Something I made for you.",
    sublabel: "Open when you have a little time.",
    cardMessage: "I made something for you.\nAnd I hope you like it as much as I loved making it.",
    buttonText: "Let's begin ♡",
  },

  connectTheDots: {
    heading: "Some things are better discovered slowly...",
    subheading: "Connect the dots, one by one.",
    surroundingWords: {
      topLeft: "If you connect these dots,",
      bottomLeft: "you'll slowly discover",
      topRight: "how much my heart",
      bottomRight: "loves you...",
    },
    completionMessage: "See? Even the dots were trying to tell you something.",
    nextButtonText: "There's a little more... ♡",
  },

  littleMessage: {
    heading: "Well, now that you've connected the dots...",
    revealedText: "I hope you know that you mean more to me than I could ever fit into a few words.",
    buttonText: "Listen with me ♪",
  },

  music: {
    songTitle: "Can't Help Falling in Love",
    artist: "Elvis Presley",
    year: "1961",
    quote: "Some songs say the things that I sometimes can't.",
    lyricsSnippet: "Wise men say only fools rush in, but I can't help falling in love with you...",
    youtubeVideoId: "vGJTaP6anOU",
    spotifyUrl: "https://open.spotify.com/track/44AyOl4qVkzS48vBsbNXaC",
    youtubeUrl: "https://www.youtube.com/watch?v=vGJTaP6anOU",
    buttonText: "Read my letter ♡",
  },

  letter: {
    salutation: "Hey, you ♡",
    paragraphs: [
      "I don't always know how to put everything I feel into words.",
      "Sometimes, even the simplest things remind me of you. And sometimes, I wish I could show you just how much you mean to me without having to explain it.",
      "So I thought I'd make something instead.",
      "Something small, something handmade in its own little way, but something that carries a feeling I hope you can understand.",
      "If there's one thing I want you to remember, it's that you are special to me.",
      "And if I could connect a thousand more dots, I would still end up writing the same thing.",
      "I love you.",
    ],
    signoff: "Always, ♡",
    buttonText: "One last thing ♡",
  },

  finalSurprise: {
    headline: "Out of all the little things I could make, this one will always be my favourite.",
    subheadline: "Because it's for you. ♡",
    signature: "Made with love, just for you.",
    keepsakeTitle: "Our Handmade Keepsake",
  },
};
