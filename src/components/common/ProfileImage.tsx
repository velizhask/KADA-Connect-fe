import { useState } from "react";
import { UserCircle } from "lucide-react";

export const ProfileImage = ({
  imageUrl,
  alt,
}: {
  imageUrl?: string;
  alt: string;
}) => {
  const [isError, setIsError] = useState(false);

  if (!imageUrl || isError) {
    return (
      <div className="w-24 h-24 flex items-center justify-center bg-gray-50 rounded-xl shrink-0">
        <UserCircle className="w-16 h-16 text-gray-300" />
      </div>
    );
  }

  return (
    <div className="relative w-24 h-24 rounded-xl overflow-hidden">
      <img
        src={imageUrl}
        alt={alt}
        onError={() => setIsError(true)}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-300"
      />
    </div>
  );
};
