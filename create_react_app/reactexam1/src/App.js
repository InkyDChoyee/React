import './App.css';
import Container from './Container';
import Counter from './Counter';

import MyHeader from './MyHeader';

function App() {

  const counterProps = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    initialValue: 5,
  };

  return (
    <Container>
    <div>
      <MyHeader />
      {/* <Counter a={1} b={2} c={3} d={4} e={5} initialValue={5}/> */}
      <Counter {...counterProps}/>
    </div>
    </Container>
  );
}

export default App;
