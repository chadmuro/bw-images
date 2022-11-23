import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "next-themes";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { ImageCardType } from "../types";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedImage: ImageCardType | null;
}

export default function Modal({ open, setOpen, selectedImage }: Props) {
  const iconRef = useRef<any>(null);
  const closeButtonRef = useRef(null);
  const { theme, setTheme } = useTheme();

  const handlePngDownload = async () => {
    const element = iconRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL("image/png");
    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = data;
      link.download = `${selectedImage?.name}.png`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };

  const handlePdfDownload = async () => {
    const element = iconRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${selectedImage?.name}.pdf`);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={closeButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white dark:bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 flex justify-between items-center"
                      >
                        {selectedImage?.name}
                        <button
                          className="w-12 h-12 rounded-lg :bg-slate-800 flex items-center justify-center hover:ring-2 ring-yellow-400 transition-all duration-300 focus:outline-none p-2"
                          onClick={() =>
                            setTheme(theme === "light" ? "dark" : "light")
                          }
                          aria-label="Toggle Dark Mode"
                        >
                          {theme === "light" ? (
                            <FontAwesomeIcon
                              icon={faMoon}
                              className="h-full w-full text-yellow-600"
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faSun}
                              className="h-full w-full text-yellow-200"
                            />
                          )}
                        </button>
                      </Dialog.Title>
                      {selectedImage && (
                        <>
                          <div
                            ref={iconRef}
                            className="bg-white dark:bg-black text-black dark:text-white w-full h-auto p-4 sm:p-8 border border-gray-600 rounded-lg flex justify-center items-center"
                          >
                            <FontAwesomeIcon
                              icon={selectedImage.icon}
                              className="h-auto w-full"
                            />
                          </div>
                          <div className="flex gap-4">
                            <button onClick={handlePdfDownload}>
                              Download PDF
                            </button>
                            <button onClick={handlePngDownload}>
                              Download PNG
                            </button>
                          </div>
                        </>
                      )}

                      {/* <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to deactivate your account? All
                          of your data will be permanently removed. This action
                          cannot be undone.
                        </p>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="cursor-pointer mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 px-4 py-2 text-base font-medium shadow-sm hover:bg-gray-50 hover:dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={closeButtonRef}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
