import FileRecognizer from './components/FileUploader'
import './App.css'

function App() {
  return (
    <div className="App try">
      <h1 className="text-2xl font-bold underline mb-10">Image Text Recognition</h1>
      <FileRecognizer />
    </div>
  )
}

export default App
