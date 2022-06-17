import React from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import styles from "./StateSelector.module.css";

interface Props {
  nameList: string[],
  handleNameChange: (name: string) => Promise<void>;
}

const StateSelector = ({
  nameList,
  handleNameChange
}: Props) => {
  return (
    <FormControl className= {styles.formControl}>
      <NativeSelect
        defaultValue=""
        onChange={(e) => handleNameChange(e.target.value)}
      >
        {nameList.map((name, key) => (
          <option key={key} value={name}>
            {name}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default StateSelector;