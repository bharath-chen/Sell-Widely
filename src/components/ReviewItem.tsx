import { FC } from "react";
import Avatar from "../shared/Avatar/Avatar";
import { Rating } from "react-simple-star-rating";

interface ReviewItemDataType {
  name: string;
  avatar?: string;
  date: string;
  comment: string;
  starPoint: number;
}

export interface ReviewItemProps {
  className?: string;
  data?: ReviewItemDataType;
}

const DEMO_DATA: ReviewItemDataType = {
  name: "Cody Fisher",
  date: "May 20, 2021",
  comment:
    "Very nice feeling sweater. I like it better than a regular hoody because it is tailored to be a slimmer fit. Perfect for going out when you want to stay comfy. The head opening is a little tight which makes it a little.",
  starPoint: 5,
};

const ReviewItem: FC<ReviewItemProps> = ({
  className = "",
  data = DEMO_DATA,
}) => {
  const { starPoint } = data;

  return (
    <div
      className={`nc-ReviewItem flex flex-col ${className}`}
      data-nc-id="ReviewItem"
    >
      <div className="flex items-center space-x-4">
        {" "}
        {/* Ensure flexbox alignment */}
        <div className="flex-shrink-0">
          <Avatar
            sizeClass="h-10 w-10 text-lg"
            radius="rounded-full"
            userName={data.name}
            imgUrl={data.avatar}
          />
        </div>
        <div className="flex-1 flex items-center justify-between">
          <div className="text-sm sm:text-base">
            <span className="block font-semibold">{data.name}</span>
          </div>

          {/* Wrap the rating component inside a flex container */}
          <div className="flex items-center">
            <Rating
              readonly
              transition
              allowFraction
              initialValue={starPoint}
              size={24}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 prose prose-sm sm:prose dark:prose-invert sm:max-w-2xl">
        <p className="text-slate-600 dark:text-slate-300">{data.comment}</p>
      </div>
    </div>
  );
};

export default ReviewItem;
