import PlanGuard from 'guards/PlanGuard';
import PersonalInformationSection from 'components/general/Cv-profile/PersonalInformation';
import EducationSectionCvProfile from 'components/general/Cv-profile/Education';
import ExperienceSectionCvProfile from 'components/general/Cv-profile/Experiences';
import ProjectSectionCvProfile from 'components/general/Cv-profile/Projects';
import SkillSectionCvProfile from 'components/general/Cv-profile/Skills';
import UserInfoEditSection from 'components/general/Cv-profile/UserInfoEdit';
import Icon from 'utils/Icon';
import ResumeSectionCvProfile from 'components/general/Cv-profile/Resume';
import FreeRangeSectionCvProfile from 'components/general/Cv-profile/FreeRange';
import MainUserAddInfoModal from 'components/modal/CvProfileModals/MainUserInfoModal';
import FunkyPagesHero from 'components/general/FunkyPagesHero';
const Consultation = () => {
  return (
    <div className='container flex w-full flex-col px-container-base py-[1.875rem]'>
      <FunkyPagesHero
        // description='Ask Professionals and Masters  questions you need answers to by creating a thread'
        title='Consultation'
      />
      <PlanGuard page='patients'>
        <>
          {/* <div className='relative mx-auto my-[1.5rem] w-full max-w-[800px] md:-top-[1.5rem] md:my-0 md:mb-[1rem]'>
            <InputAddComboBox placeholder='Add a new thread...' />
          </div>
          <div className='mb-[1.5rem] flex w-full justify-center'>
            <PillTabs
              tabs={generalFilters}
              currActive={currFilter}
              onSelect={(i) => setCurrFilter(i)}
            />
          </div>
          <div className='mb-[1.5rem] flex w-full justify-center'>
            <LinksFilter
              tabs={[
                {
                  link: ``,
                  sublinks: [
                    { title: `Best tv shows`, link: `` },
                    { link: ``, title: `Awards` },
                  ],
                  title: `General`,
                },
                {
                  link: ``,
                  sublinks: [],
                  title: `Production`,
                },
                {
                  link: ``,
                  sublinks: [],
                  title: `Post-production`,
                },
                {
                  link: ``,
                  sublinks: [],
                  title: `Distribution and Marketing`,
                },
                {
                  link: ``,
                  sublinks: [],
                  title: `Animation/vfx`,
                },
              ]}
            />
          </div>
          <CommentThreadCard /> */}
        </>
      </PlanGuard>
    </div>
  );
};

export default Consultation;
