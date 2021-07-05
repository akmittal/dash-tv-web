
import { extendTheme, ColorMode } from "@chakra-ui/react"
const defaultMode:ColorMode = "dark"

const config = {
  initialColorMode: defaultMode,
  useSystemColorMode: true,
}
// 3. extend the theme
const theme = extendTheme({ config })
export default theme;