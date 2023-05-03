import useProfileImg from "../hooks/useProfileImg";
import { LetterProfile, ProfilePicture } from "../pages/panel/Cash/CashStyles";
import Device from "../utils/types/Device";
import { Letter } from "../utils/types/ProfileColorPallete";

const ProfileFace = ({
  profile,
  id,
  size
}: {
  profile: Device<Letter[]>;
  id?: string;
  size?: {
    width: number,
    height: number,
  }
}) => {
  const { pictureUrl, firstLetter } = useProfileImg(
    profile?.profileImg === "default" ? undefined : profile?.profileImg,
    { name: profile?.name }
  );

  return (
    <>
      {pictureUrl && <ProfilePicture id={id} src={pictureUrl} />}
      {firstLetter && (
        <LetterProfile id={id} colorPalette={firstLetter.palette} {...size}>
          {firstLetter.letter.toUpperCase()}
        </LetterProfile>
      )}
    </>
  );
};

export default ProfileFace;
