import { createMuiTheme } from '@material-ui/core/styles';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';

/**
 * Material UI theme settings
 */
const palette: PaletteOptions = {
  type: 'light',
};

export const APP_THEME = createMuiTheme({ palette });
