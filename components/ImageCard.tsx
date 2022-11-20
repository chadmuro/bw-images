import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ImageCard } from "../types";

interface Props {
  image: ImageCard;
}

const ImageCard = ({ image }: Props) => {
  return (
    <div className="w-full h-[100px] sm:h-[200px] mb-8">
      <div className="w-full h-full p-4 sm:p-8 border border-gray-600 rounded-lg flex justify-center items-center">
        <FontAwesomeIcon icon={image.icon} className="h-full w-full" />
      </div>
      <p className="text-center mt-1">{image.name}</p>
    </div>
  );
};

export default ImageCard;
