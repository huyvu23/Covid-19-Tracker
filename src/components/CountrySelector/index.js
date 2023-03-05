import {
  FormControl,
  FormHelperText,
  InputLabel,
  NativeSelect,
} from "@material-ui/core";
import React from "react";

function CountrySelector({ value, handleOnChanges, countries }) {
  return (
    <>
      <FormControl>
        <InputLabel htmlFor="country-selector" shrink>
          Quốc gia
        </InputLabel>
        <NativeSelect
          value={value}
          onChange={handleOnChanges}
          inputProps={{
            name: "country",
            id: "country-selector",
          }}
        >
          {countries.map(({ Country, ISO2 }) => (
            <option key={ISO2} value={ISO2.toLowerCase()}>
              {Country}
            </option>
          ))}
        </NativeSelect>
        <FormHelperText>Lựa chọn quốc gia</FormHelperText>
      </FormControl>
    </>
  );
}

export default CountrySelector;
