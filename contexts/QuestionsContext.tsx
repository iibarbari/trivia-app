import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';

type TQuestionsContext = {
  questions: TQuestion[];
  answers: TAnswer[];
  count: number;
  currentQuestion?: TQuestion;
  updateAnswers: (answer: TAnswer) => void;
  isLoading: boolean;
}

const initialCtx: TQuestionsContext = {
  questions: [],
  answers: [],
  count: 0,
  currentQuestion: undefined,
  updateAnswers: () => {
  },
  isLoading: true,
};

export const QuestionsContext = createContext<TQuestionsContext>(initialCtx);

export default function QuestionsContextProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [questions, setQuestions] = useState<TQuestion[]>(initialCtx.questions);
  const [answers, setAnswers] = useState<TAnswer[]>(initialCtx.answers);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    async function fetchQuestions() {
      setIsLoading(true);

      const res = await fetch('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean');

      const json = await res.json();

      if (res.ok) {
        setQuestions((json.results as TRawQuestion[]).map(({ category, correct_answer, question }) => ({
          category,
          correctAnswer: correct_answer,
          question,
          answer: null,
        })));

        setAnswers([...new Array(json.results.length).fill(null)]);

        setIsLoading(false);
      } else {
        setIsLoading(false);

        throw new Error(json.error);
      }
    }

    fetchQuestions();
  }, []);


  const updateAnswers = useCallback((answer: TAnswer) => {
    setQuestions(prev => {
      return prev.map((curr, index) => index === count ? { ...curr, answer } : curr);
    });

    setCount(prev => prev + 1);
  }, [count]);


  const currentQuestion = useMemo<TQuestion | undefined>(() => questions[count], [questions, count]);

  const values = useMemo(() => ({ questions, answers, count, currentQuestion, updateAnswers, isLoading }),
    [answers, questions, count, currentQuestion, updateAnswers, isLoading]);

  return (
    <QuestionsContext.Provider value={values}>
      {children}
    </QuestionsContext.Provider>
  );
}
