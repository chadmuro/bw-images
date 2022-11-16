import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ImageCard } from "../types";

interface Props {
  image: ImageCard;
}

const ImageCard = ({ image }: Props) => {
  return (
    <div>
      <FontAwesomeIcon icon={image.icon} />
    </div>
  );
};

export default ImageCard;
