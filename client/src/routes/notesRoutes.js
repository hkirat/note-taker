import NotesPage from "notes/NotesPage"
import NotePage from "notes/NotePage"
import NewNotePage from "notes/NewNotePage"
import ActivatePage from 'auth/ActivatePage';
const notesRoutes = [
  {
    path: "/add",
    component: NewNotePage
  },
  {
    path: "/activate/:token/:username",
    component: ActivatePage
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
