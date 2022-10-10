import { createGlobalStyle } from 'styled-components'

import { flexColCenter } from './common.styles'

export const GlobalStyles = createGlobalStyle`
    :root{}

    html,
    body {
        scroll-behavior: smooth;
    }

    body{
        padding: 0;
        margin: 0;
        background-color: #80808040;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
        'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }


    a {
        color: inherit;
        text-decoration: none;
        transition: all ease 0.2s;
        font-weight: 500;
    }

    b, strong {
        font-family: inherit;
        font-weight: 600;
    }

    ul{
        margin: 0;
        padding: 0;
        list-style-type: none;
    }

    hr{
        margin: 0;
        padding: 0;
    }

    .app{
        min-height: 100vh;
        ${flexColCenter}
    }

`
