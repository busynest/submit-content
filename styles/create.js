//@ts-check

import { css } from 'lit-element';

export const Create = css`

  .snack {
    box-sizing:             border-box;
   /* height:           250px; */
    padding:            20px;
    background-color:   rgb(240,255,255);
    border:             4px var(--app-black-color) solid;
    border-radius:      8px;
  }

  .exit { display: grid; grid-template-columns: 24px 1fr 24px; }
  .exit > button        { margin: auto; }
  .exit > h3   { margin: 0px; text-align: center; }
  .create               { margin: 0px; }
  .exit > .remove {
    background-color:       transparent;
    border:                 0px;
    fill:                   red;
    height:                 24px;
    width:                  24px;
    padding:                0px;
  }
  .exit > .refresh {
    background-color:       transparent;
    border:                 0px;
    fill:                   blue;
    height:                 24px;
    width:                  24px;
    padding:                0px;
  }

  .navigation {
    display: grid;
    grid-template-columns: 1fr 1fr;
   }

  .project-action {
    display:              inline-block;
    margin:               auto;
    white-space:          nowrap;
    font-weight:          600;
    text-align:           center;
    vertical-align:       middle;
    touch-action:         manipulation;
    -webkit-appearance:   button;
    cursor:               pointer;
    font-size:            16px;
    height:               38px;
    line-height:          16px;
    width:                100%;
    padding:              10px 16px;
    border:               0px;
    background-color:     rgb(245,245,220);  /* #6cc04a */
    /* box-shadow:           inset 0px 3px 0px 0px navy, inset 0px -3px 0px 0px navy ; */
  }

`;