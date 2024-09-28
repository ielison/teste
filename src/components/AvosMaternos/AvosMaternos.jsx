import { useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { cancerOptions } from "../../data/cancerOptions";
import { ageOptions } from "../../data/ageOptions";
import "./AvosMaternos.css";

export default function AvosMaternos({ onClose, onBack, onAdvance }) {
  const [noKnowledge, setNoKnowledge] = useState(false);
  const [grandmotherHadCancer, setGrandmotherHadCancer] = useState(false);
  const [grandfatherHadCancer, setGrandfatherHadCancer] = useState(false);
  const [grandmotherCancerDetails, setGrandmotherCancerDetails] = useState({
    type: null,
    age: "",
    showAgeDropdown: false,
  });
  const [grandfatherCancerDetails, setGrandfatherCancerDetails] = useState({
    type: null,
    age: "",
    showAgeDropdown: false,
  });

  // State to hold additional cancer details for grandmother and grandfather
  const [additionalGrandmotherCancer, setAdditionalGrandmotherCancer] =
    useState([]);
  const [additionalGrandfatherCancer, setAdditionalGrandfatherCancer] =
    useState([]);

  const handleNoKnowledgeChange = () => {
    setNoKnowledge((prev) => !prev);
    // Clear cancer details if selecting "Não tenho conhecimento"
    if (!noKnowledge) {
      setGrandmotherHadCancer(false);
      setGrandfatherHadCancer(false);
      setGrandmotherCancerDetails({
        type: null,
        age: "",
        showAgeDropdown: false,
      });
      setGrandfatherCancerDetails({
        type: null,
        age: "",
        showAgeDropdown: false,
      });
      setAdditionalGrandmotherCancer([]); // Clear additional cancer fields
      setAdditionalGrandfatherCancer([]); // Clear additional cancer fields
    }
  };

  const handleNoGrandparentsCancerChange = () => {
    setGrandmotherHadCancer(false);
    setGrandfatherHadCancer(false);
    setNoKnowledge(false); // Reset knowledge if this option is selected
  };

  const handleAgeToggle = (setDetails) => {
    setDetails((prev) => ({
      ...prev,
      showAgeDropdown: !prev.showAgeDropdown,
    }));
  };

  const handleBackClick = () => {
    console.log("Back button clicked");
    onBack();
  };

  const handleAdvanceClick = () => {
    console.log("Advance button clicked");
    onAdvance();
  };

  // Function to add more cancer fields for grandmother
  const addMoreGrandmotherCancer = () => {
    setAdditionalGrandmotherCancer((prev) => [
      ...prev,
      { type: null, age: "", showAgeDropdown: false },
    ]);
  };

  // Function to add more cancer fields for grandfather
  const addMoreGrandfatherCancer = () => {
    setAdditionalGrandfatherCancer((prev) => [
      ...prev,
      { type: null, age: "", showAgeDropdown: false },
    ]);
  };

  // Handle "Não sei" button click for additional grandmother cancer age
  const handleAdditionalGrandmotherAgeToggle = (index) => {
    const newDetails = [...additionalGrandmotherCancer];
    newDetails[index].showAgeDropdown = !newDetails[index].showAgeDropdown;
    setAdditionalGrandmotherCancer(newDetails);
  };

  // Handle "Não sei" button click for additional grandfather cancer age
  const handleAdditionalGrandfatherAgeToggle = (index) => {
    const newDetails = [...additionalGrandfatherCancer];
    newDetails[index].showAgeDropdown = !newDetails[index].showAgeDropdown;
    setAdditionalGrandfatherCancer(newDetails);
  };

  return (
    <div className="avosm-modal-overlay" onClick={onClose}>
      <div className="avosm-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="avosm-form-container">
          <div className="avosm-header">
            <h2 className="dfm-title">Etapa 2 - Avós Maternos</h2>
            <button className="avosm-close-button" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="avosm-grupo">
            <label className="avosm-label">
              Os seus avós maternos já tiveram câncer?
              <div className="avosm-checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={grandmotherHadCancer}
                    onChange={() =>
                      setGrandmotherHadCancer(!grandmotherHadCancer)
                    }
                    className="avosm-checkbox"
                  />
                  Minha avó teve câncer
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={grandfatherHadCancer}
                    onChange={() =>
                      setGrandfatherHadCancer(!grandfatherHadCancer)
                    }
                    className="avosm-checkbox"
                  />
                  Meu avô teve câncer
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      !grandmotherHadCancer &&
                      !grandfatherHadCancer &&
                      !noKnowledge
                    }
                    onChange={handleNoGrandparentsCancerChange}
                    className="avosm-checkbox"
                  />
                  Nenhum dos meus avós maternos foram acometidos
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={noKnowledge}
                    onChange={handleNoKnowledgeChange}
                    className="avosm-checkbox"
                  />
                  Não tenho conhecimento da saúde dos meus avós maternos
                </label>
              </div>
            </label>

            {!noKnowledge && (
              <>
                {grandmotherHadCancer && (
                  <>
                    <label className="avosm-label">
                      Tipo de câncer da minha avó:
                      <Select
                        placeholder="Selecione o tipo de câncer"
                        options={cancerOptions}
                        value={grandmotherCancerDetails.type}
                        onChange={(selectedOption) =>
                          setGrandmotherCancerDetails((prev) => ({
                            ...prev,
                            type: selectedOption,
                          }))
                        }
                        className="avosm-select"
                      />
                    </label>
                    <label className="avosm-label">
                      Idade
                      {grandmotherCancerDetails.showAgeDropdown ? (
                        <Select
                          options={ageOptions}
                          value={grandmotherCancerDetails.age}
                          onChange={(selectedOption) =>
                            setGrandmotherCancerDetails((prev) => ({
                              ...prev,
                              age: selectedOption,
                            }))
                          }
                          className="avosm-select"
                        />
                      ) : (
                        <input
                          type="number"
                          value={grandmotherCancerDetails.age}
                          onChange={(e) =>
                            setGrandmotherCancerDetails((prev) => ({
                              ...prev,
                              age: e.target.value,
                            }))
                          }
                          className="avosm-input"
                        />
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          handleAgeToggle(setGrandmotherCancerDetails)
                        }
                        className="avosm-toggle-button"
                      >
                        {grandmotherCancerDetails.showAgeDropdown
                          ? "Digitar idade"
                          : "Não sei"}
                      </button>
                    </label>

                    {/* Render additional cancer fields for grandmother */}
                    {additionalGrandmotherCancer.map((details, index) => (
                      <div key={index}>
                        <label className="avosm-label">
                          Tipo de câncer adicional da minha avó:
                          <Select
                            placeholder="Selecione o tipo de câncer"
                            options={cancerOptions}
                            value={details.type}
                            onChange={(selectedOption) => {
                              const newDetails = [
                                ...additionalGrandmotherCancer,
                              ];
                              newDetails[index].type = selectedOption;
                              setAdditionalGrandmotherCancer(newDetails);
                            }}
                            className="avosm-select"
                          />
                        </label>
                        <label className="avosm-label">
                          Idade
                          {details.showAgeDropdown ? (
                            <Select
                              options={ageOptions}
                              value={details.age}
                              onChange={(selectedOption) => {
                                const newDetails = [
                                  ...additionalGrandmotherCancer,
                                ];
                                newDetails[index].age = selectedOption;
                                setAdditionalGrandmotherCancer(newDetails);
                              }}
                              className="avosm-select"
                            />
                          ) : (
                            <input
                              type="number"
                              value={details.age}
                              onChange={(e) => {
                                const newDetails = [
                                  ...additionalGrandmotherCancer,
                                ];
                                newDetails[index].age = e.target.value;
                                setAdditionalGrandmotherCancer(newDetails);
                              }}
                              className="avosm-input"
                            />
                          )}
                          <button
                            type="button"
                            onClick={() =>
                              handleAdditionalGrandmotherAgeToggle(index)
                            }
                            className="avosm-toggle-button"
                          >
                            {details.showAgeDropdown
                              ? "Digitar idade"
                              : "Não sei"}
                          </button>
                        </label>
                      </div>
                    ))}
                    {/* Button to add more cancer information for grandmother */}
                    <button
                      type="button"
                      onClick={addMoreGrandmotherCancer}
                      className="avosm-add-button"
                    >
                      Informar+
                    </button>
                  </>
                )}

                {grandfatherHadCancer && (
                  <>
                    <label className="avosm-label">
                      Tipo de câncer do meu avô:
                      <Select
                        placeholder="Selecione o tipo de câncer"
                        options={cancerOptions}
                        value={grandfatherCancerDetails.type}
                        onChange={(selectedOption) =>
                          setGrandfatherCancerDetails((prev) => ({
                            ...prev,
                            type: selectedOption,
                          }))
                        }
                        className="avosm-select"
                      />
                    </label>
                    <label className="avosm-label">
                      Idade
                      {grandfatherCancerDetails.showAgeDropdown ? (
                        <Select
                          options={ageOptions}
                          value={grandfatherCancerDetails.age}
                          onChange={(selectedOption) =>
                            setGrandfatherCancerDetails((prev) => ({
                              ...prev,
                              age: selectedOption,
                            }))
                          }
                          className="avosm-select"
                        />
                      ) : (
                        <input
                          type="number"
                          value={grandfatherCancerDetails.age}
                          onChange={(e) =>
                            setGrandfatherCancerDetails((prev) => ({
                              ...prev,
                              age: e.target.value,
                            }))
                          }
                          className="avosm-input"
                        />
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          handleAgeToggle(setGrandfatherCancerDetails)
                        }
                        className="avosm-toggle-button"
                      >
                        {grandfatherCancerDetails.showAgeDropdown
                          ? "Digitar idade"
                          : "Não sei"}
                      </button>
                    </label>

                    {/* Render additional cancer fields for grandfather */}
                    {additionalGrandfatherCancer.map((details, index) => (
                      <div key={index}>
                        <label className="avosm-label">
                          Tipo de câncer adicional do meu avô:
                          <Select
                            placeholder="Selecione o tipo de câncer"
                            options={cancerOptions}
                            value={details.type}
                            onChange={(selectedOption) => {
                              const newDetails = [
                                ...additionalGrandfatherCancer,
                              ];
                              newDetails[index].type = selectedOption;
                              setAdditionalGrandfatherCancer(newDetails);
                            }}
                            className="avosm-select"
                          />
                        </label>
                        <label className="avosm-label">
                          Idade
                          {details.showAgeDropdown ? (
                            <Select
                              options={ageOptions}
                              value={details.age}
                              onChange={(selectedOption) => {
                                const newDetails = [
                                  ...additionalGrandfatherCancer,
                                ];
                                newDetails[index].age = selectedOption;
                                setAdditionalGrandfatherCancer(newDetails);
                              }}
                              className="avosm-select"
                            />
                          ) : (
                            <input
                              type="number"
                              value={details.age}
                              onChange={(e) => {
                                const newDetails = [
                                  ...additionalGrandfatherCancer,
                                ];
                                newDetails[index].age = e.target.value;
                                setAdditionalGrandfatherCancer(newDetails);
                              }}
                              className="avosm-input"
                            />
                          )}
                          <button
                            type="button"
                            onClick={() =>
                              handleAdditionalGrandfatherAgeToggle(index)
                            }
                            className="avosm-toggle-button"
                          >
                            {details.showAgeDropdown
                              ? "Digitar idade"
                              : "Não sei"}
                          </button>
                        </label>
                      </div>
                    ))}
                    {/* Button to add more cancer information for grandfather */}
                    <button
                      type="button"
                      onClick={addMoreGrandfatherCancer}
                      className="avosm-add-button"
                    >
                      Informar+
                    </button>
                  </>
                )}
              </>
            )}
          </div>
          <div className="avosm-buttons">
            <button className="avosm-button" onClick={handleBackClick}>
              Voltar
            </button>
            <button className="avosm-button" onClick={handleAdvanceClick}>
              Avançar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

AvosMaternos.propTypes = {
  onClose: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onAdvance: PropTypes.func.isRequired,
};
