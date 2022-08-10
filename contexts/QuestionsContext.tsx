import { useRouter } from 'next/router';
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';

type TQuestionsContext = {
  count: number;
  currentQuestion?: TQuestion;
  isLoading: boolean;
  questions: TQuestion[];
  updateAnswers: (answer: TAnswer) => void;
  resetGame: () => void;
}

const initialCtx: TQuestionsContext = {
  count: 0,
  currentQuestion: undefined,
  isLoading: false,
  questions: [],
  updateAnswers: () => {
  },
  resetGame: () => {
  },
};


export const QuestionsContext = createContext<TQuestionsContext>(initialCtx);

export default function QuestionsContextProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<TQuestion[]>(initialCtx.questions);

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

        setCount(0);

        setIsLoading(false);
      } else {
        setIsLoading(false);

        throw new Error(json.error);
      }
    }

    if (questions.length === 0 && !isLoading) {
      fetchQuestions();
    }
  }, [isLoading, questions]);

  const updateAnswers = useCallback((answer: TAnswer) => {
    setQuestions(prev => {
      return prev.map((curr, index) => index === count ? { ...curr, answer } : curr);
    });

    setCount(prev => prev + 1);
  }, [count]);

  const currentQuestion = useMemo<TQuestion | undefined>(() => questions[count], [questions, count]);

  useEffect(() => {
    // Game finished
    if (count > 9 && currentQuestion === undefined && questions.length > 0) {
      router.push('/score');
    }
  }, [count, currentQuestion, questions.length, router]);

  const resetGame = useCallback(async () => {
    setQuestions([]);

    await router.push('/');
  }, [router]);

  const values = useMemo(() => ({
    count,
    currentQuestion,
    isLoading,
    questions,
    resetGame,
    updateAnswers,
  }), [count, currentQuestion, isLoading, resetGame, questions, updateAnswers]);

  return (
    <QuestionsContext.Provider value={values}>
      {children}
    </QuestionsContext.Provider>
  );
}
