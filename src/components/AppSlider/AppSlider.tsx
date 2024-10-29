import Glide from "@glidejs/glide";
import { ReactNode, FC, useId, useEffect } from "react";

export interface SliderProps {
  data: any[];
  renderChildren: (data: any) => ReactNode;
  className?: string;
  glideClassName?: string;
  glideOptions?: Glide.Options | any;
  itemWrapperClassName?: string;
  children?: ReactNode;
}

const AppSlider: FC<SliderProps> = ({
  data,
  className,
  renderChildren,
  glideClassName = "",
  glideOptions = {
    autoplay: 2000,
    rewind: true,
    hoverpause: true,
    perView: 2.8,
    gap: 32,
    bound: true,
    breakpoints: {
      1280: {
        gap: 28,
        perView: 2.5,
      },
      1279: {
        gap: 20,
        perView: 2.15,
      },
      1023: {
        gap: 20,
        perView: 1.6,
      },
      768: {
        gap: 20,
        perView: 1.2,
      },
      500: {
        gap: 20,
        perView: 1,
      },
    },
  },
  itemWrapperClassName = "",
  children,
}) => {
  const id = useId();
  const UNIQUE_CLASS = "glidejs" + id.replace(/:/g, "_");

  useEffect(() => {
    // @ts-ignore
    const OPTIONS: Glide.Options = glideOptions;

    const slider = new Glide(`.${UNIQUE_CLASS}`, OPTIONS);
    slider.mount();
    return () => {
      slider.destroy();
    };
  }, [UNIQUE_CLASS]);

  return (
    <div className={`${className} ${UNIQUE_CLASS} `}>
      {/* Mostly Heading Component  */}
      {children}
      <div className={glideClassName} data-glide-el="track">
        <ul className="glide__slides">
          {data.map((item, index) => (
            <li key={index} className={`glide__slide ${itemWrapperClassName}`}>
              {renderChildren(item)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AppSlider;
