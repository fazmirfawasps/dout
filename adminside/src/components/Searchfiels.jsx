import React from 'react';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const SearchContainer = styled('div')({
  position: 'relative',
  borderRadius: '20px',
  backgroundColor: '#f2f2f2',
  width: '300px',
  height:'30px',
  textAlign:'center'
});

const SearchInput = styled(InputBase)({
  paddingLeft: '20px',
});

const SearchIconWrapper = styled('div')({
  position: 'absolute',
  top: '60%',
  left: '10px',
  transform: 'translateY(-50%)',
  color: '#666',
});

const SearchInputField = ({Handlesearch}) => {
    const handleChange = (event) => {
        const searchTerm = event.target.value;
        Handlesearch(searchTerm);
      };
  return (
    <SearchContainer>
      <SearchInput
        placeholder="Search..."
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleChange}
      />
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
    </SearchContainer>
  );
};

export default SearchInputField;
