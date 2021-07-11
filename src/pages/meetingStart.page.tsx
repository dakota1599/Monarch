import { useParams } from "react-router";
import MeetingStart from "../components/meetingstart/meetingstart.component";

interface Params{
    id:any;
}

const MeetingStartPage = () => {

    const params:Params = useParams();

    return(
        <div>
            <MeetingStart meetingId={params.id}/>
        </div>
    );
}

export default MeetingStartPage;