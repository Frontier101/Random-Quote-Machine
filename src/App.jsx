import './stylesheets/App.css'
import '/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Container from './components/container/Container'
import Filter from './components/filters/Filter'

function App() {
  return (
    <div 
      style={{
        height: '100vh', 
        maxHeight:'100vh'
      }} 
      className='
        d-flex flex-column 
        align-items-center 
        justify-content-center
      '
    >
      <Filter />
      <Container />
    </div>
  )
}

export default App
