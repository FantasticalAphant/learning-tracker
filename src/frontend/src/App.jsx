import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {TopicsPage} from "./pages/TopicsPage";
import {NavigationBar} from "./components/NavigationBar.jsx";
import {ArticlesPage} from "./articles/ArticlesPage.jsx";
import {BooksPage} from "./books/BooksPage.jsx";

function App() {

  return (
    <>
        <NavigationBar/>
        <Router>
            <Routes>
                <Route path="/articles" element={<ArticlesPage />} />
                <Route path="/books" element={<BooksPage />} />
                <Route path="/topics" element={<TopicsPage />} />
            </Routes>
        </Router>
    </>
  )
}

export default App
