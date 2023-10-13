import { useState } from "react";
import AllAds from "./allAds/AllAds";
import CreateAds from "./createAds/CreateAds";
import ViewAds from "./viewAds/ViewAds";


type viewTypes = 'All' | 'Create' | 'View'

interface Filter  {
  name: viewTypes,
  setCurrentView: React.Dispatch<React.SetStateAction<viewTypes>>
}

const AdsFilter = ({ name, setCurrentView }: Filter) => {
  const components : Record<viewTypes, JSX.Element> ={
    'All' : <AllAds setCurrentView={setCurrentView}/>,
    'Create': <CreateAds setCurrentView={setCurrentView}/>,
    'View': <ViewAds setCurrentView={setCurrentView} />
  }

  return components[name]
}

const ServiceAd = () => {
  const[currentView, setCurrentView] = useState<viewTypes>('All')  

  return (
    <div>
      <AdsFilter name={currentView} setCurrentView={setCurrentView}/>
    </div>
  );
};

export default ServiceAd;
