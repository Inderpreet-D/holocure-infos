import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Idol } from "@/models/Idol";
import { Box, Sprite2 } from "@/components";
import { useIdolsStore } from "@/stores/idolsStore";
import { useSpriteOffsetsStore } from "@/stores/spritesStore";
import { getHighlightedElements } from "@/utils/getHighlightedElements";
import { IdolGenerations } from "./IdolGenerations/IdolGenerations";
import { IdolStats } from "./IdolStats/IdolStats";


import "./IdolsPage.scss"

export const IdolsPage = () => {
  const routeParams = useParams<{ idolId: string }>();
  const navigate = useNavigate();
  const [selectedIdol, setSelectedIdol] = useState<Idol>();
  const [loaded, idols, loadIdols, getIdolById] = useIdolsStore(state => [
    state.loaded,
    state.idols,
    state.loadIdols,
    state.getIdolById,
  ]);
  const getSpriteSheet = useSpriteOffsetsStore(state => state.getSpriteSheet);
  const skillsSpriteSheet = getSpriteSheet('skills');

  useEffect(() => {
    loadIdols();
  }, [])

  useEffect(() => {
    if (loaded) {
      const idol = getIdolById(routeParams.idolId || '');
      if (!idol) {
        return navigate(idols[0]?.id);
      }

      setSelectedIdol(idol)
    }
  }, [routeParams, idols]);

  const handleIdolSelected = (idol: Idol): void => {
    navigate(idol.id);
  }

  if (!loaded) {
    return null;
  }

  return (
    <div className="idols-page flex-row content-container">
      <div className="sticky-section flex-column">
        <IdolStats idol={selectedIdol} />
        <IdolGenerations selectedIdol={selectedIdol} onSelected={handleIdolSelected} />
      </div>

      <div className="selected-idol-details flex-column flex-fill">
        <Box label="Attack" className="attack">
          <div className="skill-name flex-row align-x-center">
            {selectedIdol && (
              <Sprite2
                spriteSheet={skillsSpriteSheet}
                name={selectedIdol.attack.name}
                showBackground={false}
              />
            )}
            {selectedIdol?.attack.name}
          </div>

          <table className="info-table">
            <tbody>
              {selectedIdol?.attack.levels.map(level => (
                <tr key={level.level}>
                  <td className="name">Level {level.level}</td>
                  <td>{level.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>

        <Box label="Special" className="special">
          <div className="skill-name flex-row align-x-center">
            {selectedIdol && (
              <Sprite2
                spriteSheet={skillsSpriteSheet}
                name={selectedIdol.special.name}
                showBackground={false}
              />
            )}
            {selectedIdol?.special.name}
          </div>

          <div className="desc">{selectedIdol?.special.desc}</div>
        </Box>

        <Box label="Skills" className="skills">
          {selectedIdol?.skills.map(skill => (
            <React.Fragment key={skill.name}>
              <div className="skill-name flex-row align-x-center">
                {selectedIdol && (
                  <Sprite2
                    spriteSheet={skillsSpriteSheet}
                    name={skill.name}
                    showBackground={false}
                  />
                )}
                {skill.name}
              </div>

              <table className="info-table">
                <tbody>
                  {skill.levels.map(level => {
                    return (
                      <tr key={level.level}>
                        <td className="name">Level {level.level}</td>
                        <td>{getHighlightedElements(level.desc)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </React.Fragment>
          ))}
        </Box>
      </div>
    </div>
  )
}