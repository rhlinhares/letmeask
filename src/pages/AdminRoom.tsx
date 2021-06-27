import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg';
import logoDarkImg from '../assets/images/logo-dark.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';
import emptyQuestionsImg from '../assets/images/empty-questions.svg';

import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import '../styles/room.scss';
import { database } from '../services/firebase';
import { LogOutButton } from '../components/LogOutButton';
import { useTheme } from '../hooks/useTheme';
import { ThemeButton } from '../components/ThemeButton';

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { questions, title } = useRoom(roomId);
  const { theme } = useTheme();

  async function handleEndRoom() {
    if (window.confirm('Deseja encerrar a sala?')) {
      await database.ref(`rooms/${roomId}`).update({
        endedAt: new Date(),
      });
      history.push('/');
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    if (window.confirm('Deseja marcar a pergunta como respondida?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isAnswered: true,
      });
    }
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  return (
    <div id="page-room" className={theme}>
      <header>
        <div className="top-left">{user && <LogOutButton />}</div>
        <div className="header-content">
          <div className="logo">
            <img src={theme === 'dark' ? logoDarkImg : logoImg} alt="Letmeask" />
          </div>

          <div className="room-functions">
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar Sala
            </Button>
          </div>
        </div>
        <div className="top-right">
          <ThemeButton />
        </div>
      </header>
      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.length > 0 ? (
            questions.map(question => {
              return (
                <Question
                  key={question.id}
                  content={question.content}
                  author={question.author}
                  isAnswered={question.isAnswered}
                  isHighlighted={question.isHighlighted}
                >
                  {!question.isAnswered && (
                    <>
                      <button type="button" onClick={() => handleCheckQuestionAsAnswered(question.id)}>
                        <img src={checkImg} alt="Marcar pergunta como respondida" />
                      </button>
                      <button type="button" onClick={() => handleHighlightQuestion(question.id)}>
                        <img src={answerImg} alt="Dar destaque à pergunta" />
                      </button>
                    </>
                  )}
                  <button type="button" onClick={() => handleDeleteQuestion(question.id)}>
                    <img src={deleteImg} alt="Remover pergunta" />
                  </button>
                </Question>
              );
            })
          ) : (
            <div className="empty-questions">
              <img src={emptyQuestionsImg} alt="Sem perguntas no momento" />
              <p>
                <strong>Nenhuma pergunta por aqui...</strong>
              </p>
              <p>Aguarde...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
