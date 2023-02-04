import ImageTextRecognizer from './components/FileUploader'
import './App.css'

function App() {
  return (
    <div className="App bg-slate-300 p-4 rounded-md h-full">
      <h1 className="text-3xl font-bold underline text-black mb-10">Image Text Recognition</h1>
      <ImageTextRecognizer />
    </div>
  )
}

export default App
