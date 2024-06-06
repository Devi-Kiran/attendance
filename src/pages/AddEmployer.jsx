import React, { useState } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import MainLayout from "../components/layouts/MainLayout";
import { toast } from "react-toastify";

function AddEmployer() {
  const employerData = {
    name: "",
    salaryPerAnnum: "",
    email: "",
    phone: "",
    attendanceCode: "",
    attendance: [],
  };
  const [employerDetails, setEmployerDetails] = useState(employerData);

  const employersCollectionRef = collection(db, "employers");

  const createEmployer = async () => {
    try {
      setEmployerDetails(employerData);
      await addDoc(employersCollectionRef, { ...employerDetails });
      toast.success("Employer successfully added");
    } catch (e) {
      toast.error("something went wrong");
    }
  };

  return (
    <>
      <MainLayout>
        <form onSubmit={(e) => e.preventDefault()} method="post">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3 md:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="employerName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Employer Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      value={employerDetails.name}
                      onChange={(e) =>
                        setEmployerDetails((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      id="employerName"
                      autoComplete="off"
                      className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3 md:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="email"
                      value={employerDetails.email}
                      onChange={(e) =>
                        setEmployerDetails((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      autoComplete="off"
                      className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3 md:col-span-2">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Phone
                  </label>
                  <div className="mt-2">
                    <input
                      type="tel"
                      value={employerDetails.phone}
                      onChange={(e) =>
                        setEmployerDetails((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      id="phone"
                      autoComplete="off"
                      className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3 md:col-span-2">
                  <label
                    htmlFor="salary"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Salary P/A
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      id="salary"
                      value={employerDetails.salaryPerAnnum}
                      onChange={(e) =>
                        setEmployerDetails((prev) => ({
                          ...prev,
                          salaryPerAnnum: e.target.value,
                        }))
                      }
                      autoComplete="off"
                      placeholder="In INR"
                      className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3 md:col-span-2">
                  <label
                    htmlFor="attendance-code"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Attendance Code
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="attendance-code"
                      value={employerDetails.attendanceCode}
                      onChange={(e) =>
                        setEmployerDetails((prev) => ({
                          ...prev,
                          attendanceCode: e.target.value,
                        }))
                      }
                      autoComplete="off"
                      className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              onClick={() => setEmployerDetails(employerData)}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={createEmployer}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </MainLayout>
    </>
  );
}

export default AddEmployer;
