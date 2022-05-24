import Head from 'next/head';
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

function HomePage(props) {
  return (
    <>
      <Head>
        <title>Meetups NextJS project</title>
        <meta name="description" content="huge list of highly active meetups" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   //fetch data frop API

//   return {
//     props: { meetups: DUMMY_MEETUPS },
//   };
// }

export async function getStaticProps() {
  // fetch data from an API

  const client = await MongoClient.connect(
    'mongodb+srv://admin:admin@cluster0.zkiho.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetupsCollection');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        // description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
