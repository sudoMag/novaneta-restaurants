import useProfileImg from "../hooks/useProfileImg";
import { LetterProfile, ProfilePicture } from "../pages/panel/Cash/CashStyles";
import Device from "../utils/types/Device";
import { Letter } from "../utils/types/ProfileColorPallete";

const ProfileFace = ({
  profile,
  id,
}: {
  profile: Device<Letter[]>;
  id?: string;
}) => {
  const { pictureUrl, firstLetter } = useProfileImg(
    profile?.profileImg === "default" ? undefined : profile?.profileImg,
    { name: profile?.name }
  );

  return (
    <>
      {pictureUrl && <ProfilePicture id={id} src={pictureUrl} />}
      {firstLetter && (
        <LetterProfile id={id} colorPalette={firstLetter.palette}>
          {firstLetter.letter.toUpperCase()}
        </LetterProfile>
      )}
    </>
  );
};

export default ProfileFace;
