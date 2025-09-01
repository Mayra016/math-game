import LinearProgress from '@mui/material/LinearProgress';

function ProgressBar({ value }) {
  return <LinearProgress variant="determinate" value={value} />;
}
export default ProgressBar;