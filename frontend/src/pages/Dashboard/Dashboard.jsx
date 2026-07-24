import { getUser } from "../../utils/auth";
import DashboardHero from "../../components/dashboard/DashboardHero";
import StatsCards from "../../components/dashboard/StatsCards";
import SubmissionChart from "../../components/dashboard/SubmissionChart";
import VerdictChart from "../../components/dashboard/VerdictChart";
import AnimateOnView from "../../components/common/AnimateOnView";
import useDashboardData from "../../hooks/useDashboardData";
import DifficultyProgress from "../../components/dashboard/DifficultyProgress";
import RecentSubmissions from "../../components/dashboard/RecentSubmission";
const Dashboard = () => {
  const user = getUser();

  const{
    dashboardData,
    loading,
    error,
  }= useDashboardData();


  if(loading){
    return <div>Loading...</div>
  }

  if(error) return <div>something went wrong</div>


  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      <DashboardHero />
      <StatsCards stats={dashboardData.stats} />

      <div className="
        mt-8 
        grid
        grid-cols-1 
        xl:grid-cols-2
        gap-6
      ">

        {/* submission chart */}

        <AnimateOnView
          placeholderHeight="24rem"
        >
          <SubmissionChart
            data={dashboardData.submissionTrend}
          />

        </AnimateOnView>



        {/* verdict chart */}

        <AnimateOnView
          placeholderHeight="24rem"
        >
          <VerdictChart data={dashboardData.verdictDistribution}/>

        </AnimateOnView>



        {/* difficulty progress card */}

        <AnimateOnView
        >
          <DifficultyProgress data={dashboardData.difficultyProgress}/>

        </AnimateOnView>



        {/* recent submissions */}

        <AnimateOnView
          placeholderHeight="24rem"
        >
          <RecentSubmissions submissions={dashboardData.recentSubmissions}/>

        </AnimateOnView>






      </div>



    </main>
  );
};

export default Dashboard;