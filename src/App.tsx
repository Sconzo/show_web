import Header from "./components/Header";
import Letter from "./components/QuestionMakerLetter";
import CreateRoom from "./components/CreateRoom";
import Management from "./components/Management";
import { Route, Routes } from "react-router-dom";
import QuestionMaker from "./components/QuestionMaker";
import HostLetter from "./components/HostLetter";
import Host from "./components/Host";
import HostWait from "./components/HostWait";
import QuestionMakerReview from "./components/QuestionMakerReview";
import QuestionMakerWait from "./components/QuestionMakerWait";
import Challenger from "./components/Challenger";
import Score from "./components/Score";
import ScoreTable from "./components/ScoreTable";

function App(): JSX.Element {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Management />}></Route>
        <Route path="/create-room" element={<CreateRoom />}></Route>
        <Route path="/group-leader" element={<Letter />}></Route>
        <Route path="/group-leader-home" element={<QuestionMaker />}></Route>
        <Route
          path="/group-leader-wait"
          element={<QuestionMakerWait />}
        ></Route>
        <Route path="/host" element={<HostLetter />}></Route>
        <Route path="/host-home" element={<Host />}></Route>
        <Route path="/host-wait" element={<HostWait />}></Route>
        <Route path="/review" element={<QuestionMakerReview />}></Route>
        <Route path="/challenger" element={<Challenger />}></Route>
        <Route path="/score" element={<Score />}></Route>
        <Route path="/score-table" element={<ScoreTable />}></Route>
      </Routes>
    </>
  );
}

export default App;
