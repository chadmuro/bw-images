import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ImageCardType } from "../types";

interface Props {
  image: ImageCardType;
  handleImageClick: (image: ImageCardType) => void;
}

export default function Image({ image, handleImageClick }: Props) {
  return (
    <div
      className="w-full h-[100px] sm:h-[200px] mb-8 cursor-pointer hover:-translate-y-4 transition-all duration-300"
      onClick={() => handleImageClick(image)}
    >
      <div className="w-full h-full p-4 sm:p-8 border border-gray-600 rounded-lg flex justify-center items-center">
        <FontAwesomeIcon icon={image.icon} className="h-full max-w-full" />
      </div>
      <p className="text-center mt-1">{image.name}</p>
    </div>
  );
}
