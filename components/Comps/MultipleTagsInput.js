import React, { Component } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";

class MultipleTagsInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValues: [],
    };
  }

  handleTagDelete = (index) => {
    const newSelectedValues = [...this.state.selectedValues];
    newSelectedValues.splice(index, 1);
    this.setState({ selectedValues: newSelectedValues });
    this.props.onChange(newSelectedValues); // Notify parent about the change
  };

  handleTagAdd = (value) => {
    this.setState((prevState) => ({
      selectedValues: [...prevState.selectedValues, value],
    }));
    this.props.onChange([...this.state.selectedValues, value]); // Notify parent about the change
  };

  renderTags = () => {
    return this.state.selectedValues.map((value, index) => (
      <Chip
        key={index}
        label={value}
        onDelete={() => this.handleTagDelete(index)}
      />
    ));
  };

  componentDidUpdate(prevProps){
    if(prevProps.value != this.props.value){
        this.setState({selectedValues:this.props.value})
    }

  }

  render() {
    return (
      <Autocomplete
        clearIcon={false}
        options={[]}
        freeSolo
        multiple
        style={{ background: "#fff" }}
        value={this.state.selectedValues}
        onChange={(event, newValue) =>
          this.handleTagAdd(newValue[newValue.length - 1])
        }
        renderTags={this.renderTags}
        renderInput={(params) => (
          <TextField
            placeholder={this.props.placeholder}
            label={this.props.label}
            {...params}
            required={this.props.required && this.state.selectedValues.length === 0}
          />
        )}
      />
    );
  }
}

export default MultipleTagsInput;
