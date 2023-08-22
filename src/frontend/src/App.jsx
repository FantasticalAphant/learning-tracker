import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {TopicsPage} from "./topics/TopicsPage.jsx";
import {NavigationBar} from "./components/NavigationBar.jsx";
import {ArticlesPage} from "./articles/ArticlesPage.jsx";
import {BooksPage} from "./books/BooksPage.jsx";
import {VideosPage} from "./videos/VideosPage.jsx";
import {BooksLibraryPage} from "./books/BooksLibraryPage.jsx";
import {IndividualTopicPage} from "./topics/IndividualTopicPage.jsx";

function App() {

  return (
    <>
        <NavigationBar/>
        <Router>
            <Routes>
                <Route path="/articles" element={<ArticlesPage />} />
                <Route path="/books" element={<BooksPage />} />
                <Route path="/topics" element={<TopicsPage />} />
                <Route path="/videos" element={<VideosPage />} />
                <Route path="/books/library" element={<BooksLibraryPage />} />
                <Route path="/topics/:id" element={<IndividualTopicPage />} />
            </Routes>
        </Router>
    </>
  )
}

export default App
