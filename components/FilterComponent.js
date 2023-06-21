import React from "react";
// import { Form } from 'react-bootstrap';
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
const FilterComponent = ({
  type,
  heading,
  FilterType,
  onSelect,
  accessKey,
  Selectedfilter
}) => {
 

  return (
    <div className=" my-2 bg-light rounded ">
      <p className="my-0 ps-2 fw-bold" style={{color:"#0151c1"}}>{heading}</p>
      <div style={{height:"120px",overflow:"auto",padding:"0.5rem"}}>
      <FormControl
          size="small"
          className="rounded-lg"
        >
         
          <RadioGroup
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          value={Selectedfilter}
            onChange={onSelect}
          >
            {
                FilterType.map(s=>{
                    // console.log(s,accessKey)
                    return(
                        <FormControlLabel sx={{'& .MuiTypography-root':{
                            fontSize:14
                        }}}  value={s[`${accessKey}`]} control={<Radio size="small" sx={{
                            '& .MuiSvgIcon-root': {
                              fontSize: 14,
                            },
                          }}/>} label={s[`${accessKey}`]} />
                    )
                })
            }
          </RadioGroup>
        </FormControl>
        </div>
    </div>
  );
};

export default FilterComponent;
