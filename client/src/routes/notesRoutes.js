import NotesPage from "../NotesPage"
import NotePage from "../NotePage"
import NewNotePage from "../NewNotePage"
import ActivatePage from '../ActivatePage';
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
