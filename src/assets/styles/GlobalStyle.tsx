import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
*,
*::before,
*::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    font-size: 62.5%;
    scroll-behavior: smooth;
}

body {
    background-color: #fff;
    color: #232323;
    font-family: 'Montserrat', sans-serif;
    font-size: 1.6rem;
    line-height: 1.5;
	overflow-x: hidden;
}

img {
    vertical-align: middle;
}

a,
button, select {
    cursor: pointer;
    font-family: inherit;
}

a {
    text-decoration: none;
    color: inherit;
}

input {
    font-family: inherit;
}

table {
    border-spacing: 0;
    border-collapse: collapse;
}
`;
