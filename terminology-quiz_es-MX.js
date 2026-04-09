function submitAnswers() {
  const questions = {
      q1: {
          correct: "False",
          correctFeedback: "¡Correcto! “Es importante recordar que sólo porque las comunidades de hablantes usen un lenguaje común no quiere decir que esos hablantes compartan exactamente la misma conceptualización de ucada objeto designado... Si les pidieras dibujar su conceptualización de una mesa, dos hablantes de una lengua no dibujarán la misma desde su inventario mental de todas aquellas que se hayan encontrado o imaginado en sus vidas. Esto es importante porque aquellos fuera de los servicios de lenguaje y profesiones de localización azumen que el significado yace dentro de la designación, pero las palabras en sí mismas son arbitrarias y vacías. El significado realmente está en el ojo o el cerebro que lo contempla." (Alaina Brandt, Comenzando con la Gestión Terminológica, The ATA Chronicle)",
          incorrectFeedback: {
              "True": "Incorrecto. “Es importante recordar que sólo porque las comunidades de hablantes usen un lenguaje común no quiere decir que esos hablantes compartan exactamente la misma conceptualización de ucada objeto designado... Si les pidieras dibujar su conceptualización de una mesa, dos hablantes de una lengua no dibujarán la misma desde su inventario mental de todas aquellas que se hayan encontrado o imaginado en sus vidas. Esto es importante porque aquellos fuera de los servicios de lenguaje y profesiones de localización azumen que el significado yace dentro de la designación, pero las palabras en sí mismas son arbitrarias y vacías. El significado realmente está en el ojo o el cerebro que lo contempla." (Alaina Brandt, Comenzando con la Gestión Terminológica, The ATA Chronicle)",
          }
      },
      q2: {
          correct: "use in a specific subject field",
          correctFeedback: "¡Correcto! El lenguaje especial es un lenguaje natural utilizado en un campo temático y caracterizado por el uso de medios específicos de expresión. (ISO 1087)",
          incorrectFeedback: {
              "independent of any specific subject field": "Incorrecto. El lenguaje especial es un lenguaje natural utilizado en un campo temático y caracterizado por el uso de medios específicos de expresión. (ISO 1087)",
          }
      },
      q3: {
          correct: "rendering of ideas",
          correctFeedback: "¿Correcto!",
          incorrectFeedback: {
              "written content": "Incorrecto. Una característica compartida de la traducción e interpretación es que ambas son una representación de ideas expresadas de un idioma a otro idioma.",
              "verbal content": "Incorrecto. Una característica compartida de la traducción e interpretación es que ambas son una representación de ideas expresadas de un idioma a otro idioma.."
          }
      }
  };

  try {
    const form = document.forms["quizForm"];
    if (!form) {
        throw new Error("Quiz form not found");
    }

    let unansweredQuestions = [];
    let totalCorrect = 0;

    // Loop through each question
    for (const question in questions) {
        const radioButtons = form[question];
        const feedbackElement = document.getElementById("feedback_" + question);
        
        if (!feedbackElement) {
            throw new Error(`Feedback element for question ${question} not found`);
        }

        if (!radioButtons) {
            throw new Error(`Radio buttons for question ${question} not found`);
        }

        // Check if question is answered
        const selectedValue = radioButtons.value;
        if (selectedValue === "") {
            unansweredQuestions.push(question.replace('q', ''));
            continue;
        }

        // Process answer
        const isCorrect = selectedValue === questions[question].correct;
        if (isCorrect) {
            totalCorrect++;
            feedbackElement.innerHTML = questions[question].correctFeedback;
            feedbackElement.style.color = "green";
        } else {
            feedbackElement.innerHTML = questions[question].incorrectFeedback[selectedValue] || "Incorrect. Please try again.";
            feedbackElement.style.color = "red";
        }

        // Make feedback accessible to screen readers
        feedbackElement.setAttribute('role', 'alert');
    }

    // Handle unanswered questions
    if (unansweredQuestions.length > 0) {
        const errorMsg = `Please answer ${unansweredQuestions.length === 1 ? 'question' : 'questions'} ${unansweredQuestions.join(', ')}`;
        const errorElement = document.getElementById('quiz-error') || createErrorElement();
        errorElement.textContent = errorMsg;
        errorElement.style.display = 'block';
        return false;
    }

    // Announce final score to screen readers
    const scoreAnnouncement = document.createElement('div');
    scoreAnnouncement.setAttribute('role', 'status');
    scoreAnnouncement.setAttribute('aria-live', 'polite');
    scoreAnnouncement.className = 'sr-only';
    scoreAnnouncement.textContent = `You got ${totalCorrect} out of ${Object.keys(questions).length} questions correct`;
    document.querySelector('.quiz-container').appendChild(scoreAnnouncement);

} catch (error) {
    console.error('Quiz error:', error);
    const errorElement = document.getElementById('quiz-error') || createErrorElement();
    errorElement.textContent = 'An error occurred while processing your answers. Please refresh the page and try again.';
    errorElement.style.display = 'block';
}

return false;
}

function createErrorElement() {
const errorElement = document.createElement('div');
errorElement.id = 'quiz-error';
errorElement.className = 'error-message';
errorElement.setAttribute('role', 'alert');
errorElement.style.color = 'red';
document.querySelector('.quiz-container').insertBefore(errorElement, document.querySelector('#quizForm'));
return errorElement;
}