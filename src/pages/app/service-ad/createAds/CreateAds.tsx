import CustomInput from "components/shadcn/CustomInput";
import { CustomTextArea } from "components/shadcn/customTextArea";
import DatePicker  from "components/shadcn/datePicker";
import { Popover, PopoverTrigger } from "components/shadcn/popover";
import { Button } from "components/shadcn/ui/button";
import { FormControl } from "components/shadcn/ui/form";
import PlanGuard from "guards/PlanGuard";
import { cn } from "lib/utils";
import Icon from "utils/Icon";

type viewTypes = 'All' | 'Create' | 'View'

interface ComponentProps {
    setCurrentView: React.Dispatch<React.SetStateAction<viewTypes>>;
  }

const CreateAds = ({setCurrentView}: ComponentProps) => {
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
                    <section className=' bg-white rounded-md py-4 items-center'>
                        <div className=" flex justify-between py-4 w-full items-center px-5 md:px-8 border-b border-gray-200">
                            <p className='text-gray-800 font-semibold text-[14px] md:text-[15px] lg:text-[16px]'>
                            Create an Ad
                            </p>
                            <span>
                                <Icon name='cancelIcon' svgProp={{
                                className: 'fill-gray-800'}} />
                            </span>
                        </div>
                        <div className="px-5 md:px-8 py-8 border-b border-gray-200">
                            <CustomInput label='Give your ad a title' type='text' className='w-full mb-7' />
                            <CustomInput label='Add Category (The Job is for ...)' type='text' className='w-full mb-7' />
                            <div className="flex gap-x-5 mb-7 w-full flex-wrap md:flex-nowrap gap-y-5">
                                <span className="w-[100%] md:w-[50%]">
                                    <DatePicker label='Specify Duration (Optional)'/>        
                                </span>
                                <span className="w-[100%] md:w-[50%]">
                                    <DatePicker label='Pay (Optional)'/>        
                                </span>
                            </div>
                            <div className="mb-7">
                                <CustomTextArea label='Job Overview (Optional)'/>
                            </div>
                            <div className="mb-7">
                                <CustomTextArea label='Responsibilities'/>
                            </div>
                            <div className="mb-7">
                                <CustomTextArea label='Requirements (Optional)'/>
                            </div>
                            <div className="mb-7">
                                <CustomTextArea label='Benefits (Optional)'/>
                            </div>
                        </div>
                        <div className=" flex justify-end py-5 px-8 gap-x-4">
                            <button className='w-max py-[0.3rem] px-[1.1rem] md:px-[1.5rem] border border-gray-200 bg-white text-gray-500 rounded-[8px] flex items-center justify-center gap-2 hover:bg-gray-100 hover:opacity-90 transition-all ease-in-out duration-300 group' onClick={() => setCurrentView('All')}>
                                <span className='leading-[28px] tracking-[0.15px] text-[13px] md:text-[14px] lg:text-[16px]'>
                                CANCEL
                                </span>
                            </button>
                            <button className='w-max py-[0.3rem] px-[1.1rem] md:px-[1.5rem] bg-primary-1 rounded-[8px] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity ease-in-out duration-300 group' onClick={() => setCurrentView('View')}>
                                <span className='leading-[28px] tracking-[0.15px] text-white text-[13px] md:text-[14px] lg:text-[16px]'>
                                SAVE
                                </span>
                                <Icon name="arrowTo" svgProp={{
                                    className: 'text-white fill-white'
                                }}/>
                            </button>

                        </div>
                    </section>
                </div>
            </PlanGuard>
        </div>
    )
}

export default CreateAds