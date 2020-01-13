const NotesPage = require("../NotesPage")
const NotePage = require("../NotesPage")
const notesRoutes = [
  {
    path: "/notes/",
    component: NotesPage
  },
  {
    path: "/notes/:note_id",
    component: NotePage
  }
];

export default notesRoutes;
