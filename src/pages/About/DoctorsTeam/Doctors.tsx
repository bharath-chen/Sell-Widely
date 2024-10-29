import Heading from "../../../components/Heading/Heading";
import { IDoctor } from "../../../services/doctors-service";
import NcImage from "../../../shared/NcImage/NcImage";

interface Props {
  doctors: IDoctor[];
  onClick: (doctor: IDoctor) => void;
}

const Doctors = ({ doctors, onClick }: Props) => {
  return (
    <div className="nc-SectionFounder relative">
      <div className="grid sm:grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4 xl:gap-x-8">
        {doctors.map((item) => (
          <div
            onClick={() => onClick(item)}
            key={item.doctor_id}
            className="max-w-sm cursor-pointer"
          >
            <NcImage
              containerClassName="relative h-0 aspect-h-1 aspect-w-1 rounded-xl overflow-hidden"
              className="absolute inset-0 object-cover"
              src={item.profile_picture}
            />
            <h3 className="text-lg font-semibold text-neutral-900 mt-4 md:text-xl dark:text-neutral-200">
              {item.name}
            </h3>
            <span className="block text-sm text-neutral-500 sm:text-base dark:text-neutral-400">
              {item.specialization}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
