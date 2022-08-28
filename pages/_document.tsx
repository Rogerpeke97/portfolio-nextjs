// pages/_document.js

import { ColorModeScript } from '@chakra-ui/react'
import { Html, Head, Main, NextScript } from 'next/document'
import { useEffect } from 'react'
import theme from '../styles/theme'

const Document = () => {
  return (
    <Html lang='en'>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Silkscreen&display=swap" rel="stylesheet" />
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