import NotesPage from "../NotesPage"
import NotePage from "../NotePage"
import NewNotePage from "../NewNotePage"
const notesRoutes = [
  {
    path: "/notes/add",
    component: NewNotePage
  },
  {
    path: "/notes/:note_id",
    component: NotePage
  },
  {
    path: "/notes/",
    component: NotesPage
  },
];

export default notesRoutes;
