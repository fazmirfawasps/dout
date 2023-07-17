import React from 'react';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
const SearchContainer = styled('div')({
  position: 'relative',
  borderRadius: '20px',
  backgroundColor: '#f2f2f2',
  width: '400px', // Increase the width as desired
  height: '40px', // Increase the height as desired
  display: 'flex',
  alignItems: 'center',
});

const SearchInput = styled(InputBase)({
  paddingLeft: '30px',
});

const SearchIconWrapper = styled('div')({
  position: 'absolute',
  left: '10px',
  color: '#666',
});

const SearchInputField = ({ Handlesearch }) => {
  const handleChange = (event) => {
    const searchTerm = event.target.value;
    Handlesearch(searchTerm);
  };
  
  return (
    <SearchContainer>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <SearchInput
        placeholder="Search..."
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleChange}
      />
    </SearchContainer>
  );
};
SearchInputField.propTypes = {
  Handlesearch: PropTypes.func.isRequired,
};
export default SearchInputField;
