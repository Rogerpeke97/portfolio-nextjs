// pages/_document.js

import { ColorModeScript } from '@chakra-ui/react'
import { Html, Head, Main, NextScript } from 'next/document'
import { useEffect } from 'react'
import theme from '../styles/theme'

const Document = () => {
  return (
    <Html lang='en'>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet='utf-8' />
        <meta name="title" property="og:title" content="Ignacio Martin Diaz's Portfolio Website" />
        <meta name="type" property="og:type" content="Portfolio" />
        <meta name="url" property="og:url" content="https://ignaciodiaz.io/" />
        <meta name="image" property="og:image" content="https://imgur.com/a/9TwIMro" />
        <title>Ignacio Martin Diaz - Software Developer</title>
        <link href="https://fonts.googleapis.com/css2?family=Silkscreen&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document