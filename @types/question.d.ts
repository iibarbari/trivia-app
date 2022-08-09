type TRawQuestion = {
  category: string;
  correct_answer: string;
  incorrect_answers: string[];
  question: string;
}

type TAnswer = 'True' | 'False' | null;

type TQuestion = {
  category: string;
  correctAnswer: string;
  question: string;
  answer: TAnswer
}

