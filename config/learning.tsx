import type {
  CodingQuizQuestion,
  FeedbackRule,
  Flashcard,
  LearningModule,
  PracticeItem,
  QuizQuestion,
  ScoringRule,
} from "@/types/learning";

export const learningMeta = {
  dataSource: "config",
  questionSchema: {
    quiz: "id, prompt, choices, correctChoiceId, explanation, difficulty, tags",
    codingQuiz:
      "id, type, prompt, code, choices, correctChoiceId, explanation, expectedOutput, difficulty, tags",
    practice: "id, title, prompt, explanation, solution, difficulty, tags",
    flashcards: "id, front, back, difficulty, tags",
  },
  progressMetrics: {
    quiz: "attempts, bestPercent, averagePercent, lastAttemptAt",
    practice: "bookmarks",
    flashcards: "ratingsCount, bookmarks",
  },
};

export const learningModules: LearningModule[] = [
  {
    id: "quiz",
    title: "Quiz",
    description: "Check React fundamentals with timed-style multiple choice.",
    href: "/quiz",
    badge: "Core",
    questionCount: 5,
  },
  {
    id: "coding-quiz",
    title: "Coding Quiz",
    description: "Interpret code output, errors, and core concepts.",
    href: "/coding-quiz",
    badge: "Code",
    questionCount: 5,
  },
  {
    id: "practice",
    title: "Practice",
    description: "Guided exercises with explanations and bookmarks.",
    href: "/practice",
    badge: "Drill",
    questionCount: 4,
  },
  {
    id: "flashcards",
    title: "Flashcards",
    description: "Flip cards and self-rate your understanding.",
    href: "/flashcards",
    badge: "Review",
    questionCount: 6,
  },
];

export const scoringRules: Record<"quiz" | "coding-quiz", ScoringRule> = {
  quiz: {
    correctPoints: 10,
    incorrectPoints: 0,
    skippedPoints: 0,
    passingPercent: 70,
  },
  "coding-quiz": {
    correctPoints: 15,
    incorrectPoints: 0,
    skippedPoints: 0,
    passingPercent: 65,
  },
};

export const feedbackRules: Record<"quiz" | "coding-quiz", FeedbackRule> = {
  quiz: {
    correctLabel: "Correct",
    incorrectLabel: "Review this",
    showExplanation: true,
  },
  "coding-quiz": {
    correctLabel: "Looks good",
    incorrectLabel: "Needs another pass",
    showExplanation: true,
  },
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: "quiz-1",
    prompt: "Which React hook is used to manage local component state?",
    choices: [
      { id: "a", label: "useState" },
      { id: "b", label: "useEffect" },
      { id: "c", label: "useMemo" },
      { id: "d", label: "useRef" },
    ],
    correctChoiceId: "a",
    explanation: "useState is the hook designed for local state inside function components.",
    difficulty: "Beginner",
    tags: ["hooks", "state"],
  },
  {
    id: "quiz-2",
    prompt: "What is the main purpose of the key prop when rendering lists?",
    choices: [
      { id: "a", label: "It enables component memoization." },
      { id: "b", label: "It identifies elements for efficient reconciliation." },
      { id: "c", label: "It locks the list order to prevent re-rendering." },
      { id: "d", label: "It automatically adds an id attribute." },
    ],
    correctChoiceId: "b",
    explanation: "Keys help React match list items between renders for minimal DOM updates.",
    difficulty: "Beginner",
    tags: ["rendering", "lists"],
  },
  {
    id: "quiz-3",
    prompt: "Which statement about props is true?",
    choices: [
      { id: "a", label: "Props are mutable inside the child component." },
      { id: "b", label: "Props flow down from parent to child." },
      { id: "c", label: "Props are shared across siblings automatically." },
      { id: "d", label: "Props can only be strings." },
    ],
    correctChoiceId: "b",
    explanation: "Props are passed from parent to child and treated as read-only in the child.",
    difficulty: "Beginner",
    tags: ["props", "components"],
  },
  {
    id: "quiz-4",
    prompt: "Which hook is best for memoizing a derived value?",
    choices: [
      { id: "a", label: "useEffect" },
      { id: "b", label: "useMemo" },
      { id: "c", label: "useLayoutEffect" },
      { id: "d", label: "useReducer" },
    ],
    correctChoiceId: "b",
    explanation: "useMemo caches expensive computations based on dependencies.",
    difficulty: "Intermediate",
    tags: ["performance", "hooks"],
  },
  {
    id: "quiz-5",
    prompt: "What does lifting state up help you achieve?",
    choices: [
      { id: "a", label: "Sharing state across sibling components." },
      { id: "b", label: "Making components uncontrolled." },
      { id: "c", label: "Disabling re-renders." },
      { id: "d", label: "Avoiding props altogether." },
    ],
    correctChoiceId: "a",
    explanation: "Lifting state allows multiple components to read and update shared data.",
    difficulty: "Intermediate",
    tags: ["state", "architecture"],
  },
];

export const codingQuizQuestions: CodingQuizQuestion[] = [
  {
    id: "code-1",
    type: "output",
    prompt: "What does this code log?",
    code: "const values = [1, 2, 3];\nconst next = values.map((value) => value * 2);\nconsole.log(next.join(\",\"));",
    choices: [
      { id: "a", label: "1,2,3" },
      { id: "b", label: "2,4,6" },
      { id: "c", label: "[2,4,6]" },
      { id: "d", label: "3,6,9" },
    ],
    correctChoiceId: "b",
    explanation: "map returns a new array with each value doubled, then joined by commas.",
    expectedOutput: "2,4,6",
    difficulty: "Beginner",
    tags: ["arrays", "output"],
  },
  {
    id: "code-2",
    type: "error",
    prompt: "What happens when this component renders?",
    code: "function Badge({ label }) {\n  return <span>{label.toUpperCase()}</span>;\n}\n\n<Badge />;",
    choices: [
      { id: "a", label: "It renders an empty span." },
      { id: "b", label: "It throws because label is undefined." },
      { id: "c", label: "It logs a warning but renders anyway." },
      { id: "d", label: "It renders the string undefined." },
    ],
    correctChoiceId: "b",
    explanation: "Calling toUpperCase on undefined throws a runtime error.",
    expectedOutput: "TypeError: Cannot read properties of undefined",
    difficulty: "Intermediate",
    tags: ["props", "errors"],
  },
  {
    id: "code-3",
    type: "concept",
    prompt: "Why might you wrap a handler in useCallback?",
    code: "const handleSelect = useCallback((id) => setActive(id), [setActive]);",
    choices: [
      { id: "a", label: "To avoid recreating the function on every render." },
      { id: "b", label: "To run the handler only once." },
      { id: "c", label: "To make the handler asynchronous." },
      { id: "d", label: "To bind this automatically." },
    ],
    correctChoiceId: "a",
    explanation: "useCallback memoizes the function reference when dependencies are stable.",
    difficulty: "Intermediate",
    tags: ["hooks", "performance"],
  },
  {
    id: "code-4",
    type: "output",
    prompt: "What does this snippet return?",
    code: "const items = [\"a\", \"b\", \"c\"];\nconst list = items.filter((item) => item !== \"b\");\nconsole.log(list.length);",
    choices: [
      { id: "a", label: "1" },
      { id: "b", label: "2" },
      { id: "c", label: "3" },
      { id: "d", label: "0" },
    ],
    correctChoiceId: "b",
    explanation: "Filtering out one item leaves two items in the array.",
    expectedOutput: "2",
    difficulty: "Beginner",
    tags: ["arrays", "output"],
  },
  {
    id: "code-5",
    type: "concept",
    prompt: "What is the main benefit of using a controlled input?",
    code: "<input value={value} onChange={(event) => setValue(event.target.value)} />",
    choices: [
      { id: "a", label: "It blocks user typing until submit." },
      { id: "b", label: "It keeps form state in React." },
      { id: "c", label: "It makes the input read-only." },
      { id: "d", label: "It removes the need for validation." },
    ],
    correctChoiceId: "b",
    explanation: "Controlled inputs store form values in React state for validation and logic.",
    difficulty: "Beginner",
    tags: ["forms", "state"],
  },
];

export const practiceItems: PracticeItem[] = [
  {
    id: "practice-1",
    title: "Refactor a button component",
    prompt:
      "Create a reusable Button component that supports variants for default, outline, and destructive states.",
    explanation:
      "A single component keeps styling consistent. Use props to switch classes and allow passing icons.",
    solution:
      "Use a variant prop and map it to class names. Ensure the component forwards refs and supports disabled state.",
    difficulty: "Beginner",
    tags: ["components", "styling"],
  },
  {
    id: "practice-2",
    title: "Lift state for filters",
    prompt:
      "Two sibling components need access to the same filter state. Where should the state live?",
    explanation:
      "Lift the filter state to the closest common parent and pass it down as props to both siblings.",
    solution:
      "Move useState to the parent and pass value + setters to children.",
    difficulty: "Beginner",
    tags: ["state", "architecture"],
  },
  {
    id: "practice-3",
    title: "Memoize expensive calculations",
    prompt:
      "You are computing a heavy dataset based on a filter. How do you prevent recalculation on every render?",
    explanation:
      "Wrap the computation in useMemo and list dependencies that should trigger recalculation.",
    solution:
      "const filtered = useMemo(() => compute(data, filter), [data, filter]);",
    difficulty: "Intermediate",
    tags: ["performance", "hooks"],
  },
  {
    id: "practice-4",
    title: "Explain useEffect cleanup",
    prompt:
      "When and why do you return a cleanup function from useEffect?",
    explanation:
      "Cleanup runs on unmount or before the effect reruns, preventing memory leaks (timers, subscriptions).",
    solution:
      "Return a function to clear timers, unsubscribe, or cancel requests.",
    difficulty: "Intermediate",
    tags: ["hooks", "lifecycle"],
  },
];

export const flashcards: Flashcard[] = [
  {
    id: "card-1",
    front: "What does React reconcile?",
    back: "React compares the virtual DOM trees to update the real DOM efficiently.",
    difficulty: "Beginner",
    tags: ["rendering"],
  },
  {
    id: "card-2",
    front: "Define lifting state up.",
    back: "Moving shared state to the closest common ancestor so multiple components can use it.",
    difficulty: "Beginner",
    tags: ["state"],
  },
  {
    id: "card-3",
    front: "When does useEffect run?",
    back: "After render by default, and again when dependencies change.",
    difficulty: "Beginner",
    tags: ["hooks"],
  },
  {
    id: "card-4",
    front: "Why use a key prop in lists?",
    back: "Keys help React track items between renders for efficient updates.",
    difficulty: "Beginner",
    tags: ["lists"],
  },
  {
    id: "card-5",
    front: "What is a controlled input?",
    back: "An input whose value is managed in React state and updated via onChange.",
    difficulty: "Beginner",
    tags: ["forms"],
  },
  {
    id: "card-6",
    front: "What does useCallback memoize?",
    back: "A function reference, preventing unnecessary re-creation between renders.",
    difficulty: "Intermediate",
    tags: ["hooks"],
  },
];
