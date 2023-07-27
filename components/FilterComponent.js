import React,{useState} from "react";
// import { Form } from 'react-bootstrap';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormHelperText,
  Typography,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  Radio,
  Box,
  Slider,
} from "@mui/material";


import Collapse from 'react-bootstrap/Collapse';
import Classes from "/styles/filter.module.css";
const FilterComponent = ({
  type,
  heading,
  FilterType,
  onSelect,
  accessKey,
  Selectedfilter,
}) => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <div className=" my-2 bg-light rounded ">
      <div className={Classes.filterdropdownline}
        onClick={toggleDropdown} // Toggle the dropdown on click
        >

      <p
        className="my-0 ps-2 fw-bold"
        style={{ color: "#0151c1", cursor: "pointer" }}
      >
        {heading}
      </p>
      <span ><ArrowDropDownCircleIcon/></span>
      </div>

      <div className={`${Classes.filterdropdown} ${isDropdownOpen?Classes.show:""}`} >
          <FormControl size="small" className="rounded-lg">
            <RadioGroup
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={Selectedfilter}
              onChange={onSelect}
            >
              {FilterType.map((s, i) => {
                // console.log(s,accessKey)
                return (
                  <FormControlLabel
                    key={i}
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: 14,
                      },
                    }}
                    value={s[`${accessKey}`]}
                    control={
                      <Radio
                        size="small"
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: 14,
                          },
                        }}
                      />
                    }
                    label={s[`${accessKey}`]}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        </div>
    </div>
  );
};

export default FilterComponent;
