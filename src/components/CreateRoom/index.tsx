import React, { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { RoomsService } from "../../services/Rooms/RommsService";

const CreateRoom = () => {
  const initialFormData = Object.freeze({
    sessionName: "",
    numberOfQuestions: 0,
    numberOfGroups: 0,
    numberOfChallengers: 0,
    cards: false,
    studentsHelp: false,
    skips: false,
    audienceHelp: false,
    sessionId: 0,
    createdIn: "",
  });

  let navigate = useNavigate();
  const routeChange = () => {
    navigate("/");
  };

  const [formData, updateFormData] = useState(initialFormData);
  const [fieldDisabled, setFieldDiseabled] = useState(true);
  const [saveDiseabled, setSaveDiseabled] = useState(true);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    RoomsService.create(formData);
    routeChange();
  };

  const handleChangeGroups = (e: any) => {
    const totalQuestions =
      Number(formData.numberOfChallengers) * Number(formData.numberOfQuestions);
    if (
      formData.numberOfChallengers != null &&
      formData.numberOfQuestions != null
    ) {
      if (
        totalQuestions % e.target.value === 0 &&
        e.target.value < totalQuestions
      ) {
        updateFormData({
          ...formData,
          [e.target.name]: e.target.value.trim(),
        });
      } else {
        let list: number[] = [];
        for (let i = 0; i < totalQuestions; i++) {
          if (totalQuestions % i === 0) list.push(i);
        }
        alert("Número de grupos inviável, possíveis opções são: " + list);
        e.target.value = null;
      }
    }
  };

  useEffect(() => {
    if (
      formData.sessionName != "" &&
      formData.numberOfGroups != 0 &&
      formData.numberOfChallengers != 0 &&
      formData.numberOfQuestions != 0
    ) {
      setSaveDiseabled(false);
    } else {
      setSaveDiseabled(true);
    }
  }, [formData]);

  useEffect(() => {
    if (
      formData.numberOfChallengers != null &&
      formData.numberOfChallengers != 0 &&
      formData.numberOfQuestions != null &&
      formData.numberOfQuestions != 0
    ) {
      setFieldDiseabled(false);
    } else {
      var gp = document.getElementById("numberOfGroups") as HTMLInputElement;
      if (gp != null) {
        gp.value = "";
      }
      updateFormData({
        ...formData,
        numberOfGroups: 0,
      });
      setFieldDiseabled(true);
    }
    console.log(formData);
  }, [formData.numberOfChallengers, formData.numberOfQuestions]);

  const handleChangeCheckbox = (e: any) => {
    let boo: boolean = false;
    if (e.target.checked) {
      boo = true;
    }
    updateFormData({
      ...formData,
      [e.target.name]: boo,
    });
  };

  const handleChangeName = (e: any) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleChangeQuestionsChallengers = (e: any) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
      numberOfGroups: 0,
    });
    var gp = document.getElementById("numberOfGroups") as HTMLInputElement;
    if (gp != null) {
      gp.value = "";
    }
  };

  return (
    <>
      <div className="creation-content">
        <form>
          <div className="box-text-input">
            <label>
              Nome da Sala
              <input
                type="text"
                className="input-text"
                name="sessionName"
                onChange={handleChangeName}
              />
            </label>

            <label>
              Número de Perguntas por Desafiante
              <input
                type="number"
                min={1}
                className="input-text"
                name="numberOfQuestions"
                onChange={handleChangeQuestionsChallengers}
              />
            </label>
            <label>
              Número de Desafiantes
              <input
                type="number"
                min={1}
                className="input-text"
                name="numberOfChallengers"
                onChange={handleChangeQuestionsChallengers}
              />
            </label>
            <label>
              Número de Grupos
              <input
                type="number"
                min={1}
                className="input-text"
                name="numberOfGroups"
                id="numberOfGroups"
                onChange={handleChangeGroups}
                disabled={fieldDisabled}
              />
            </label>
          </div>

          <div className="box-toggle-input">
            <label>
              Cartas
              <input
                type="checkbox"
                className="input-toggle"
                name="cards"
                onChange={handleChangeCheckbox}
                disabled={true}
              />
            </label>
            <label>
              Ajuda dos Universitários
              <input
                type="checkbox"
                className="input-toggle"
                name="studentsHelp"
                onChange={handleChangeCheckbox}
                disabled={true}
              />
            </label>
            <label>
              Ajuda da Audiência
              <input
                type="checkbox"
                className="input-toggle"
                name="audienceHelp"
                onChange={handleChangeCheckbox}
                disabled={true}
              />
            </label>
            <label>
              Pular
              <input
                type="checkbox"
                className="input-toggle"
                name="skips"
                onChange={handleChangeCheckbox}
                disabled={true}
              />
            </label>
          </div>
          <button
            type="button"
            disabled={saveDiseabled}
            onClick={($event) => handleSubmit($event)}
          >
            Salvar
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateRoom;
