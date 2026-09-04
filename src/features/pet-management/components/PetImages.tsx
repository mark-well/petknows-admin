import { useQuery } from "@tanstack/react-query";
import getPetImagesRecord from "../services/getPetImagesRecord";
import { getPetImage } from "../services";

type Props = {
  petId: string;
  petAvatarUrl: string;
};

export default function PetImages({ petId, petAvatarUrl }: Props) {
  const { data: petAvatar, isPending: petAvatarLoading } = useQuery({
    queryKey: ["petAvatar", petId],
    queryFn: () => getPetImage(petAvatarUrl ?? null),
    enabled: !!petId,
  });

  const { data: petImagesRecord } = useQuery({
    queryKey: ["petImagesRecord", petId],
    queryFn: () => getPetImagesRecord([petId]!),
    enabled: Boolean(petId),
  });

  const { data: images } = useQuery({
    queryKey: ["petImage", petImagesRecord],
    queryFn: () => petImagesRecord?.map((item) => getPetImage(item.image_url)),
    enabled: Boolean(petImagesRecord),
  });

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {petAvatarLoading ? (
        <div className="aspect-5/4 w-full rounded-md border border-gray-300 bg-gray-50 object-cover shadow-md"></div>
      ) : (
        <img
          src={petAvatar?.publicUrl}
          alt="Pet Image"
          className="aspect-5/4 w-full rounded-md border border-gray-300 object-cover shadow-md"
        />
      )}

      <div className="flex w-full flex-row items-center gap-2">
        <div className="h-px w-full bg-gray-300" />
        <span className="text-base text-gray-700">Images</span>
        <div className="h-px w-full bg-gray-300" />
      </div>

      <div className="grid min-w-0 flex-1 grid-cols-5 gap-4">
        {images?.map((item) => (
          <img
            key={item.publicUrl}
            src={item.publicUrl}
            alt="Pet Image"
            className="aspect-square w-full rounded-md border border-gray-300 object-cover shadow-md"
          />
        ))}

        {Array.from({ length: Math.max(0, 5 - (images?.length ?? 0)) }).map(
          (_, index) => (
            <div
              key={`empty-${index}`}
              className="aspect-square w-full rounded-md border border-gray-300 bg-gray-100 shadow-md"
            ></div>
          ),
        )}
      </div>
    </div>
  );
}
