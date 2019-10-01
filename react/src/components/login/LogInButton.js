import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = {
   root: {
      marginLeft: 5
   }
};
const SpinnerAdornment = withStyles(styles)(props => (
   <CircularProgress className={props.classes.spinner} size={20} />
));

export default ({
   isLoading,
   text,
   loadingText,
   className = '',
   disabled = false,
   ...props
}) => (
   <Button
      className={'LoaderButton ${className}'}
      disabled={disabled || isLoading}
      {...props}
   >
      {isLoading && <SpinnerAdornment />}
      {!isLoading ? text : loadingText}
   </Button>
);
