import React from 'react';
import './App.css';

import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

import Data from './data.json';

const Description = ({abbreviation, text}) => (
  <div style={{display: 'flex',  marginBottom: 25}}>
    <Typography color="textSecondary" variant="h5" style={{minWidth: 50, marginRight: 15}}>{abbreviation}</Typography>
    <Typography variant="h5">{text}</Typography>
  </div>
)

const calculateObjectiveProgress = krs =>
  krs.map(kr => kr.current / kr.goal).reduce((total, each) => total + each)/krs.length

const App = () => {
  const { title, okrs } = Data;
  const normalise = (value, min, max) => (value - min) * 100 / (max - min);
  return (
    <div style={{maxWidth: 1000, margin: '0 auto'}}>
      <Typography variant="h2" style={{margin:50, textAlign: 'center'}}>{title}</Typography>
      {okrs.map(okr => {
        return (
          <Paper key={okr.objective} style={{margin: 50, padding: 20}} elevation={5}>
            <Description text={okr.objective} abbreviation="O" />
            <LinearProgress variant="determinate" value={normalise(calculateObjectiveProgress(okr.krs), 0, 1)} />
            <Typography color="textSecondary" variant="h6" style={{textAlign: 'center', marginTop: 10}}>{`${(calculateObjectiveProgress(okr.krs) * 100).toFixed()} %`}</Typography>
            {okr.krs.map(kr => (
              <div key={kr.keyResult} style={{margin: '50px 0'}}>
                <Description abbreviation="KR" text={kr.keyResult} />
                <LinearProgress variant="determinate" value={normalise(kr.current, 0, kr.goal)} />
                <Typography color="textSecondary" variant="h6" style={{textAlign: 'center', marginTop: 10}}>{kr.suffix === '%' ? `${100 * kr.current/kr.goal} %` : `${kr.current}/${kr.goal} ${kr.suffix}`}</Typography>
              </div>
            ))}
          </Paper>
        );
      })}
    </div>
  );
}

export default App;
