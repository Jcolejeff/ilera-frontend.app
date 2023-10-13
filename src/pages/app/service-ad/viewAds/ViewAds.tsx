import PlanGuard from "guards/PlanGuard";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Icon from "utils/Icon";
import { shimmer, toBase64 } from "utils/general/shimmer";
import image from 'assets/image/dashboardAdSample.png'
import ProfileCard from "components/general/ProfileCard";
import DemoDp from 'assets/image/demoDp.jpg'



type viewTypes = 'All' | 'Create' | 'View'
interface ComponentProps {
    setCurrentView: React.Dispatch<React.SetStateAction<viewTypes>>;
}

const ViewAds = ({setCurrentView}: ComponentProps) => {
    return (
        <div className='container w-full px-container-base flex flex-col py-[1.875rem]'>
            <PlanGuard page='service-ad'>
                <div>
                    <div className='flex justify-between items-start mb-6'>
                        <button 
                            className=' mb-4  rounded-[15px] flex items-center justify-center gap-2 group hover:opacity-90 transition-all duration-300 ease-in-out'
                            onClick={() => setCurrentView('All')}
                        >
                            <Icon
                                name='arrowBack'
                                svgProp={{
                                className:
                                    ' bg-white rounded-2xl text-gray-600 px-1 cursor-pointer hover:opacity-95 transition-opacity duration-300 ease-in-out active:opacity-100',
                                }}
                            />
                            <span className='font-[500] text-gray-600 text-sm leading-[24px] tracking-[0.4px]'> Go Back</span>
                        </button>
                    </div>
                    <section className=' bg-white rounded-md py-4 items-center pb-[7rem]'>
                        <div className=" flex flex-wrap justify-between py-4 w-full items-center px-5 md:px-8 border-b border-gray-200">
                            <p className='text-gray-700 font-semibold text-[16px] md:text-[18px] lg:text-[20px]'>
                            We’re looking for an Experienced Animator!
                            </p>
                            <button className='w-max mt-3 md:mt-0 mr-3 py-[0.3rem] px-[1.1rem] md:px-[1.5rem] bg-white border border-primary-1 rounded-[8px] flex items-center justify-center gap-2 hover:bg-purple-100 hover:opacity-90 transition-all ease-in-out duration-300 group'>
                                <span className='leading-[28px] tracking-[0.15px] text-primary-1 text-[13px] md:text-[14px] lg:text-[16px]'>
                                    Actions
                                </span>
                                <span className="fill-primary-1">
                                    <Icon name="chervonDown"/>
                                </span>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-5 md:px-8 mt-8">
                            <div className="col-span-3 mt-16 lg:mt-0 lg:col-span-2 flex flex-col">
                                <span className='mb-7'>
                                    <p className='text-gray-600 font-semibold text-[14px] md:text-[15px] lg:text-[16px]'>
                                        Job Overview
                                    </p>
                                    <p className='mt-1 text-gray-400 text-[13px] md:text-[13px] lg:text-[14px]'>
                                    We are seeking a talented Animator to join our team and help bring our creative vision to life through animation. The successful candidate will be responsible for designing and creating high-quality animations for a variety of projects, including video games, films, and advertisements. The ideal candidate should have a strong portfolio of previous work, be proficient in animation software, and have a keen eye for detail.
                                    </p>
                                </span>
                                <span className='mb-7'>
                                    <p className='text-gray-600 font-semibold text-[14px] md:text-[15px] lg:text-[16px]'>
                                        Job Categories
                                    </p>
                                    <p className='mt-1 text-gray-400 text-[13px] md:text-[13px] lg:text-[14px]'>
                                    We are seeking a talented Animator to join our team and help bring our creative vision to life through animation. The successful candidate will be responsible for designing and creating high-quality animations for a variety of projects, including video games, films, and advertisements. The ideal candidate should have a strong portfolio of previous work, be proficient in animation software, and have a keen eye for detail.
                                    </p>
                                </span>
                                <span className='mb-7'>
                                    <p className='text-gray-600 font-semibold text-[14px] md:text-[15px] lg:text-[16px]'>
                                        Duration
                                    </p>
                                    <p className='mt-1 text-gray-400 text-[13px] md:text-[13px] lg:text-[14px]'>
                                        3 weeks
                                    </p>
                                </span>
                                <span className='mb-7'>
                                    <p className='text-gray-600 font-semibold text-[14px] md:text-[15px] lg:text-[16px]'>
                                        Benefit
                                    </p>
                                    <div className='mt-1 text-gray-400 text-[13px] md:text-[13px] lg:text-[14px] flex flex-wrap gap-x-3 mt-4 mb-5'>
                                        <span className='flex w-max mb-2 items-center justify-center rounded-md px-3 py-2 bg-primary-light text-gray-600 text-[12px] md:text-[13px] lg:text-[14px]'>
                                            <Icon name='tag'/>
                                            <p className="ms-2 pt-[2px]">Pay: $10 000</p>
                                        </span>
                                        <span className='flex w-max mb-2 items-center justify-center rounded-md px-3 py-2 bg-primary-light text-gray-600 text-[12px] md:text-[13px] lg:text-[14px]'>
                                            <Icon name='tag'/>
                                            <p className="ms-2 pt-[2px]">duration: 3 weeks</p>
                                        </span>
                                    </div>
                                    <ul className="list-disc px-4 mt-1 text-gray-400 text-[13px] md:text-[13px] lg:text-[14px] mt-5">
                                        <li>
                                            Design and create high-quality animations for a variety of projects, including video games, films, and advertisements
                                        </li>
                                        <li>
                                            Collaborate with other team members to develop and refine concepts and ideas
                                        </li>
                                        <li>
                                            Ensure animations meet project deadlines and adhere to the project's creative direction
                                        </li>
                                    </ul>
                                </span>
                                <span className='mb-7'>
                                    <p className='text-gray-600 font-semibold text-[14px] md:text-[15px] lg:text-[16px]'>
                                     Responsibilities
                                    </p>
                                    
                                    <ul className="list-disc px-4 mt-1 text-gray-400 text-[13px] md:text-[13px] lg:text-[14px] mt-2">
                                        <li>
                                            Design and create high-quality animations for a variety of projects, including video games, films, and advertisements                                        
                                        </li>
                                        <li>
                                            Collaborate with other team members to develop and refine concepts and ideas
                                        </li>
                                        <li>
                                            Ensure animations meet project deadlines and adhere to the project's creative direction
                                        </li>
                                        <li>
                                            Communicate with clients or stakeholders to ensure their needs are met and their feedback is incorporated into the final product
                                        </li>
                                        <li>
                                            Stay up to date with the latest animation techniques and software to ensure the highest level of quality in work produced.
                                        </li>
                                    </ul>
                                </span>
                                <span className='mb-7'>
                                    <p className='text-gray-600 font-semibold text-[14px] md:text-[15px] lg:text-[16px]'>
                                     Requirements
                                    </p>
                                    <ul className="list-disc px-4 mt-1 text-gray-400 text-[13px] md:text-[13px] lg:text-[14px] mt-2">
                                        <li>
                                            Bachelor's degree in Animation, Fine Arts, or a related field
                                        </li>
                                        <li>
                                            Proficient in animation software such as Adobe After Effects, Maya, or Blender
                                        </li>
                                        <li>
                                            Strong portfolio showcasing previous work in animation
                                        </li>
                                        <li>
                                            Excellent attention to detail
                                        </li>
                                        <li>
                                            Ability to work well in a team environment
                                        </li>
                                        <li>
                                            Strong communication and time management skills
                                        </li>
                                    </ul>
                                </span>
                            </div>
                            <div className="flex justify-end row-start-1 col-end-3 md:col-end-2 md:col-start-1 lg:col-start-3 lg:col-end-3">
                                <div className="flex flex-col items-end h-[14.5rem] w-[16rem] md:h-[17.5rem] md:w-[17.5rem]">
                                    <div className=''>
                                        <div className="relative h-[14.5rem] w-[16rem] md:h-[17.5rem] md:w-[17.5rem] mb-[1rem] rounded-[8px] border-b-4 border-b-warning-1 overflow-hidden cursor-cardCursor
                                        after:w-full after:h-full after:absolute after:bg-transparent hover:after:bg-black/40 after:transition-all after:duration-300 after:top-0 after:left-0 transition-all ease-in-out duration-300
                                        ">
                                            <LazyLoadImage
                                                placeholderSrc={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                                                src={image}
                                                alt=""
                                                className="h-full w-full object-cover group transition-transform duration-300 ease-in-out bg-top bg-cover group-hover:scale-125 transform origin-center"
                                            />
                                            <div className="bg-black absolute flex items-center justify-center opacity-50 top-0 h-[14.5rem] w-[16rem] md:h-[17.5rem] md:w-[17.5rem]">
                                                <Icon name="editPen" svgProp={{ className: "fill-white font-bold h-[40px] w-[40px] opacity-100" }} />
                                            </div>
                                        </div>                                        
                                    </div>
                                    <button className='w-full py-[0.3rem] px-[1.1rem] md:px-[1.5rem] bg-primary-1 rounded-[8px] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity ease-in-out duration-300 group'>
                                        <span className='leading-[28px] tracking-[0.15px] text-white text-[13px] md:text-[14px] lg:text-[16px]'>
                                            SAVE CHANGES
                                        </span>
                                    </button> 
                                </div>
                            </div>
                        </div>
                            
                        <div className=" flex flex-col px-5 md:px-8">
                            <span className="flex items-center gap-x-2 mb-4">
                                <Icon name="awardStarIcon" />
                                <p className='text-primary-1 font-semibold text-[14px] md:text-[15px] lg:text-[16px]'>
                                    Potentials
                                </p>
                            </span>
                            <div className="flex grid grid-cols-1 justify-center items-center md:grid-cols-2 lg:grid-cols-4 w-[100%] gap-x-[1%] gap-y-[1%] flex-wrap">

                                {
                                    [...Array(4)]?.map((_, i) => (
                                        <ProfileCard key={i} role="UI designer" name="Mark Gilbert" imgSrc={DemoDp}/>    
                                    ))
                                }

                            </div>
                        </div>
                    </section>
                </div>
            </PlanGuard>
        </div>
    )
}

export default ViewAds