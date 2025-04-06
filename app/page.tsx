import HomeCard from "./components/HomeCard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-24 h-11/12 bg-base-200">
      <div>
        <h1 className="text-4xl font-bold">Welcome!</h1>
        <div className="card grid grid-cols-2 gap-4 max-w-screen mt-4">
            <HomeCard title="Election Management System" description="Modify election configurations." href="./admin"/>
            <HomeCard title="Election: Login" description="Login with Voter Credentials" href="./login"/>
            <HomeCard title="Election: Register" description="Register as a Voter" href="./register"/>
            <HomeCard title="View Realtime Tally" description="View election details and events" href="./home"/>
          </div>
      </div>
    </main>
  );
}
