import Icon from 'utils/Icon';

const SearchComboBox = () => {
  return (
    <div className='w-full bg-white rounded-[12px] shadow-sm border  px-[2.125rem] py-[0.375rem]'>
      <div className='flex items-center w-full h-full'>
        <div className='flex-grow'>
          <input
            className='w-full form-input border-0 focus:!ring-0 placeholder:text-textColor-disabled'
            placeholder='Search'
          />
        </div>
        <Icon name='searchIcon' svgProp={{ className: 'text-primary-9 w-4' }} />
      </div>
    </div>
  );
};

export default SearchComboBox;
