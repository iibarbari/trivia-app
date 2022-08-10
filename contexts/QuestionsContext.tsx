import { useRouter } from 'next/router';
import React, {
  createContext, useCallback, useEffect, useMemo, useState,
} from 'react';

type TQuestionsContext = {
  count: number;
  currentQuestion?: TQuestion;
  isLoading: boolean;
  questions: TQuestion[];
  hasError: boolean;
  // eslint-disable-next-line no-unused-vars
  updateAnswers: (answer: TAnswer) => void;
  resetGame: () => void;
}

const initialCtx: TQuestionsContext = {
  count: 0,
  currentQuestion: undefined,
  isLoading: false,
  hasError: false,
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
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<TQuestion[]>(initialCtx.questions);
  // const [showScoreboard, setShowScoreboard] = useState<boolean>(false);

  useEffect(() => {
    async function fetchQuestions() {
      setIsLoading(true);

      const res = await fetch('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean');

      const json = await res.json();

      if (res.ok) {
        if (json.response_code === 0) {
          setQuestions((json.results as TRawQuestion[]).map((q) => ({
            category: q.category,
            correctAnswer: q.correct_answer,
            question: q.question,
            answer: null,
          })));

          setCount(0);

          setIsLoading(false);

          setHasError(false);
        } else {
          setIsLoading(false);

          setHasError(true);
        }
      } else {
        setIsLoading(false);

        setHasError(true);
      }
    }

    if (questions.length === 0 && !isLoading && !hasError) {
      fetchQuestions();
    }
  }, [hasError, isLoading, questions]);

  const goToHome = useCallback(() => router.push('/'), [router]);

  const currentQuestion = useMemo<TQuestion | undefined>(
    () => questions[count],
    [questions, count],
  );

  useEffect(() => {
    if (hasError) {
      goToHome();
    }
  }, [goToHome, hasError]);

  const updateAnswers = useCallback((answer: TAnswer) => {
    setQuestions((prev) => prev.map((curr, i) => (i === count ? { ...curr, answer } : curr)));

    setCount((prev) => prev + 1);
  }, [count]);

  const resetGame = useCallback(async () => {
    setQuestions([]);

    setCount(0);
  }, []);

  const values = useMemo(() => ({
    count,
    currentQuestion,
    hasError,
    isLoading,
    questions,
    resetGame,
    updateAnswers,
  }), [count, currentQuestion, isLoading, hasError, resetGame, questions, updateAnswers]);

  return (
    <QuestionsContext.Provider value={values}>
      {children}
    </QuestionsContext.Provider>
  );
}
