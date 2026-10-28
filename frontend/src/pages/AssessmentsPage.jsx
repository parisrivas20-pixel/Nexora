import React, { useState } from 'react';
import { 
  FileCheck2, 
  Clock, 
  HelpCircle, 
  Award, 
  Play, 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  X, 
  ArrowRight,
  Filter,
  AlertCircle
} from 'lucide-react';
import Badge from '../components/common/Badge';
import { assessmentsCatalog } from '../data/sampleData';

export default function AssessmentsPage({ setActivePage }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeQuiz, setActiveQuiz] = useState(null); // When taking a quiz
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const categories = ['All', 'Process Management', 'Memory Management', 'Concurrency', 'Storage'];

  const filteredQuizzes = assessmentsCatalog.filter(q => 
    selectedCategory === 'All' || q.category === selectedCategory
  );

  const startQuiz = (quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setUserScore(0);
    setIsQuizFinished(false);
  };

  const handleOptionSelect = (index) => {
    if (showExplanation) return;
    setSelectedOption(index);
  };

  const handleVerifyAnswer = () => {
    if (selectedOption === null) return;
    const currentQ = activeQuiz.sampleQuestions[currentQuestionIndex];
    if (selectedOption === currentQ.correctIndex) {
      setUserScore(prev => prev + 1);
    }
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < activeQuiz.sampleQuestions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setIsQuizFinished(true);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-navy-800 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-indigo-400">
            <FileCheck2 className="h-4 w-4" />
            <span>Formative & Diagnostic Assessment Modules</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight mt-1">
            Topic-Wise OS Assessments
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Concept-tagged assessments specifically calibrate student mastery. Question difficulty and error distributions feed directly into the Knowledge Graph gap-detection engine.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs bg-navy-900 border border-navy-800 px-3.5 py-2 rounded-xl text-slate-300">
          <Award className="h-4 w-4 text-indigo-400" />
          <span>Passing Mastery Benchmark: 70%</span>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap items-center gap-2 bg-navy-900/60 border border-navy-800/80 p-3 rounded-xl text-xs">
        <span className="text-slate-400 font-medium flex items-center gap-1.5 mr-1">
          <Filter className="h-3.5 w-3.5 text-indigo-400" />
          Filter Domain:
        </span>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg transition ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white font-medium shadow'
                : 'bg-navy-850 text-slate-400 hover:text-white border border-navy-750'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Quizzes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredQuizzes.map((quiz) => (
          <div 
            key={quiz.id}
            className="rounded-2xl border border-navy-750 bg-navy-900/70 p-5 shadow-xl flex flex-col justify-between hover:border-indigo-600/40 transition group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400 font-semibold">{quiz.id}</span>
                <Badge variant={quiz.difficulty === 'Beginner' ? 'ready' : quiz.difficulty === 'Intermediate' ? 'mastered' : 'review'}>
                  {quiz.difficulty}
                </Badge>
              </div>

              <div>
                <span className="text-[10px] text-indigo-400 font-medium">{quiz.category}</span>
                <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors mt-0.5">
                  {quiz.title}
                </h3>
              </div>

              <div className="flex items-center space-x-4 text-xs text-slate-400 py-1 border-y border-navy-800/60">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-slate-500" />
                  {quiz.durationMinutes} mins
                </span>
                <span className="flex items-center gap-1.5">
                  <HelpCircle className="h-3.5 w-3.5 text-slate-500" />
                  {quiz.questionsCount} items
                </span>
              </div>

              {quiz.completed ? (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Previous Score</span>
                    <span className={`font-bold ${quiz.lastScore >= quiz.passingScore ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {quiz.lastScore}% {quiz.lastScore >= quiz.passingScore ? '(Passed)' : '(Below Benchmark)'}
                    </span>
                  </div>
                  <div className="w-full bg-navy-950 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className={`h-1.5 rounded-full ${quiz.lastScore >= quiz.passingScore ? 'bg-emerald-400' : 'bg-rose-500'}`}
                      style={{ width: `${quiz.lastScore}%` }}
                    />
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">
                  Not yet attempted. Required for concept mastery score.
                </p>
              )}
            </div>

            <div className="pt-4 mt-4 border-t border-navy-800">
              <button
                onClick={() => startQuiz(quiz)}
                className="w-full py-2.5 rounded-xl bg-navy-800 hover:bg-indigo-600 text-white text-xs font-semibold border border-navy-700 hover:border-indigo-500 flex items-center justify-center space-x-2 transition shadow-md active:scale-95"
              >
                <Play className="h-3.5 w-3.5" />
                <span>{quiz.completed ? 'Retake Assessment' : 'Start Assessment'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Quiz Runner Modal Preview */}
      {activeQuiz && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-navy-900 border border-navy-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-navy-800 pb-4">
              <div>
                <span className="text-[10px] font-mono text-indigo-400">{activeQuiz.id} • {activeQuiz.category}</span>
                <h3 className="text-base font-bold text-white">{activeQuiz.title}</h3>
              </div>
              <button 
                onClick={() => setActiveQuiz(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {!isQuizFinished && activeQuiz.sampleQuestions && activeQuiz.sampleQuestions.length > 0 ? (
              <div className="space-y-6">
                {/* Progress bar */}
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Question {currentQuestionIndex + 1} of {activeQuiz.sampleQuestions.length}</span>
                  <span className="flex items-center gap-1 font-mono text-indigo-300">
                    <Clock className="h-3.5 w-3.5" />
                    14:48
                  </span>
                </div>

                {/* Question Prompt */}
                <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 space-y-1">
                  <h4 className="text-sm font-semibold text-white leading-relaxed">
                    {activeQuiz.sampleQuestions[currentQuestionIndex].question}
                  </h4>
                </div>

                {/* Multiple Choice Options */}
                <div className="space-y-2.5">
                  {activeQuiz.sampleQuestions[currentQuestionIndex].options.map((opt, oIdx) => {
                    const isSelected = selectedOption === oIdx;
                    const isCorrect = oIdx === activeQuiz.sampleQuestions[currentQuestionIndex].correctIndex;
                    
                    let optionStyle = 'bg-navy-850 border-navy-750 text-slate-200 hover:bg-navy-800';
                    if (showExplanation) {
                      if (isCorrect) {
                        optionStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200';
                      } else if (isSelected && !isCorrect) {
                        optionStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                      }
                    } else if (isSelected) {
                      optionStyle = 'bg-indigo-950/80 border-indigo-500 text-white';
                    }

                    return (
                      <div
                        key={oIdx}
                        onClick={() => handleOptionSelect(oIdx)}
                        className={`p-3.5 rounded-xl border text-xs font-medium cursor-pointer transition flex items-center justify-between ${optionStyle}`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="h-5 w-5 rounded-full border border-slate-600 flex items-center justify-center text-[10px] font-bold text-slate-400 shrink-0">
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                        {showExplanation && (
                          isCorrect ? <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" /> :
                          isSelected ? <XCircle className="h-4 w-4 text-rose-400 shrink-0" /> : null
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation Box upon answering */}
                {showExplanation && (
                  <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-700/50 text-xs space-y-1 animate-fadeIn">
                    <p className="font-semibold text-indigo-300 flex items-center gap-1.5">
                      <AlertCircle className="h-4 w-4 text-indigo-400" />
                      Conceptual Diagnostic Explanation:
                    </p>
                    <p className="text-slate-300 leading-relaxed">
                      {activeQuiz.sampleQuestions[currentQuestionIndex].explanation}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-between items-center pt-2">
                  <span className="text-[11px] text-slate-500">
                    Sample assessment preview • Live calibration in Phase 4
                  </span>
                  {!showExplanation ? (
                    <button
                      onClick={handleVerifyAnswer}
                      disabled={selectedOption === null}
                      className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold transition"
                    >
                      Verify Answer
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center space-x-1.5 transition"
                    >
                      <span>{currentQuestionIndex + 1 < activeQuiz.sampleQuestions.length ? 'Next Question' : 'View Results'}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ) : isQuizFinished ? (
              <div className="py-8 text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <Award className="h-8 w-8" />
                </div>
                <h4 className="text-lg font-bold text-white">Diagnostic Attempt Complete</h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  You scored <strong className="text-emerald-400">{userScore} out of {activeQuiz.sampleQuestions.length}</strong> on this module preview. In Phase 4, attempt answers will automatically update your NetworkX Concept Mastery scores.
                </p>
                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={() => setActiveQuiz(null)}
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
                  >
                    Return to Assessments
                  </button>
                  <button
                    onClick={() => { setActiveQuiz(null); setActivePage('gaps'); }}
                    className="px-5 py-2 rounded-xl bg-navy-800 text-slate-200 border border-navy-700 text-xs font-semibold"
                  >
                    Inspect Prerequisite Gaps
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center space-y-3 text-slate-400 text-xs">
                <p>Full question bank for this module will be seeded in Phase 4.</p>
                <button
                  onClick={() => setActiveQuiz(null)}
                  className="px-4 py-2 rounded-lg bg-navy-800 text-slate-300"
                >
                  Close Preview
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
