import Icon from "utils/Icon"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { shimmer, toBase64 } from "utils/general/shimmer"

interface ProfileProps {
    name: string,
    imgSrc: string,
    role: string,
}
const ProfileCard : React.FC<ProfileProps> = ({name, imgSrc, role}) => {
    return (
        <div className="w-full flex justify-center item-center mb-[1%]">
            <div className="w-max px-2 max-w-sm bg-white border border-gray-100 rounded-lg">
                <div className="flex justify-end pt-4">
                    <button id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5" type="button">
                        <span className="sr-only">Open dropdown</span>
                        <Icon name='verticalDot'/>
                    </button>
                </div>
                <div className="flex flex-col items-center pb-10">
                    <div className="h-[6rem] w-[6rem">
                        <LazyLoadImage
                        src={imgSrc}
                        alt='avatar'
                        className='w-full h-full transition-transform duration-300 ease-in-out bg-top bg-cover group-hover:scale-105'
                        placeholderSrc={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                        />
                    </div>

                    <h5 className="mt-2 font-bold text-gray-600 ">{name}</h5>
                    <span className="text-sm text-gray-500">{role}</span>
                    <div className=" flex justify-end py-5 px-[2rem] gap-x-2">
                        <button className='w-max py-[0.3rem] px-[0.8rem] md:px-[1rem] bg-primary-1 rounded-[8px] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity ease-in-out duration-300 group'>
                            <Icon name="userCheck" svgProp={{
                                className: 'text-white fill-white'
                            }}/>
                            <span className='leading-[28px] tracking-[0.15px] text-white text-sm'>
                            VIEW CV
                            </span>
                        </button>
                        <button className='w-max py-[0.3rem] px-[0.3rem] md:px-[0.3rem] border border-gray-200 bg-white text-gray-500 rounded-[8px] flex items-center justify-center gap-2 hover:bg-gray-100 hover:opacity-90 transition-all ease-in-out duration-300 group'>
                            <Icon name="envelope" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard