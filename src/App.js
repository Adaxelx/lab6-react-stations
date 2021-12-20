import React, { useState } from "react";
import "./styles.css";
import { DataSet } from "./data.js";

function Field({
  color = "black",
  editable = false,
  value,
  onChange,
  label,
  id,
}) {
  // Nie rozumiem sensu zadania 1 - skoro stan value komponentu Field jest trzymany tutaj to i tak trzeba go wyciągnąć zeby zachować stan między przejściami. Gdy nie chcemy zachowywać stanu między przejściami - wtedy ma to sens
  // useState()
  var onLocalChange = () => {};

  return (
    <li>
      <span>{label}:</span>
      <span>
        <input
          type="text"
          readOnly={!editable}
          value={value}
          onChange={onChange}
          id={id}
          style={{ color }}
        />
      </span>
    </li>
  );
}

const handleColorPick = (expected, received) =>
  received - expected > 0 ? "black" : "red";

const Station = ({ station, onChangedValue }) => {
  return (
    <div className="details">
      <form>
        <ul>
          <Field label="Identyfikator" value={station.name} />
          <Field label="Data pomiaru" value={station.date} />
          <Field label="Oczekiwana" value={station.expected} />
          <Field
            label="Zmierzona"
            value={station.value}
            editable={true}
            onChange={(e) => {
              onChangedValue(e.target.value);
            }}
          />
          <Field
            label="Różnica"
            color={handleColorPick(station.expected, station.value)}
            value={station.value - station.expected || "-"}
          />
        </ul>
      </form>
    </div>
  );
};

// kontroler zarządzający

const useStations = (defaultStations = []) => {
  const [stations, setStations] = useState(defaultStations);
  const [selected, setSelected] = useState();

  const handleSelect = (e) =>
    setSelected(
      stations.find((station) => station.id === parseInt(e.target.value))
    );

  const onChangeStation = (value) => {
    const newSelected = { ...selected, value: parseInt(value) || 0 };
    setSelected(newSelected);
    setStations((prevStations) => {
      const val = [...prevStations].map((station) => {
        return station.id === selected.id ? newSelected : station;
      });
      return val;
    });
  };
  return { handleSelect, onChangeStation, stations, selected };
};

export const Form = () => {
  const { handleSelect, onChangeStation, stations, selected } = useStations(
    DataSet.stations
  );

  return (
    <div className="App">
      <div className="container">
        <h1>Pokaz kontroli stanu</h1>
        <div className="row">
          <div className="col-4">
            <select
              className="stations"
              name="stations"
              onChange={handleSelect}
              multiple
            >
              {stations.map((s) => {
                return (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-4">
            {selected ? (
              <Station station={selected} onChangedValue={onChangeStation} />
            ) : (
              <div>Wybierz stację...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
