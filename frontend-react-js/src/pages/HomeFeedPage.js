import './HomeFeedPage.css';
import React from "react";

import DesktopNavigation  from '../components/DesktopNavigation';
import DesktopSidebar     from '../components/DesktopSidebar';
import ActivityFeed from '../components/ActivityFeed';
import ActivityForm from '../components/ActivityForm';
import ReplyForm from '../components/ReplyForm';

import { Auth } from 'aws-amplify';

import { getTracer, reportSpan, withTracing } from '../utils/tracing-utils';


const tracer = getTracer();

export default function HomeFeedPage() {
  const [activities, setActivities] = React.useState([]);
  const [popped, setPopped] = React.useState(false);
  const [poppedReply, setPoppedReply] = React.useState(false);
  const [replyActivity, setReplyActivity] = React.useState({});
  const [user, setUser] = React.useState(null);
  const dataFetchedRef = React.useRef(false);

  const [span, setSpan] = React.useState(null)

  React.useEffect(() => {
    if (span) {
      span.end();
      reportSpan(span);
    }
  }, [span]);


  const loadData = async () => {
    try {
      const rootSpan = tracer.startSpan('frontend-react-js.home-feed');
      await withTracing(
        `home-feed-mock`,
        async () => {
          const backend_url = `${process.env.REACT_APP_BACKEND_URL}/api/activities/home`
            const res = await fetch(backend_url, {
              method: "GET",
              headers: {
                Authorization: `bearer ${localStorage.getItem('access_token')}`
              }
            });
            let resJson = await res.json();
            if (res.status === 200) {
              setActivities(resJson)
            } else {
              console.log(res)
            }
        },
        rootSpan,
      );
      await setSpan(rootSpan);

    } catch (err) {
      console.log(err);
    }
  };

  const checkAuth = async () => {
    Auth.currentAuthenticatedUser({
      bypassCache: false 
    })
    .then((user) => {
      console.log('user',user);
      return Auth.currentAuthenticatedUser()
    }).then((cognito_user) => {
        setUser({
          display_name: cognito_user.attributes.name,
          handle: cognito_user.attributes.preferred_username
        })
    })
    .catch((err) => console.log(err));
  };

  React.useEffect(()=>{
    loadData();
    checkAuth();
  }, [])

  return (
    <article>
      <DesktopNavigation user={user} active={'home'} setPopped={setPopped} />
      <div className='content'>
        <ActivityForm  
          popped={popped}
          setPopped={setPopped} 
          setActivities={setActivities} 
        />
        <ReplyForm 
          activity={replyActivity} 
          popped={poppedReply} 
          setPopped={setPoppedReply} 
          setActivities={setActivities} 
          activities={activities} 
        />
        <ActivityFeed 
          title="Home" 
          setReplyActivity={setReplyActivity} 
          setPopped={setPoppedReply} 
          activities={activities} 
        />
      </div>
      <DesktopSidebar user={user} />
    </article>
  );
}