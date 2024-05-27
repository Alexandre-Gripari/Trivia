const { QuizStats, QuestionStats } = require('../../../models')

const filterQuestionsFromQuizz = (quizId) => {
    const questionsStats = QuestionStats.get()
    const parsedId = parseInt(quizId, 10)
    return questionsStats.filter((question) => questionsStats.quizId === parsedId)
  }