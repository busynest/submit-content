
//@ts-check

import { css } from 'lit-element';

export const Forms = css`

  form {
    box-sizing:         border-box;
  }

  input.invalid {
    background-color: #ffdddd;
  }

  input[type=text], select {
    box-sizing:         border-box;
    width:              100%;
    padding:            8px 16px;
    border-radius:      4px;
    background-color:   rgba(228, 241, 254, 1);
    border:             1px #ccc solid;
    border-bottom:      2px var(--app-black-color) solid;
    border-radius:      5px;
  }

  select { /* text-align-last: center; */ }

  input[type=submit] {
    box-sizing:         border-box;
    width:              100%;
    background-color:   #4CAF50;
    color:              white;
    padding:            14px 20px;
    margin:             8px 0;
    border:             none;
    border-radius:      4px;
    cursor:             pointer;
  }

  input[type=submit]:hover {
    background-color:   #45a049;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  /* fieldset {
    border-radius:      8px;
    box-sizing:         border-box;
  } */

`;