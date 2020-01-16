import NotesPage from "../NotesPage"
import NotePage from "../NotePage"
import NewNotePage from "../NewNotePage"
const notesRoutes = [
  {
    path: "/add",
    component: NewNotePage
  },
  {
    path: "/:note_id",
    component: NotePage
  },
  {
    path: "/",
    component: NotesPage
  },
];

export default notesRoutes;
