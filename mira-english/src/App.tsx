import { useEffect, useRef, useState, type FormEvent, type RefObject } from "react";
import "./App.css";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=2400&q=80";
const PORTRAIT_IMAGE =
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1400&q=80";

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref as RefObject<T>;
}

function App() {
  const aboutRef = useReveal<HTMLDivElement>();
  const methodRef = useReveal<HTMLDivElement>();
  const formatsRef = useReveal<HTMLDivElement>();
  const contactRef = useReveal<HTMLDivElement>();
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  }

  return (
    <div className="site">
      <header className="nav">
        <a className="nav__brand" href="#top">
          MIRA
        </a>
        <nav className="nav__links" aria-label="Основная навигация">
          <a href="#about">Обо мне</a>
          <a href="#method">Занятия</a>
          <a href="#formats">Форматы</a>
          <a className="nav__cta" href="#contact">
            Записаться
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-label="Главный экран">
          <div className="hero__media" aria-hidden="true">
            <img
              src={HERO_IMAGE}
              alt=""
              width={2400}
              height={1600}
              fetchPriority="high"
            />
          </div>
          <div className="hero__overlay" aria-hidden="true" />
          <div className="hero__content">
            <p className="hero__brand">MIRA</p>
            <h1 className="hero__headline">
              Английский, который звучит уверенно
            </h1>
            <p className="hero__lead">
              Персональные занятия с репетитором — спокойный темп, живая речь и
              результат, который слышно.
            </p>
            <div className="hero__actions">
              <a className="btn btn--primary" href="#contact">
                Записаться на урок
              </a>
              <a className="btn btn--ghost" href="#method">
                Как проходят занятия
              </a>
            </div>
          </div>
        </section>

        <section className="section about" id="about">
          <div className="section__inner about__grid reveal" ref={aboutRef}>
            <div>
              <p className="section__label">Обо мне</p>
              <h2 className="section__title">Репетитор, а не учебник</h2>
              <p className="section__text">
                Я Мира — преподаватель английского с фокусом на разговорную
                уверенность. Работаю с подростками и взрослыми: от уверенного
                «старта после паузы» до подготовки к собеседованиям и экзаменам.
              </p>
              <div className="about__meta">
                <p>
                  <strong>8+ лет практики</strong>
                  Индивидуальные занятия онлайн и очно в Москве.
                </p>
                <p>
                  <strong>C2 / CELTA</strong>
                  Системная грамматика без сухости и живой словарь на каждый день.
                </p>
              </div>
            </div>
            <div className="about__portrait">
              <img
                src={PORTRAIT_IMAGE}
                alt="Преподаватель английского Мира"
                width={1400}
                height={1750}
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <section className="section method" id="method">
          <div className="section__inner reveal" ref={methodRef}>
            <p className="section__label">Как проходят занятия</p>
            <h2 className="section__title">Один фокус — ваш прогресс</h2>
            <p className="section__text">
              Каждая встреча строится вокруг вашей цели: говорим много, разбираем
              ошибки мягко и закрепляем то, что реально пригодится.
            </p>
            <ol className="method__list">
              <li>
                <span className="method__num">01</span>
                <div>
                  <h3>Диагностика и цель</h3>
                  <p>
                    Смотрим уровень, привычки и запрос — от путешествий до
                    рабочей переписки.
                  </p>
                </div>
              </li>
              <li>
                <span className="method__num">02</span>
                <div>
                  <h3>Живая практика</h3>
                  <p>
                    Диалоги, слушание, короткие задания между уроками — без
                    перегруза и зубрёжки.
                  </p>
                </div>
              </li>
              <li>
                <span className="method__num">03</span>
                <div>
                  <h3>Заметный результат</h3>
                  <p>
                    Раз в несколько недель сверяем прогресс: что уже свободно,
                    что подтянуть дальше.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section className="section formats" id="formats">
          <div className="section__inner reveal" ref={formatsRef}>
            <p className="section__label">Форматы</p>
            <h2 className="section__title">Подстроимся под ваш ритм</h2>
            <p className="section__text">
              Выбирайте формат, который удобно держать — стабильность важнее
              интенсивных рывков.
            </p>
            <div className="formats__rows">
              <div className="formats__row">
                <h3>Онлайн</h3>
                <p>
                  Zoom или Google Meet, 55 минут. Материалы и обратная связь —
                  после каждого урока.
                </p>
              </div>
              <div className="formats__row">
                <h3>Очно</h3>
                <p>
                  Встречи в Москве в спокойном пространстве. Удобно, если легче
                  учиться «вживую».
                </p>
              </div>
              <div className="formats__row">
                <h3>Интенсив</h3>
                <p>
                  3–4 занятия в неделю перед экзаменом, переездом или важным
                  собеседованием.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section contact" id="contact">
          <div className="section__inner contact__layout reveal" ref={contactRef}>
            <div className="contact__aside">
              <p className="section__label">Запись</p>
              <h2 className="section__title">Начните с короткого знакомства</h2>
              <p className="section__text">
                Оставьте контакты — я напишу в течение дня, предложу время
                пробного урока и отвечу на вопросы.
              </p>
              <p>
                Или напишите сразу:{" "}
                <a href="mailto:hello@mira-english.ru">hello@mira-english.ru</a>
              </p>
            </div>

            <form className="form" onSubmit={onSubmit}>
              {sent ? (
                <p className="form__success" role="status">
                  Спасибо! Заявка принята — скоро свяжусь с вами, чтобы выбрать
                  время урока.
                </p>
              ) : (
                <>
                  <div className="form__grid form__grid--2">
                    <div className="field">
                      <label htmlFor="name">Имя</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        placeholder="Как к вам обращаться"
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="handle">Telegram или email</label>
                      <input
                        id="handle"
                        name="handle"
                        type="text"
                        required
                        placeholder="@username или mail@"
                      />
                    </div>
                  </div>
                  <div className="form__grid" style={{ marginTop: "1rem" }}>
                    <div className="field">
                      <label htmlFor="goal">Цель</label>
                      <select id="goal" name="goal" defaultValue="speaking">
                        <option value="speaking">Разговорный английский</option>
                        <option value="work">Работа и собеседования</option>
                        <option value="exam">Экзамен / тест</option>
                        <option value="restart">Вернуться после паузы</option>
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="message">Коротко о себе</label>
                      <textarea
                        id="message"
                        name="message"
                        placeholder="Уровень, удобное время, что важно на уроках"
                      />
                    </div>
                  </div>
                  <div className="form__footer">
                    <button className="btn btn--sea" type="submit">
                      Отправить заявку
                    </button>
                    <p className="form__note">
                      Пробный урок — 30 минут, без обязательств.
                    </p>
                  </div>
                </>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <strong>MIRA</strong>
        <span>Персональный английский · Москва и онлайн</span>
      </footer>
    </div>
  );
}

export default App;
