import { useEffect, useState } from "react";
import EmailSubscribeSection from "../../../shared/EmailSubscribeSection/EmailSubscribeSection";
import galleryListService, {
  IGallery,
} from "../../../services/gallery-list-service";
import { CanceledError } from "axios";
import { hideLoader, showLoader } from "../../../features/loader/loaderSlice";
import { useAppDispatch } from "../../../hooks/hooks";
import Heading from "../../../shared/Heading/Heading";

const Media = () => {
  const dispatch = useAppDispatch();
  const [galleryList, setGalleryList] = useState<IGallery[]>([]);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState<IGallery | null>(null);

  useEffect(() => {
    const { request, cancel } = galleryListService.getAll<IGallery>();

    dispatch(showLoader());

    request
      .then((res) => {
        dispatch(hideLoader());
        setGalleryList(res.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        dispatch(hideLoader());
        setError(err.message);
      });

    return () => cancel();
  }, []);

  const openImage = (image: IGallery) => {
    setSelectedImage(image); // Open the clicked image
  };

  const closeModal = () => {
    setSelectedImage(null); // Close the modal
  };

  return (
    <>
      <div className="container mx-auto my-10">
        <Heading
          className="mb-5 md:mb-5 text-neutral-900 dark:text-neutral-50"
          desc={null}
        >
          Gallery
        </Heading>

        {/* Responsive Masonry Layout */}
        <div className="pt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {galleryList.map((gallery, index) => {
            // Customize column and row spans for masonry layout effect
            const colSpan = index % 7 === 0 ? "col-span-2" : "col-span-1";
            const rowSpan = index % 7 === 0 ? "row-span-2" : "row-span-1";

            return (
              <div
                key={gallery.gallery_id}
                className={`relative overflow-hidden rounded-lg shadow-lg ${colSpan} ${rowSpan} aspect-w-1 aspect-h-1`}
                onClick={() => openImage(gallery)}
              >
                <img
                  src={gallery.image_url}
                  alt={gallery.title}
                  className="w-full h-full object-cover cursor-pointer"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/40 to-transparent text-white">
                  <h3 className="text-lg font-semibold">{gallery.title}</h3>
                  <p className="text-sm">{gallery.category}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal to display clicked image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeModal} // Close the modal when clicking outside the image
        >
          <div
            className="relative max-w-full max-h-full"
            onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking on the image
          >
            <img
              src={selectedImage.image_url}
              alt={selectedImage.title}
              className="max-w-full max-h-screen rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white">
              <h3 className="text-lg font-semibold">{selectedImage.title}</h3>
              <p className="text-sm">{selectedImage.category}</p>
            </div>
            <button
              className="absolute top-2 right-2 text-white text-3xl font-bold"
              onClick={closeModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* EMAIL SUBSCRIBE SECTION */}
      <section className="mt-40">
        <EmailSubscribeSection />
      </section>
    </>
  );
};

export default Media;
