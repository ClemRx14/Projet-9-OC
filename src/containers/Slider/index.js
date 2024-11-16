import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );
  const nextCard = () => {
    setTimeout(
      // Eviter que l'index dépasse le nombres de projets en ajoutant - 1.

      () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
      5000
    );
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          // Fermer le premier map pour eviter que event soit déclarer deux fois et qu'il n'y ait pas de conflits dans les map.
      ))} 
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {/* Ajout du paramètre event car il n'y avait que _ et ajout du ? apres byDateDesc */}
              {byDateDesc?.map((event, radioIdx) => (
                <input
                // Pas d'id c'est pourquoi plutot choisir le titre qui est unique selon les projets. 
                  key={event.title}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  // Enlever l'erreur de la console dû au checked en ajoutant la propriété readOnly.
                  readOnly
                />
              ))}
            </div>
          </div>
    </div>
  );
};

export default Slider;