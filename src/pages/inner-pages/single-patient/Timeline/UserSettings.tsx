import { LazyLoadImage } from 'react-lazy-load-image-component';
import profilePicture from 'assets/image/profilePicture.png';
import { shimmer, toBase64 } from 'utils/general/shimmer';
import CustomInput from 'components/shadcn/CustomInput';
import { useState } from 'react';
import CustomSelectTrigger from 'components/shadcn/customSelectTrigger';
import { Label } from 'components/shadcn/label';
import { handleUploadProfile } from 'utils/images/upload-profile';
import { Input } from 'components/shadcn/input';
import UserTableComponent from 'components/Tables/UsersTable/UsersTable';

const UserSettingsTab = () => {
  const [disabled] = useState(true);
  const dropOptions = ['value1', 'value2', 'value3', 'value4', 'value5'];
  const [selectedFile, setSelectedFile] = useState<File | null | undefined>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(handleUploadProfile(event));
  };

  return (
    <section>
      <p>activities</p>
    </section>
  );
};

export default UserSettingsTab;
