import { SentimentAnalyzer, PorterStemmer, WordTokenizer } from 'natural';
import { removeStopwords } from "stopword";

export function getSentiment(text: string) {

    /** 
     * Removing non alphabetical and special characters
     * Converting to lowercase
     */
    const alphaOnlyReview = text.replace(/[^a-zA-Z\s]+/g, '');

    /**
     * Tokenization
     */
    const tokenizer = new WordTokenizer();
    const tokenizedText= tokenizer.tokenize(alphaOnlyReview);

    /** Remove stop words */
    const filteredText = removeStopwords(tokenizedText);

    const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
    return analyzer.getSentiment(filteredText);
}